import * as React from 'react';
import {Box} from '@mui/material';
import CreateNewsLink from './news/createNewsLink';

export default function LoggedInFooter() {
	return (
		<Box component='div'>
			<CreateNewsLink />
		</Box>
	);
};