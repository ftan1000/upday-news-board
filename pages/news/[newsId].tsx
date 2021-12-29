import * as React from 'react';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Header from '../../components/header';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {FormikValues} from 'formik';
import {GetServerSideProps, NextPage} from 'next';
import {BoardList, NewsFormType, StatusList} from '../../src/types';
import generateNewsFormValidationSchema from '../../src/newsFormValidationSchema';
import NewsForm from '../../components/newsForm';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeIcon from '@mui/icons-material/Mode';
import ArchiveTwoToneIcon from '@mui/icons-material/ArchiveTwoTone';
import PostAddTwoToneIcon from '@mui/icons-material/PostAddTwoTone';
import {useRouter} from 'next/router';

const theme = createTheme();

const UpdateNews: NextPage = (props) => {

	const router = useRouter()

	const news = props.data;
	console.log('news',news);

	const handleSuccess = (method: string, values: {}, status: string, newState: string) => {
		// TODO: Implement actual handling
		// Important: status may have the value 400 or 404
		console.log('fetch successful', {method: method, body: values, status: status, newState: newState})
		router.push('/news/'+news.id+'?newState='+newState);
	}
	const handleError = (method: string, url: string, values: {}, error: {}) => {
		// TODO: Implement actual error handling
		console.log('error during fetch', {method: method, url: url, body: values, error: error})
	}

	const initialNewsFormData: NewsFormType = {
		id: news.id,
		author: news.author,
		title: news.title,
		description: news.description,
		imageURL: news.imageURL || '',
		boardId: news.boardId,
		status: news.status
	};

	const handleStatusUpdate = (newState: string) => {

		const url = process.env.API_HOST + '/v1/news/' + news.id + '/' + newState;
		const method = 'POST';
		fetch(url, {
			method: method,
		})
			.then(res => res.status)
			.then(status => handleSuccess(method, {}, String(status), newState))
			.catch(error => handleError(method, url, {}, error));
	}

	const handleDraft = () => {
		handleStatusUpdate('draft');
	}
	const handleArchive = () => {
		handleStatusUpdate('archive');
	}
	const handlePublish = () => {
		handleStatusUpdate('published');
	}
	const handleDelete = () => {
		const url = process.env.API_HOST + '/v1/news/' + news.id;
		const method = 'DELETE';
		fetch(url, {
			method: method,
		})
			.then(res => res.status)
			.then(status => handleSuccess(method, {}, String(status)))
			.catch(error => handleError(method, url, {}, error));
	}


	const submitNewsPutRequest = (values: FormikValues) => {
		console.log('submitNewsPutRequest start');
		const url = process.env.API_HOST + '/v1/news';
		fetch(url, {
			method: 'PUT',
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
					<h1>News article</h1>
					<h6>Board: {BoardList[news.boardId]} / Status: {StatusList[news.status]} / Author: {news.author} / ID: {news.id}</h6>

					<NewsForm
						initialValues={initialNewsFormData}
						validationSchema={generateNewsFormValidationSchema()}
						onSubmit={submitNewsPutRequest}
						mode='edit'
					/>

					{news.status !== 'archived' && (
						<div data-testid='div-more-actions'>
							<h2>More actions</h2>
							<Button type="submit" fullWidth variant="outlined" sx={{mt: 2}} startIcon={<ModeIcon />} onClick={handleDraft}>Draft</Button>
							<Button type="submit" fullWidth variant="contained" sx={{mt: 2}} color="secondary" startIcon={<ArchiveTwoToneIcon />} onClick={handleArchive}>Archive</Button>
							<Button type="submit" fullWidth variant="contained" sx={{mt: 2}} color="error" startIcon={<DeleteIcon />} onClick={handleDelete}>Delete</Button>
							<Button type="submit" fullWidth variant="contained" sx={{mt: 2}} color="success" startIcon={<PostAddTwoToneIcon />} onClick={handlePublish}>Publish</Button>
						</div>
					)}

				</main>
			</Container>
		</ThemeProvider>
	);
}

export const getServerSideProps: GetServerSideProps = async ({params}) => {

	const res = await fetch(process.env.API_HOST + '/v1/news/' + params.newsId)
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

	return {props: {data}}
}

export default UpdateNews;