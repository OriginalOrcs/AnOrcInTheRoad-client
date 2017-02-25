import { connect } from 'react-redux';
import { addQuest } from '../actions/actions';
import quests from '../constants/quests.json';
import QuestList from '../components/QuestList';
import * as Exponent from 'exponent';

import socket from '../socket/socket';

const mapStateToProps = (state) => {
  return {
    quests: state.quests,
    auth: state.auth[0],
    // quests: quests,
  };
};

async function getLocationAsync(cb) {
  const { Location, Permissions } = Exponent;
  const { status } = await Permissions.askAsync(Permissions.LOCATION);

  if (status === 'granted') {
    return Location.getCurrentPositionAsync()
      .then((result) => {
        console.log('RESULT COORD', result);
        // return dispatch(addQuest(name, location, questType, experience, creator_id, result.coords.latitude, result.coords.longitude, item_id));
        return cb(result);
      })
      .catch((error) => {
        return error;
      });
    } else {
    throw new Error('Location permission not granted');
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    onSubmitQuest: (name, location, questType, experience, creator_id, item_id) => {
      getLocationAsync((result) => {
        console.log('MY RESULT', result.coords);
        return addQuest(name, location, questType, experience, creator_id, result.coords.latitude, result.coords.longitude);
      })
      .then((result) => {
        console.log('FINAL RESULT', result);
        dispatch(result)
        
        socket.emit('create quest', result);

        });
      });
    },
  };
};

const VisibleQuestList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(QuestList);

export default VisibleQuestList;
