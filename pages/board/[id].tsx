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

	const [selectedTabId, setSelectedTabId] = React.useState(0);

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setSelectedTabId(newValue);
	};

	return (
		<ThemeProvider theme={theme}>
			<Container component="main" maxWidth="md">
				<CssBaseline/>
				<Header/>
				<main>
					<Box component='div' sx={{borderBottom: 1, borderColor: 'divider'}}>
						<Tabs value={selectedTabId} onChange={handleChange} aria-label="News Status">
							<Tab label='Drafts'/>
							<Tab label='Published'/>
							<Tab label='Archives'/>
						</Tabs>
					</Box>

					{
						props.data ?
							<>
								<TabPanel value={selectedTabId} index={0}>{
									props.data.drafts && props.data.drafts.length > 0 ?
										<NewsList data={props.data.drafts}/>
										:
										<NoNews/>
								}
								</TabPanel>
								<TabPanel value={selectedTabId} index={1}>{
									props.data.published && props.data.published.length > 0 ?
										<NewsList data={props.data.published}/>
										:
										<NoNews/>
								}
								</TabPanel>
								<TabPanel value={selectedTabId} index={2}>{
									props.data.archives && props.data.archives.length > 0 ?
										<NewsList data={props.data.archives}/>
										:
										<NoNews/>
								}
								</TabPanel>
							</>
							:
							'Empty board'
					}
				</main>
			</Container>
		</ThemeProvider>
	);
};


export const getServerSideProps: GetServerSideProps = async ({params}) => {

	const res = await fetch(process.env.API_HOST + '/v1/board/' + params.id + '/news')
	const data = await res.json()

	if (!data) {
		return {
			notFound: true,
		}
	}

	return {props: {data}}
}

// TODO export default withAuthentication(Board);
export default Board;
