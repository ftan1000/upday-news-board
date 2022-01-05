import * as React from 'react';
import {Box} from '@mui/material';
import Link from 'next/link';
import {News} from "../src/api/upday";

const NewsItem = (props: {
	data: News;
}) => {

	const DESCRIPTION_MAX_DISPLAY_LENGTH = 100;

	const news: News = props.data;

	const formattedDate = new Intl.DateTimeFormat('default', {
		year: 'numeric', month: 'long', day: 'numeric',
		hour: 'numeric', minute: 'numeric', second: 'numeric',
		hour12: false,
		timeZone: 'Europe/Berlin'
	}).format(new Date(news.CreatedAt))

	return (
		<Box component='div' sx={{marginTop: 5}} key={news.id}>
			<Box component='div' sx={{border: 1, padding: 2}}>

				<Box>
					{news.title && (
						<h1>{news.title}</h1>
					)}
					{!news.title && (
						<em>No title</em>
					)}
				</Box>

				<Box>
					{news.description && (
						<Box component='div' sx={{whiteSpace: 'pre-line'}}>
							{news.description.substring(0, DESCRIPTION_MAX_DISPLAY_LENGTH)}
							{news.description.length >= DESCRIPTION_MAX_DISPLAY_LENGTH && ` [...] (100 more characters)`}
						</Box>
					)}
					{!news.description && (
						<em>No description</em>
					)}
				</Box>

				<Box>
					{news.imageURL && (
						<img src={news.imageURL} alt={news.title}/>
					)}
					{!news.imageURL && (
						<em>No imageURL</em>
					)}
				</Box>

			</Box>
			<sub>
				By {news.author}, {formattedDate} - <Link href={'/news/' + news.id}>
					<a>Edit</a>
				</Link>
			</sub>
		</Box>
	)
}

export default NewsItem;