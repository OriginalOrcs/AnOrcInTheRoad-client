import 'react-native';
import React from 'react';
import CharacterCreate from '../CharacterCreate';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <CharacterCreate />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
