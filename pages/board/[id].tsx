import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {GetServerSideProps, NextPage} from 'next';
import Header from '../../components/header';
import {Box} from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import NewsList from '../../components/newsList';
import NoNews from '../../components/noNews';
import withAuthentication from '../../src/withAuthentication';
import LoggedInFooter from '../loggedInFooter';
import {BoardService} from "../../src/gen/openapi/card-service";
import {BoardList} from "../../src/types";

const theme = createTheme();

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

function TabPanel(props: TabPanelProps) {
	const {children, value, index, ...other} = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`tabpanel-${index}`}
			aria-labelledby={`tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{p: 3}}>
					<Typography component={'div'}>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

const Board: NextPage = (props) => {

	const data = props.data;
	const [selectedTabId, setSelectedTabId] = React.useState(0);

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setSelectedTabId(newValue);
	};

	return (
		<ThemeProvider theme={theme}>
			<Container component="main" maxWidth="md">
				<CssBaseline/>
				<Header boardId={props.boardId}/>
				<main>
					{
						data && !data.hasError ?
							<>
								<Box component='div' sx={{borderBottom: 1, borderColor: 'divider'}}>
									<Tabs value={selectedTabId} onChange={handleChange} aria-label="News Status">
										<Tab label='Drafts'/>
										<Tab label='Published'/>
										<Tab label='Archives'/>
									</Tabs>
								</Box>
								<TabPanel value={selectedTabId} index={0}>{
									data.drafts && data.drafts.length > 0 ?
										<NewsList data={data.drafts}/>
										:
										<NoNews/>
								}
								</TabPanel>
								<TabPanel value={selectedTabId} index={1}>{
									data.published && data.published.length > 0 ?
										<NewsList data={data.published}/>
										:
										<NoNews/>
								}
								</TabPanel>
								<TabPanel value={selectedTabId} index={2}>{
									data.archives && data.archives.length > 0 ?
										<NewsList data={data.archives}/>
										:
										<NoNews/>
								}
								</TabPanel>
							</>
							:
							<Box>
								<h1>Error</h1>
								<Box sx={{margin: 2}}>
								{
									(data && data.hasError && data.errorMessage ) ?
										<pre>{data.errorMessage}</pre>
										:
										<b>No data received</b>
								}
								</Box>
							</Box>
					}
				</main>
				<LoggedInFooter />
			</Container>
		</ThemeProvider>
	);
};


export const getServerSideProps: GetServerSideProps = async ({params}) => {

	let boardId: string = '';
	if (params?.id){
		boardId = Array.isArray(params.id)? params.id[0]: params.id;
		boardId = Object.keys(BoardList).includes(boardId) ? boardId : '';
	}

	if (!boardId){
		return {
			props: {
				data: {
					hasError: true,
					errorMessage: 'Invalid boardId'
				}
			}
		}
	}

	let data;
	try {
		data = await BoardService.getNewsFromBoard(boardId);
	} catch (error) {
		data = {
			hasError: true,
			errorMessage: error.message || 'Unknown error'
		};
		return {props: {data}}
	}

	if (!data) {
		return {
			notFound: true,
		}
	}

	return {props: {data, boardId: boardId} }
}

export default withAuthentication(Board);
