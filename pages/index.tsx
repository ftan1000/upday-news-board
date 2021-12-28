import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {NextPage} from 'next';
import withAuthentication from '../src/withAuthentication';
import Header from '../components/header';

const theme = createTheme();

const Home: NextPage = () => {

	return (
		<ThemeProvider theme={theme}>
			<Container component="main" maxWidth="xs">
				<CssBaseline/>
				<Header />
			</Container>
		</ThemeProvider>
	);
};
export default withAuthentication(Home);

