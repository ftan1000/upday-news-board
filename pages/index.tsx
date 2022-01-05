import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {GetServerSideProps, NextPage} from 'next';
import withAuthentication from '../src/withAuthentication';
import Header from '../components/header';
import Boards from '../components/boards';
import LoggedInFooter from './loggedInFooter';
import {BoardService} from "../src/api/upday";

const theme = createTheme();

const Home: NextPage = (props) => {

	return (
		<ThemeProvider theme={theme}>
			<Container component="main" maxWidth="md">
				<CssBaseline/>
				<Header displayBreadcrumbs={false} />
				<main>
					<Boards {...props}/>
				</main>
				<LoggedInFooter hideGotoBoards={true} />
			</Container>
		</ThemeProvider>
	);
};


export const getServerSideProps: GetServerSideProps = async () => {

	let data;
	try {
		data = await BoardService.getAllCountries();
	}
	catch (error){

		return {
			props: {
				data: [],
				hasError: true,
				errorMessage: error.message || 'Unknown error'
			}
		}
	}

	return { props: { data } }
}

export default withAuthentication(Home);
