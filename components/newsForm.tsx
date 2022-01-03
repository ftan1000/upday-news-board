import * as React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import {AlertColor, Button} from '@mui/material';
import {Formik} from 'formik';
import {FormikConfig, FormikValues} from 'formik/dist/types';
import {NewsFormType} from '../src/types';
import {AnySchema} from 'yup';
import {OptionalObjectSchema} from 'yup/lib/object';
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import ArchiveTwoToneIcon from '@mui/icons-material/ArchiveTwoTone';
import DeleteIcon from '@mui/icons-material/Delete';
import PostAddTwoToneIcon from '@mui/icons-material/PostAddTwoTone';
import ModeIcon from '@mui/icons-material/Mode';
import ChangeCircleOutlinedIcon from '@mui/icons-material/ChangeCircleOutlined';
import {useRouter} from 'next/router';
import BoardSelector from './boardSelector';


type NewsFormProps = {
	initialValues: NewsFormType,
	validationSchema: OptionalObjectSchema<Record<string, AnySchema>>,
	onSubmit: (values: FormikValues) => void;
	mode: 'create' | 'edit';
	showSnackbar?: (severity: AlertColor, message: string) => void;
}

export default function NewsForm(props: NewsFormProps) {

	const router = useRouter();

	const _onSubmit = () => {
		console.log('start onSubmit');
	}

	const formikConfig: FormikConfig<NewsFormType> = {
		initialValues: props.initialValues,
		validationSchema: props.validationSchema,
		onSubmit: _onSubmit
	};

	const handleCreate = (values: FormikValues) => {
		submitNewsPostRequest(values);
	}

	const handleSuccess = (method: string, url: string, values: {}, status: string, newState: string, id: string) => {
		// Important: status may have the value 400 or 404
		console.log('fetch successful', {method: method, url: url, body: values, status: status, newState: newState})
		props.showSnackbar?.('success', 'Sucessfully updated!');
		newState == 'deleted'?
			router.push('/')
			:
			router.push('/news/' + id + '?newState=' + newState)
			;
	}
	const handleError = (method: string, url: string, values: {}, error: {}) => {
		console.log('error during fetch', {method: method, url: url, body: values, error: error})
		props.showSnackbar?.('error', 'An error occurred');
	}

	const handleStatusUpdate = (values: FormikValues, newState: string) => {
		const url = process.env.API_HOST + '/v1/news/' + values.id + '/' + newState;
		const method = 'POST';
		fetch(url, {
			method: method,
		})
			.then(res => res.status)
			.then(status => {
				if (status == 200) handleSuccess(method, url, {}, String(status), newState, values.id);
				else {
					handleError(method, url, {}, {});
				}
			})
			.catch(error => handleError(method, url, {}, error));
	}

	const handleUpdate = (values: FormikValues) => {
		submitNewsPutRequest(values);
	}

	const handleDraft = (values: FormikValues) => {
		handleStatusUpdate(values, 'draft');
	}
	const handleArchive = (values: FormikValues) => {
		handleStatusUpdate(values, 'archive');
	}
	const handlePublish = (values: FormikValues) => {
		handleStatusUpdate(values, 'published');
	}
	const handleDelete = (values: FormikValues) => {
		const url = process.env.API_HOST + '/v1/news/' + values.id;
		const method = 'DELETE';
		fetch(url, {
			method: method,
		})
			.then(res => res.status)
			.then(status => handleSuccess(method, url, {}, String(status), 'deleted', values.id))
			.catch(error => handleError(method, url, {}, error));
	}

	const submitNewsPutRequest = (values: FormikValues) => {
		const url = process.env.API_HOST + '/v1/news';
		const method = 'PUT';
		fetch(url, {
			method: method,
			body: JSON.stringify(values)
		})
			.then(res => res.json())
			.then(json => handleSuccess(method, url, values, json, 'updated', values.id))
			.catch(error => handleError(method, url, values, error));
	}

	const submitNewsPostRequest = (values: FormikValues) => {
		const url = process.env.API_HOST + '/v1/news';
		const method = 'POST';
		fetch(url, {
			method: method,
			body: JSON.stringify(values)
		})
			.then(res => res.json())
			.then(json => handleSuccess(method, url, values, json, 'created', json.id))
			.catch(error => handleError(method, url, values, error));
	}

	return (
		<Formik {...formikConfig}
		>
			{formik => (

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
						{ props.mode === 'create' && (
							<Grid item xs={12} sm={6}>
								<BoardSelector handleChange={formik.handleChange} boardId={formik.values.boardId} />
							</Grid>
						)}

						{ props.mode === 'create' && (
							<Grid item xs={12}>
								<Button type="submit" variant="contained" fullWidth onClick={() => handleCreate(formik.values)}>Submit</Button>
							</Grid>
						)}

						{ props.mode === 'edit' && (

							<Grid item xs={12} data-testid='form-buttons'>
								{
									{
										'archived': <><InfoTwoToneIcon /> <b>Archived news cannot be changed.</b></>,
										'draft': <>
											<Button type="submit" fullWidth variant="contained" startIcon={<ChangeCircleOutlinedIcon/>} onClick={() => formik.validateForm().then(() => handleUpdate(formik.values))}>Update</Button>
											<Button type="submit" fullWidth variant="contained" sx={{mt: 2}} color="secondary"
															startIcon={<ArchiveTwoToneIcon/>} onClick={() => handleArchive(formik.values)}>Archive</Button>
											<Button type="submit" fullWidth variant="contained" sx={{mt: 2}} color="error" startIcon={<DeleteIcon/>}
															onClick={() => handleDelete(formik.values)}>Delete</Button>
											{formik.values.title && formik.values.description && formik.values.imageURL && (
												<Button type="submit" fullWidth variant="contained" sx={{mt: 2}} color="success"
																startIcon={<PostAddTwoToneIcon/>} onClick={() => handlePublish(formik.values)}>Publish</Button>
											)}
										</>,
										'published': <>
											<Button type="submit" fullWidth variant="contained" startIcon={<ChangeCircleOutlinedIcon/>} onClick={() => handleUpdate(formik.values)}>Update</Button>
											<Button type="submit" fullWidth variant="outlined" sx={{mt: 2}} startIcon={<ModeIcon/>}
															onClick={() => handleDraft(formik.values)}>Draft</Button>
											<Button type="submit" fullWidth variant="contained" sx={{mt: 2}} color="secondary"
															startIcon={<ArchiveTwoToneIcon/>} onClick={() => handleArchive(formik.values)}>Archive</Button>
											<Button type="submit" fullWidth variant="contained" sx={{mt: 2}} color="error" startIcon={<DeleteIcon/>}
															onClick={() => handleDelete(formik.values)}>Delete</Button>
										</>
									}[formik.values.status]
								}
							</Grid>
						)}
					</Grid>
				</form>
			)}
		</Formik>
	)
}