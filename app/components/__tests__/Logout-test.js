import 'react-native';
import React from 'react';
import Logout from '../Logout';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <Logout />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
