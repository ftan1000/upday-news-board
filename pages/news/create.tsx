import * as React from 'react';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Header from '../../components/header';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {FormikValues} from 'formik';
import {useAuth} from '../../src/authContext';
import {BoardList} from '../../src/types';
import generateNewsFormValidationSchema from '../../src/newsFormValidationSchema';
import NewsForm from '../../components/newsForm';
import {NextPage} from 'next';
import withAuthentication from '../../src/withAuthentication';
import {News, NewsService} from '../../src/api/upday';
import {AlertColor, Snackbar} from "@mui/material";
import Alert from "@mui/material/Alert";
import {useRouter} from "next/router";

const theme = createTheme();

const CreateNews: NextPage = () => {

	const {user} = useAuth();
	const router = useRouter();

	const [snackbarMessage, setSnackbarMessage] = React.useState('');
	const [openSnackbar, setOpenSnackbar] = React.useState(false);
	const [severity, setSeverity] = React.useState<AlertColor>('success');

	const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpenSnackbar(false);
	};

	const showSnackbar = (severity: AlertColor, message: string) => {
		setSnackbarMessage(message);
		setSeverity(severity);
		setOpenSnackbar(true);
	}


	const handleSuccess = (news: News, json: News) => {
		router.push('/news/' + json.id);
	}

	const initialNewsFormData: News = {
		author: (user && user.email || 'unknown@test.com'),
		title: '',
		description: '',
		imageURL: '',
		boardId: Object.keys(BoardList).at(0) || 'en',
		status: News.status.DRAFT
	};

	const submitNewsPostRequest = async (values: FormikValues) => {

		let result;
		try{
			result = await NewsService.addNews(values);
			handleSuccess(values, result);
		} catch (error){
			showSnackbar('error', 'News could not be created');
		}
	}

	return (
		<ThemeProvider theme={theme}>
			<Container component="main" maxWidth="md">
				<CssBaseline/>
				<Header/>
				<main>
					<h1>Create news article</h1>
					<NewsForm
						initialValues={initialNewsFormData}
						validationSchema={generateNewsFormValidationSchema()}
						onSubmit={submitNewsPostRequest}
						mode='create'
					/>
				</main>
				<Snackbar
					anchorOrigin={{vertical: 'top', horizontal: 'center'}}
					open={openSnackbar}
					onClose={handleCloseSnackbar}
					autoHideDuration={6000}
				>
					<Alert severity={severity} onClose={handleCloseSnackbar} sx={{width: '100%'}}>
						{snackbarMessage}
					</Alert>
				</Snackbar>
			</Container>
		</ThemeProvider>
	);
}

export default withAuthentication(CreateNews);