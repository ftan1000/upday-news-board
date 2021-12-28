import * as React from 'react';
import {Box} from '@mui/material';

interface News {
	id: string;
	boardId: string;
	author: string;
	title: string;
	description: string;
	imageURL: string;
	CreatedAt: string;
	status: string;
}

const NewsList = (props: {
	data: News[];
}) => {

	const data: News[] = props.data;

	return (
		<>
			<div>
				{data ?
					<>
						<div>
							{
								data.map(values => {
									return (
										<Box component='div' sx={{border: 1, padding: 5}} key={values.id}>
											<div>id:{values.id}</div>
											<div>boardId:{values.boardId}</div>
											<div>author:{values.author}</div>
											<div>title:{values.title}</div>
											<div>description:{values.description}</div>
											<div>CreatedAt:{values.CreatedAt}</div>
											<div>status:{values.status}</div>
											<div>imageURL:{values.imageURL}</div>
											<img src={values.imageURL} alt={values.title}/>
										</Box>
									)
								})
							}
						</div>
					</>
					: 'No news available.'
				}
			</div>
		</>
	)
}

export default NewsList;