import React from 'react';
import {shallow} from 'enzyme';

import Home from '../index';
import Header from '../../components/header';
import LoggedInFooter from '../loggedInFooter';
import Boards from '../../components/boards';

describe('Home', () => {

  it('contains expected components', () => {
    const wrapper = shallow(<Home/>);
    expect(wrapper.find(Header)).toBeTruthy();
    expect(wrapper.find(Boards)).toBeTruthy();
    expect(wrapper.find(LoggedInFooter)).toBeTruthy();
  });
});
