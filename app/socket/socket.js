import io from 'socket.io-client';
import { 
  updateQuests,
  triggerUpdateCharacter,
  updateParty,
  createInvite,
  createParty,
  leaveParty,
  handleAlreadyInParty,
  handleNotOnline,
  handleReject,
} from '../actions/actions';
import {
  Alert,
} from 'react-native';
import partyMembers from '../constants/partyMembers';
import { store } from '../main';

// const socket = io('10.7.37.58:3000');

// const socket = io('http://10.7.24.210:3000');
// const socket = io('http://169.254.86.190:3000')
// const socket = io('http://10.6.20.151:3000')
// const socket = io('http://10.6.20.151:3000');
// const socket = io('http://172.20.10.2:3000');
// const socket = io('http://10.0.0.24:3000');
// const socket = io('10.235.19.87:443');
// const socket = io('http://10.6.20.234:3000');
// const socket = io('http://10.234.135.15:3000');
// const socket = io('http://10.7.24.229:3000');
// const socket = io('http://138.68.28.121:3000')
const socket = io('http://138.68.28.121:3000');

socket.on('trigger update quests', () => {
  console.log('TRIGGERING UPDATE QUEST');
  socket.emit('get quests', store.getState().user.char_id);
});

socket.on('update quests', (data) => {
  console.log('UPDATE QUESTS');
  store.dispatch(updateQuests(data));
});

socket.on('update character', (char) => {
  store.dispatch(triggerUpdateCharacter(char));
  socket.emit('get quests', char.id);
});

socket.on('update party', (party) => {
  console.log('UPDATE PARTY BEFOREE:: ', party)
  if (party.members) {
    const newMembers = party.members.concat(partyMembers);
    party = {...party, members: newMembers};
    console.log('UPDATE PARTY :: ', party)
    store.dispatch(updateParty(party));
  }
  if (party.members && !party.members.length) {
    store.dispatch(leaveParty());
  }
});

socket.on('party created', () => {
  store.dispatch(createParty(true));
});

socket.on('party invite', (invite) => {
  Alert.alert(
    'New Invitation from ' + invite.inviter.name,
    '',
    [
      { text: 'Join Quest', onPress: () => socket.emit('accept party invite', invite) },
      { text: 'Deny Offer', onPress: () => socket.emit('reject party invite', invite) },
    ],
    { cancelable: false },
  );
});

socket.on('reject user already in party', (invitee) => {
  console.log('REJECT USER ALREADY IN PARTY');
  Alert.alert('Sorry, they are already part of the quest!'); // << alerts not working
});

socket.on('reject user not online', (invitee) => {
  console.log('REJECT USER NOT ONLINE');
  Alert.alert('Sorry, ', invitee.name, ' is not online!'); // << alerts not working
});

socket.on('reject party invite', (invitee) => {
  console.log('REJECTED PARTY INVITE', invitee);
  Alert.alert('Sorry, ', invitee.name, ' was not found!'); // << alerts not working
});


export default socket;
