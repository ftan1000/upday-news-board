import * as React from 'react';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Header from '../../components/header';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {FormikValues} from 'formik';
import {useAuth} from '../../src/authContext';
import {BoardList, NewsFormType} from '../../src/types';
import generateNewsFormValidationSchema from '../../src/newsFormValidationSchema';
import NewsForm from '../../components/newsForm';

const theme = createTheme();

export default function CreateNews() {

	const {user} = useAuth();

	const handleSuccess = (values: {}, json: string) => {
		// TODO: Implement actual handling
		console.log('fetch POST successful', {body: values, response: json})
	}
	const handleError = (url: string, values: {}, error: {}) => {
		// TODO: Implement actual error handling
		console.log('error during fetch POST', {url: url, body: values, error: error})
	}

	const initialNewsFormData: NewsFormType = {
		// TODO: use withAuthentication to guarantee that user is set
		author: (user && user.email ? user.email : 'unknown@test.com'),
		title: '',
		description: '',
		imageURL: '',
		boardId: Object.keys(BoardList).at(0) || 'en',
		status: 'draft'
	};

	const submitNewsPostRequest = (values: FormikValues) => {
		const url = process.env.API_HOST + '/v1/news';
		fetch(url, {
			method: 'POST',
			body: JSON.stringify(values)
		})
			.then(res => res.json())
			.then(json => handleSuccess(values, json))
			.catch(error => handleError(url, values, error));
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
			</Container>
		</ThemeProvider>
	);
}