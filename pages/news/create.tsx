import * as React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import {Button} from '@mui/material';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Header from '../../components/header';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import {useFormik} from 'formik';
import * as yup from 'yup';
import {useAuth} from '../../src/authContext';

const theme = createTheme();
const typedKeys = <T extends Record<string, unknown>>(obj: T) => Object.keys(obj).map((key) => key as keyof T);

export default function CreateNews() {

	// Note: Should be a dynamic list. Hard-coded here b/c of time-constraints
	const boardList = {
		en: 'England',
		de: 'Deutsch',
		it: 'Italiano'
	};

	const validationSchema = yup.object({
		title: yup
			.string()
			.required('Title is required'),
		imageURL: yup
			.string()
			.url()
	});

	const { user } = useAuth();

	const handleSuccess = (values: {}, json: string) => {
		// TODO: Implement actual handling
		console.log('fetch POST successful', {body: values, response: json})
	}
	const handleError = (url: string, values: {}, error: {}) => {
		// TODO: Implement actual error handling
		console.log('error during fetch POST', {url: url, body: values, error: error})
	}

	const formik = useFormik({
		initialValues: {
			// TODO: use withAuthentication to guarantee that user is set
			author: (user && user.email? user.email : 'unknown@test.com'),
			title: '',
			description: '',
			imageURL: '',
			boardId: Object.keys(boardList).at(0)
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			const url = process.env.API_HOST + '/v1/news';
			fetch(url, {
					method: 'POST',
					body: JSON.stringify(values)
				})
				.then(res => res.json())
				.then(json => handleSuccess(values, json))
				.catch(error => handleError(url, values, error));
		}
	});

	return (
		<ThemeProvider theme={theme}>
			<Container component="main" maxWidth="md">
				<CssBaseline/>
				<Header/>
				<main>
					<h1>Create news article</h1>
					<form onSubmit={formik.handleSubmit}>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<TextField
								required
								id="title"
								name="title"
								label="News title"
								fullWidth
								variant="standard"
								placeholder={'This is the title of the news article...'}
								value={formik.values.title}
								onChange={formik.handleChange}
								error={formik.touched.title && Boolean(formik.errors.title)}
								helperText={formik.touched.title && formik.errors.title}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								id="description"
								name="description"
								label="News description"
								fullWidth
								multiline
								rows={4}
								variant="standard"
								placeholder={'This is the description of the news article...'}
								value={formik.values.description}
								onChange={formik.handleChange}
								error={formik.touched.description && Boolean(formik.errors.description)}
								helperText={formik.touched.description && formik.errors.description}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								id="imageURL"
								name="imageURL"
								label="Image URL"
								fullWidth
								variant="standard"
								placeholder={'https://...'}
								value={formik.values.imageURL}
								onChange={formik.handleChange}
								error={formik.touched.imageURL && Boolean(formik.errors.imageURL)}
								helperText={formik.touched.imageURL && formik.errors.imageURL}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<FormControl sx={{ m: 1, minWidth: 120 }}>
								<InputLabel id="boardId-label">Board</InputLabel>
								<Select
									labelId="select-boardId-label"
									name="boardId"
									label="boardId"
									value={formik.values.boardId}
									onChange={formik.handleChange}
								>
									{
										typedKeys(boardList).map((key) => {
											return <MenuItem key={key} id={key}  value={key}>{boardList[key]}</MenuItem>;
										})
									}
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={12}>
							<Button type="submit" variant="contained" fullWidth>Submit</Button>
						</Grid>
					</Grid>
					</form>
				</main>
			</Container>
		</ThemeProvider>
	);
}