import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {NextPage} from 'next';
import LoginForm from '../components/loginForm';
import {useAuth} from '../src/authContext';
import {useRouter} from 'next/router';
import {useEffect} from 'react';
import Header from "../components/header";

const theme = createTheme();

const Login: NextPage = () => {
	const { user } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (user && user.email) router.push("/");
	}, [user]);

	return (
		<ThemeProvider theme={theme}>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Header displayBreadcrumbs={false} />
				<main>
					<LoginForm />
				</main>
			</Container>
		</ThemeProvider>
	);
};

export default Login;
