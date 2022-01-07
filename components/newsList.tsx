import * as React from 'react';
import NewsItem from './newsItem';
import {News} from '../src/api/upday';

const NewsList = (props: {
	data: News[];
}) => {

  const data: News[] = props.data;

  return (
    <div>
      {data ?
        <div>
          {data.map(values => <NewsItem key={values.id} data={values}/>)}
        </div>
        : 'No news available.'
      }
    </div>
  )
}

export default NewsList;