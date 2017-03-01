import { connect } from 'react-redux';
import { addQuest, updateLocation, addWatcher, toggleQuest, updateQuests } from '../actions/actions';
import quests from '../constants/quests.json';
import QuestList from '../components/QuestList';
import * as Exponent from 'exponent';
import socket from '../socket/socket';
import geolib from 'geolib';
import { getLocationAsync, createLocationWatcher, removeLocationWatcher } from '../utilities/locations';

const mapStateToProps = (state) => {
  console.log('visible quest list state', state);
  return {
    // quests: quests,
    // location: { latitude: 37.783712, longitude: -122.408914 },
    quests: state.quests,
    lat: state.location.latitude,
    lng: state.location.longitude,
    watcherSub: state.watcherSub,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  console.log('VISIBLE QUEST PROPS', this.props);
  return {
    onSubmitQuest: (name, location, questType, experience, latitude, longitude, creator_id, item_id) => {
      const newQuest = addQuest(name, location, questType, experience, latitude, longitude, creator_id, item_id);
      console.log('NEWSUBMITQUEST', newQuest);
      socket.emit('create quest', newQuest);
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
    toggleActiveQuest: (char_id, quest_id, isActive) => {
      if (!isActive) {
        socket.emit('activate quest', char_id, quest_id);
      } else {
        socket.emit('deactivate quest', char_id, quest_id);
      }
      // dispatch(toggleQuest(id));
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
