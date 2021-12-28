import * as React from 'react';
import {Box} from '@mui/material';
import {News} from '../src/types';

const NewsItem = (props: {
	data: News;
}) => {

	const news: News = props.data;

	return (

		<Box component='div' sx={{border: 1, padding: 5}} key={news.id}>
			<div>id:{news.id}</div>
			<div>boardId:{news.boardId}</div>
			<div>author:{news.author}</div>
			<div>title:{news.title}</div>
			<div>description:{news.description}</div>
			<div>CreatedAt:{news.CreatedAt}</div>
			<div>status:{news.status}</div>
			<div>imageURL:{news.imageURL}</div>
			<img src={news.imageURL} alt={news.title}/>
		</Box>

	)
}

export default NewsItem;