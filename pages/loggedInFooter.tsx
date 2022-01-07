import * as React from 'react';
import CreateNewsButton from './news/createNewsButton';
import GotoBoardsButton from '../components/gotoBoardsButton';

type Props = {
	hideCreateNews?: boolean;
	hideGotoBoards?: boolean;
};
export default function LoggedInFooter(props: Props) {
  return (
    <>
      {!props.hideCreateNews && <CreateNewsButton />}
      {!props.hideGotoBoards && <GotoBoardsButton />}
    </>
  );
};

LoggedInFooter.defaultProps = {
  hideCreateNews: false,
  hideGotoBoards: false
};