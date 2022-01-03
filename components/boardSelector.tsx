import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import {BoardList, typedKeys} from '../src/types';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import * as React from 'react';

type BoardSelectorProps = {
	boardId: string;
	handleChange: (e: React.ChangeEvent<any>) => void;
}

export default function BoardSelector(props: BoardSelectorProps){
	return (
		<FormControl sx={{m: 1, minWidth: 120}}>
			<InputLabel id="boardId-label">Board</InputLabel>
			<Select
				labelId="select-boardId-label"
				name="boardId"
				label="boardId"
				value={props.boardId}
				onChange={() => props.handleChange}
			>
				{
					typedKeys(BoardList).map((key) => {
						return <MenuItem key={key} id={key} value={key}>{BoardList[key]}</MenuItem>;
					})
				}
			</Select>
		</FormControl>
	);
}