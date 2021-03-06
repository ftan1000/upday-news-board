import React from 'react';
import {shallow} from 'enzyme';

import LoggedInFooter from '../../pages/loggedInFooter';
import CreateNewsButton from '../../pages/news/createNewsButton';
import GotoBoardsButton from '../../components/gotoBoardsButton';
import renderer from 'react-test-renderer';

describe('LoggedInFooter', () => {

  it('renders snapshot', () => {
    const component = renderer.create(<LoggedInFooter />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('contains expected components by default', () => {
    const wrapper = shallow(<LoggedInFooter/>);
    expect(wrapper.find(CreateNewsButton)).toBeTruthy();
    expect(wrapper.find(GotoBoardsButton)).toBeTruthy();
    expect(wrapper.contains(<GotoBoardsButton />)).toBe(true)
    expect(wrapper.contains(<CreateNewsButton />)).toBe(true)
  });

  it('can hide CreateNewsButton', () => {
    const wrapper = shallow(<LoggedInFooter hideCreateNews={true}/>);
    expect(wrapper.contains(<GotoBoardsButton />)).toBe(true)
    expect(wrapper.contains(<CreateNewsButton />)).toBe(false)
  });

  it('can hide GotoBoardsButton', () => {
    const wrapper = shallow(<LoggedInFooter hideGotoBoards={true}/>);
    expect(wrapper.contains(<GotoBoardsButton />)).toBe(false)
    expect(wrapper.contains(<CreateNewsButton />)).toBe(true)
  });

  it('can hide both buttons', () => {
    const wrapper = shallow(<LoggedInFooter hideGotoBoards={true} hideCreateNews={true}/>);
    expect(wrapper.contains(<GotoBoardsButton />)).toBe(false)
    expect(wrapper.contains(<CreateNewsButton />)).toBe(false)
  });
});
