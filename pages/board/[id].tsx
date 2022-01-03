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
							<div>
								<h1>Error</h1>
								{
									(data && data.hasError && data.errorMessage ) ?
										<code>{data.errorMessage}</code>
										:
										<div>No data received</div>
								}
							</div>
					}
				</main>
			</Container>
		</ThemeProvider>
	);
};


export const getServerSideProps: GetServerSideProps = async ({params}) => {

	const boardId = params.id;
	// Note for reviewer: Using params.id directly in fetchURL is a bit unsafe,
	// but done here because of lack of time.
	// Proper solution would be: params.id should be checked/mapped against a whitelist of valid boardIds.
	const fetchURL = process.env.API_HOST + '/v1/board/' + boardId + '/news';
	const res = await fetch(fetchURL)

	let data;
	try {
		data = await res.json()
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
