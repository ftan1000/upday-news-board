import * as React from 'react';
import {Box} from '@mui/material';
import {News} from '../src/types';

const NewsItem = (props: {
	data: News;
}) => {

	const news: News = props.data;

	return (
		<Box component='div' sx={{border: 1, padding: 3, margin: 2}} key={news.id}>
			<h1>{news.title}</h1>
			<img src={news.imageURL} alt={news.title}/>
			<div>{news.description}</div>{/* TODO: Truncate description here when too long */}
			<hr />
			<sub>{news.author} - {news.CreatedAt}</sub> {/* TODO: Better date/time format */}
		</Box>
	)
}

export default NewsItem;