import { connect } from 'react-redux';
import { addQuest, updateLocation, addWatcher, toggleQuest, updateQuests } from '../actions/actions';
import quests from '../constants/quests.json';
import QuestList from '../components/QuestList';
import * as Exponent from 'exponent';
import socket from '../socket/socket';
import geolib from 'geolib';

const mapStateToProps = (state) => {
  console.log('visible quest list state', state);
  return {
    // quests: quests,
    location: { latitude: 37.783712, longitude: -122.408914 },
    quests: state.quests,
    // location: state.location,
    watcherSub: state.watcherSub,
    user: state.user,
  };
};

function createLocationWatcher() {
  console.log('createLocationWatcher');
  const intervalId = setInterval(() => {
    return getLocationAsync((result) => {
      console.log('*** RESULT', result);
    });
  }, 1000);
  return intervalId;
}

function removeLocationWatcher(intervalId) {
  clearInterval(intervalId);
}

async function getLocationAsync(cb) {
  const { Location, Permissions } = Exponent;
  const { status } = await Permissions.askAsync(Permissions.LOCATION);

  if (status === 'granted') {
    return Location.getCurrentPositionAsync({ enableHighAccuracy: true })
      .then((result) => {
        console.log('RESULT COORD', result.coords);
        dispatch(updateLocation(result.coords));
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
  console.log('VISIBLE QUEST PROPS', this.props);
  var that = this;
  return {
    onSubmitQuest: (name, location, questType, experience, creator_id, item_id) => {
      getLocationAsync((result) => {
        console.log('MY RESULT', result.coords);
        return addQuest(name, location, questType, experience, creator_id, result.coords.latitude, result.coords.longitude);
      })
      .then((result) => {
        console.log('FINAL RESULT', result);
        // dispatch(result);
        // socket.emit('create quest', result);
      });
    },
    pingLocation: () => {
      getLocationAsync((location) => {
        console.log('ping location', location);
        return updateLocation(location);
      })
      .then((location) => {
        console.log('ping update location', location);
        // dispatch(location);
      });
    },
    createLocationWatcher: () => {
      const result = createLocationWatcher();
      console.log('Watcher Interval Id', result);
      dispatch(addWatcher(result));
    },
    removeLocationWatcher: (intervalId) => {
      removeLocationWatcher(intervalId);
      dispatch(addWatcher(''));
    },
    toggleActiveQuest: (id) => {
      console.log('id', id);
      dispatch(toggleQuest(id));
    },
    fetchQuests: (charId) => {
      socket.emit('get quests', charId);
    },
  };
};

const VisibleQuestList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(QuestList);

export default VisibleQuestList;
