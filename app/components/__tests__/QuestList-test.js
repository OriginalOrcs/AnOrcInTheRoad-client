import 'react-native';
import React from 'react';
import QuestList from '../QuestList';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <QuestList />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
