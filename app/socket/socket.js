import io from 'socket.io-client';
import { updateQuests, updateCharacter } from '../actions/actions';

import { store } from '../main';

// const socket = io('10.7.37.58:3000');

// const socket = io('http://10.7.24.210:3000');
// const socket = io('http://169.254.86.190:3000')

// const socket = io('http://10.6.20.151:3000')
const socket = io('http://10.6.20.234:3000')

socket.on('trigger update quests', () => {
  console.log('trigger');
  socket.emit('get quests', 0);
});

socket.on('update quests', (data) => {
  console.log('UPDATE DEM QUESTS', data);
  store.dispatch(updateQuests(data));
});

socket.on('make character', (id) => {
	console.log('MAKE CHAR: ', id);
});

socket.on('update character', function(char) {
  console.log('RESULT FROM GET CHAR OR UPDATE CHAR: ', char);
  store.dispatch(updateCharacter(char));
});

socket.on('')

export default socket;
