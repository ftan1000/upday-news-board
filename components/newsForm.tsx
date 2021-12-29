import * as React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import {Button} from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import {Formik} from 'formik';
import {FormikConfig, FormikValues} from 'formik/dist/types';
import {BoardList, NewsFormType} from '../src/types';
import {AnySchema} from 'yup';
import {OptionalObjectSchema} from 'yup/lib/object';

const typedKeys = <T extends Record<string, unknown>>(obj: T) => Object.keys(obj).map((key) => key as keyof T);

type NewsFormProps = {
	initialValues: NewsFormType,
	validationSchema: OptionalObjectSchema<Record<string, AnySchema>>,
	onSubmit: (values: FormikValues) => void;
};

export default function NewsForm(props: NewsFormProps) {

	const formikConfig: FormikConfig<NewsFormType> = {
		initialValues: props.initialValues,
		validationSchema: props.validationSchema,
		onSubmit: props.onSubmit
	};

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
						<Grid item xs={12} sm={6}>
							<FormControl sx={{m: 1, minWidth: 120}}>
								<InputLabel id="boardId-label">Board</InputLabel>
								<Select
									labelId="select-boardId-label"
									name="boardId"
									label="boardId"
									value={formik.values.boardId}
									onChange={formik.handleChange}
								>
									{
										typedKeys(BoardList).map((key) => {
											return <MenuItem key={key} id={key} value={key}>{BoardList[key]}</MenuItem>;
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
			)}
		</Formik>
	)
}