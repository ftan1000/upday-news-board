import React from 'react';
import {shallow} from 'enzyme';

import LoggedInFooter from '../loggedInFooter';
import Header from '../../components/header';
import Login from '../login';
import LoginForm from '../../components/loginForm';

describe('Login', () => {

  it('contains expected components', () => {
    const wrapper = shallow(<Login/>);
    expect(wrapper.find(Header)).toBeTruthy();
    expect(wrapper.find(LoginForm)).toBeTruthy();
    expect(wrapper.find(LoggedInFooter).exists()).toBeFalsy();
  });
});
