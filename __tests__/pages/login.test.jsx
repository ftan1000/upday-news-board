import React from 'react';
import {shallow} from 'enzyme';

import LoggedInFooter from '../../pages/loggedInFooter';
import Header from '../../components/header';
import Login from '../../pages/login';
import LoginForm from '../../components/loginForm';
import renderer from 'react-test-renderer';

describe('Login', () => {

  it('renders snapshot', () => {
    const component = renderer.create(<Login />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('contains expected components', () => {
    const wrapper = shallow(<Login/>);
    expect(wrapper.find(Header)).toBeTruthy();
    expect(wrapper.find(LoginForm)).toBeTruthy();
    expect(wrapper.find(LoggedInFooter).exists()).toBeFalsy();
  });
});
