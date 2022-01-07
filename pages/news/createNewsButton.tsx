import * as React from 'react';
import Link from 'next/link';
import {Button} from '@mui/material';

export default function CreateNewsButton(){
  return (
    <Link href={'/news/create'} passHref>
      <Button sx={{marginTop: 2}} variant="outlined" color="primary" fullWidth>Create news article</Button>
    </Link>
  );
};