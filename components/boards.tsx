import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';

interface BoardData {
	id: string;
	name: string;
}

const Boards = (props: {
	data: BoardData[];
}) => {

	const data: BoardData[] = props.data;

	return (
		<>
			<h1>Boards</h1>
			<div>
				{	data?
					<>
					Choose a board to view the board's news and manage the news:
					<List>
						{
							data.map(values => (
								<>
									<ListItem disablePadding key={values.id}>
										<ListItemButton component='a' href={'/board/'+ values.id}>
											<ListItemText primary={values.name} />
										</ListItemButton>
									</ListItem>
									<Divider />
								</>
								)
							)
						}
					</List>
					</>
					: 'No boards available.'
				}
			</div>
		</>
	)
}

export default Boards;