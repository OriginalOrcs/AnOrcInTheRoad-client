import io from 'socket.io-client';
import { updateQuests, triggerUpdateCharacter } from '../actions/actions';

import { store } from '../main';

// const socket = io('10.7.37.58:3000');

// const socket = io('http://10.7.24.210:3000');
// const socket = io('http://169.254.86.190:3000')

// const socket = io('http://10.6.20.151:3000')
const socket = io('http://136.24.38.174:3000');

socket.on('trigger update quests', () => {
  socket.emit('get quests', store.getState().user.char_id);
});

socket.on('update quests', (data) => {
  store.dispatch(updateQuests(data));
});

socket.on('update character', (char) => {
  store.dispatch(triggerUpdateCharacter(char));
});


export default socket;
