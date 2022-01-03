import {FormikValues} from 'formik';

export interface News {
	id: string;
	boardId: string;
	author: string;
	title: string;
	description: string;
	imageURL: string;
	CreatedAt: string;
	status: string;
}

export interface Board {
	id: string;
	name: string;
}

export type NewsParams = {
	author: string,
	title: string,
	description: string,
	imageURL: string,
	boardId: string,
	status: string,
};

export type NewsFormType = FormikValues & NewsParams;

// Note: Should be a dynamic list. Hard-coded here b/c of time-constraints
export const BoardList = {
	en: 'England',
	de: 'Deutsch',
	it: 'Italiano'
};

export const StatusList = {
	draft: 'Draft',
	published: 'Published',
	archived: 'Archived'
}

export const typedKeys = <T extends Record<string, unknown>>(obj: T) => Object.keys(obj).map((key) => key as keyof T);
