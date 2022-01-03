import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
import {Board} from '../src/types';
import Link from 'next/link';

const Boards = (props: {
	data: Board[];
}) => {

	const data: Board[] = props.data;

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
								<React.Fragment key={values.id}>
									<ListItem disablePadding>
										<ListItemButton>
											<Link href={'/board/'+ values.id}>
												<ListItemText primary={values.name} />
											</Link>
										</ListItemButton>
									</ListItem>
									<Divider />
								</React.Fragment>
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