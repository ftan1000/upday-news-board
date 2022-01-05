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
import {Box, Button} from "@mui/material";
import Grid from "@mui/material/Grid";
import WarningTwoToneIcon from "@mui/icons-material/WarningTwoTone";
import {useState} from "react";
import Link from "next/link";
import LoggedInFooter from "../loggedInFooter";

const theme = createTheme();

const CreateNews: NextPage = () => {

	const {user} = useAuth();

	const initialNewsFormData: News = {
		author: (user && user.email || 'unknown@test.com'),
		title: '',
		description: '',
		imageURL: '',
		boardId: Object.keys(BoardList).at(0) || 'en',
		status: News.status.DRAFT
	};

	const [successMessage, setSuccessMessage] = useState<string>('');
	const [errorMessage, setErrorMessage] = useState<string>('');
	const [news, setNews] = useState<News>();

	const submitNewsPostRequest = async (values: FormikValues) => {
		NewsService.addNews(values)
			.then(result => handleSuccess(result))
			.catch(error => setErrorMessage(error.message));
	}

	const handleSuccess = (news: News) => {
		setSuccessMessage('News created!');
		setNews(news);
	}

	const handleReset = () => {
		setSuccessMessage('');
	}

return (
		<ThemeProvider theme={theme}>
			<Container component="main" maxWidth="md">
				<CssBaseline/>
				<Header/>
				<main>
					<h1>Create news article</h1>

					{ successMessage && (
						<Grid item xs={12}>
							<Box sx={{marginBottom: 5, color: 'green'}}>
								<span dangerouslySetInnerHTML={{ __html: successMessage }} />
								{' '}
								{news && (
									<>
										<Link href={'/news/'+news.id}>
											<a>Edit</a>
										</Link>
										{' | '}
										<Link href={'/board/'+news.boardId}>
											<a>Go to board</a>
										</Link>
										<br /><br />
										<Button sx={{marginTop: 2}} variant="contained" color="primary" onClick={() => handleReset()} fullWidth>Create another news article</Button>
									</>
								)}
							</Box>
						</Grid>
					)}

					{errorMessage && (
						<Grid item xs={12}>
							<Box sx={{padding: 2, color: 'red', fontSize: '1.2em'}}>
								<WarningTwoToneIcon /> News could not be created.
								<pre><div dangerouslySetInnerHTML={{ __html: errorMessage }} /></pre>
							</Box>
						</Grid>
					)}

					{!successMessage && (
						<NewsForm
							initialValues={initialNewsFormData}
							validationSchema={generateNewsFormValidationSchema()}
							onSubmit={submitNewsPostRequest}
							mode='create'
						/>
					)}
					{/*<Link href={'/'}>*/}
					{/*	<Button sx={{marginTop: 2}} variant="outlined" color="primary" fullWidth>Go to boards</Button>*/}
					{/*</Link>*/}
				</main>
				<LoggedInFooter hideCreateNews={true} />
			</Container>
		</ThemeProvider>
	);
}

export default withAuthentication(CreateNews);