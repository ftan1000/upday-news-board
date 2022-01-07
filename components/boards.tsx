import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
import Link from 'next/link';
import {Box} from '@mui/material';
import {Board} from '../src/api/upday';

const Boards = (props: {
  data?: Board[];
  hasError?: boolean,
  errorMessage?: string
}) => {

  const data: Board[] = props.data || [];

  return (
    <>
      <h1>Boards</h1>
      <div>
        {data && data.length > 0 ?
          <>
            Choose a board to view and manage the news:
            <List>
              {
                data.map(values => (
                  <React.Fragment key={values.id}>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <Link href={'/board/' + values.id} passHref>
                          <ListItemText primary={values.name}/>
                        </Link>
                      </ListItemButton>
                    </ListItem>
                    <Divider/>
                  </React.Fragment>
                )
                )
              }
            </List>
          </>
          : <Box sx={{margin: 2}}>
            Boards could not be loaded!
            {props.hasError && props.errorMessage && (
              <pre>{props.errorMessage}</pre>
            )}
          </Box>
        }
      </div>
    </>
  )
}

export default Boards;
