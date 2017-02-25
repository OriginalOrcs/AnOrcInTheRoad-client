import io from 'socket.io-client';
import { updateQuests } from '../actions/actions';

import { store } from '../main';

const socket = io('http://10.6.20.234:3000');

socket.on('trigger update quests', () => {
  console.log('trigger');
  socket.emit('get quests', 0);
});

socket.on('update quests', (data) => {
  console.log('UPDATE DEM QUESTS', data);
  store.dispatch(updateQuests(data));
});

export default socket;