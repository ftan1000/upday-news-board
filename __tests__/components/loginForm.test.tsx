import React from 'react';
import LoginForm from "../../components/loginForm";
import renderer from 'react-test-renderer';

describe('LoginForm', () => {

  it('renders snapshot', () => {
    const component = renderer.create(<LoginForm />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

});
