import 'react-native';
import React from 'react';
import QuestRow from '../QuestRow';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <QuestRow />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
