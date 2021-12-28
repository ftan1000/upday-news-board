import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {GetServerSideProps, NextPage} from 'next';
import withAuthentication from '../src/withAuthentication';
import Header from '../components/header';
import Boards from '../components/boards';

const theme = createTheme();

const Home: NextPage = (props) => {

	return (
		<ThemeProvider theme={theme}>
			<Container component="main" maxWidth="md">
				<CssBaseline/>
				<Header />
				<main>
					<Boards data={props.data}/>
				</main>
			</Container>
		</ThemeProvider>
	);
};


export const getServerSideProps: GetServerSideProps = async () => {

	const res = await fetch(process.env.API_HOST + '/v1/board')
	const data = await res.json()

	if (!data) {
		return {
			notFound: true,
		}
	}

	return { props: { data } }
}

export default withAuthentication(Home);
