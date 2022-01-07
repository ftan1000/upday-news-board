import React from 'react';
import {shallow} from 'enzyme';

import Home from '../../pages';
import Header from '../../components/header';
import LoggedInFooter from '../../pages/loggedInFooter';
import Boards from '../../components/boards';
import renderer from 'react-test-renderer';

describe('Home', () => {

  it('renders snapshot', () => {
    const component = renderer.create(<Home />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('contains expected components', () => {
    const wrapper = shallow(<Home/>);
    expect(wrapper.find(Header)).toBeTruthy();
    expect(wrapper.find(Boards)).toBeTruthy();
    expect(wrapper.find(LoggedInFooter)).toBeTruthy();
  });
});
