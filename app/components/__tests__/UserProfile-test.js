import 'react-native';
import React from 'react';
import UserProfile from '../UserProfile';
import renderer from 'react-test-renderer';

const initialState = {
      createCharVisible: false,
      name: null,
      user_id: null,
      char_id: null,
      level: null,
      experience: null,
    };

it('renders correctly', () => {
  const tree = renderer.create(
    <UserProfile />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
