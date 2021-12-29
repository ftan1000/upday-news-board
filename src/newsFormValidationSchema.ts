import * as yup from 'yup';
import {AnySchema} from 'yup';
import {OptionalObjectSchema} from 'yup/lib/object';

const generateNewsFormValidationSchema = (): OptionalObjectSchema<Record<string, AnySchema>> =>
	yup.object({
		title: yup
			.string()
			.required('Title is required'),
		imageURL: yup
			.string()
			.url()
	});

export default generateNewsFormValidationSchema;
