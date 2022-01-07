import React from 'react';
import {shallow} from 'enzyme';

import Home from '../../pages';
import Header from '../../components/header';
import LoggedInFooter from '../../pages/loggedInFooter';
import Boards from '../../components/boards';

describe('Home', () => {

  it('contains expected components', () => {
    const wrapper = shallow(<Home/>);
    expect(wrapper.find(Header)).toBeTruthy();
    expect(wrapper.find(Boards)).toBeTruthy();
    expect(wrapper.find(LoggedInFooter)).toBeTruthy();
  });
});
