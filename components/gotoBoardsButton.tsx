import * as React from 'react';
import Link from 'next/link';
import {Button} from "@mui/material";

export default function GotoBoardsButton(){
	return (
		<Link href={'/'} passHref>
			<Button sx={{marginTop: 2}} variant="outlined" color="primary" fullWidth>Go to boards</Button>
		</Link>
	);
};