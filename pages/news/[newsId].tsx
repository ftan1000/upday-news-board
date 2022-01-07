import * as React from 'react';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Header from '../../components/header';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {FormikValues} from 'formik';
import {GetServerSideProps, NextPage} from 'next';
import {StatusList} from '../../src/types';
import generateNewsFormValidationSchema from '../../src/newsFormValidationSchema';
import NewsForm from '../../components/newsForm';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeIcon from '@mui/icons-material/Mode';
import ArchiveTwoToneIcon from '@mui/icons-material/ArchiveTwoTone';
import PostAddTwoToneIcon from '@mui/icons-material/PostAddTwoTone';
import {News, NewsService} from '../../src/api/upday';
import Grid from '@mui/material/Grid';
import {Box} from '@mui/material';
import WarningTwoToneIcon from '@mui/icons-material/WarningTwoTone';
import { remark } from 'remark'
import html from 'remark-html'
import LoggedInFooter from '../loggedInFooter';
import {useState} from 'react';

const theme = createTheme();

const UpdateNews: NextPage = (props) => {

  const [news, setNews] = useState(props.data);

  const resetMessages = () => {
    setSuccessMessage('');
    setErrorMessage('');
  }

  const handleContentUpdate = async (values: FormikValues) => {
    resetMessages();
    NewsService.updateNews(values)
      .then(() => setSuccessMessage('Content was successfully updated.'))
      .catch(error => handleAPIError(error));
  }

  const handleStatusUpdate = async (newState: News.status) => {
    resetMessages();
    let res;
    try {
      switch (newState){
      case (News.status.DRAFT): res = await NewsService.drarftNews(news.id); break;
      case (News.status.ARCHIVE): res = await NewsService.archiveNews(news.id); break;
      case (News.status.PUBLISHED): res = await NewsService.publishNews(news.id); break;
      }
      news.status = newState;
      setSuccessMessage('Successfully updated to new state '+news.status);
    } catch (error){
      handleAPIError(error);
    }
  }

  const handleDelete = async () => {
    resetMessages();
    NewsService.deleteNews(news.id)
      .then(() => setSuccessMessage('News successfully deleted'))
      .catch(error => handleAPIError(error));
    setNews(null);
  }

  const handleAPIError = (error: any) => {
    if (!error) return;

    if (error.body){
      let body = error.body.replaceAll('\\n', '\n').replaceAll('\\t', '');
      setMarkupErrorMessage(body);
    } else if (error.message){
      setMarkupErrorMessage(error.message);
    }
  }

  const setMarkupErrorMessage = async (errorMessage: string) => {
    const processedContent = await remark()
      .use(html)
      .process(errorMessage)
    setErrorMessage(processedContent.toString());
  }

  const [successMessage, setSuccessMessage] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md">
        <CssBaseline/>
        <Header boardId={news?.boardId || ''} title={news?.title || ''}/>
        <main>
          {news && (
            <h6>Status: {StatusList[news.status]} | Author: {news.author}</h6>
          )}

          { successMessage && (
            <Grid item xs={12}>
              <Box sx={{marginBottom: 5, color: 'green'}}>
                <div dangerouslySetInnerHTML={{ __html: successMessage }} />
              </Box>
            </Grid>
          )}

          { errorMessage && (
            <Grid item xs={12}>
              <Box sx={{padding: 2, color: 'red', fontSize: '1.2em'}}>
                <WarningTwoToneIcon /> Update failed<br />
                <div dangerouslySetInnerHTML={{ __html: errorMessage }} />
              </Box>
            </Grid>
          )}

          {news && (
            <NewsForm
              initialValues={news}
              validationSchema={generateNewsFormValidationSchema()}
              onSubmit={handleContentUpdate}
              mode='edit'
            />
          )}

          {news && news.status !== 'archived' && (
            <div data-testid='div-more-actions'>
              <h2>More actions</h2>
              <Button fullWidth variant="outlined" sx={{mt: 2}} startIcon={<ModeIcon/>}
                onClick={() => handleStatusUpdate(News.status.DRAFT)}>Draft</Button>
              <Button type="submit" fullWidth variant="contained" sx={{mt: 2}} color="secondary"
                startIcon={<ArchiveTwoToneIcon/>} onClick={() => handleStatusUpdate(News.status.ARCHIVE)}>Archive</Button>
              <Button type="submit" fullWidth variant="contained" sx={{mt: 2}} color="error" startIcon={<DeleteIcon/>}
                onClick={handleDelete}>Delete</Button>
              <Button fullWidth variant="contained" sx={{mt: 2}} color="success"
                startIcon={<PostAddTwoToneIcon/>} onClick={() => handleStatusUpdate(News.status.PUBLISHED)}>Publish</Button>
            </div>
          )}

        </main>
        <LoggedInFooter/>
      </Container>
    </ThemeProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async ({params}) => {

  const res = await fetch(process.env.API_HOST + '/v1/news/' + params.newsId)
  let data;
  try {
    data = await res.json()
  } catch (error) {
    data = {
      hasError: true,
      errorMessage: error.message || 'Unknown error'
    };
    return {props: {data}}
  }

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {props: {data}}
}

export default UpdateNews;