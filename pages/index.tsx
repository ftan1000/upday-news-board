import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {NextPage} from 'next';
import {useAuth} from '../src/authContext';
import withAuthentication from '../src/withAuthentication';
import Link from 'next/link';

const theme = createTheme();

const Home: NextPage = () => {

	const {user, logout} = useAuth();

	return (
		<ThemeProvider theme={theme}>
			<Container component="main" maxWidth="xs">
				<CssBaseline/>
				<div>
					<h2>{user && user.email ? (
						<>
							<div>Welcome {user.email} </div>
							<button onClick={logout}>Logout</button>
						</>
					) : (
						<div>
							<Link href='/login'>
								<a>Please login</a>
							</Link>
						</div>
					)
					}</h2>
				</div>
			</Container>
		</ThemeProvider>
	);
};
export default withAuthentication(Home);

