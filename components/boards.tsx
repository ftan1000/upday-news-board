import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
import Link from 'next/link';
import {Box} from '@mui/material';
import {Board} from '../src/api/upday';
import {ReactNode} from 'react';

type BoardsProps = {
  data?: Board[];
  hasError?: boolean,
  errorMessage?: string
  children?: ReactNode;
};

const Boards = (props: BoardsProps) => {

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
                          <ListItemText primary={values.name} data-testid={'board-ListItemText-'+values.id}/>
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
            <Box data-testid="board-nodata-static-msg">
              Boards could not be loaded!
            </Box>

            {props.hasError && props.errorMessage && (
              <Box data-testid="board-nodata-error-msg">
                <pre>{props.errorMessage}</pre>
              </Box>
            )}
          </Box>
        }
      </div>
    </>
  )
}

export default Boards;
