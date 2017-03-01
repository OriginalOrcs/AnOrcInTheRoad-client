import 'react-native';
import React from 'react';
import QuestCreate from '../QuestCreate';
import renderer from 'react-test-renderer';

var questCreateProp = {
  onSubmitQuest: (name, location, questType, experience, creator_id, item_id) => {
    getLocationAsync((result) => {
      return addQuest(name, location, questType, experience, creator_id, result.coords.latitude, result.coords.longitude);
    })
    .then((result) => {
      console.log('FINAL RESULT', result);
      dispatch(result);
      socket.emit('create quest', result);
    });
  },
  user: {name: 'Frodo',
    user_id: 'facebook|1392112007529687',
    char_id: 6,
    level: 1,
    experience: 0,
  },
};

it('renders correctly', () => {
  const tree = renderer.create(
    <QuestCreate user={questCreateProp.user} onSubmitQuest={questCreateProp.onSubmitQuest} />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
