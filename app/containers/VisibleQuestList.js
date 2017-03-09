import { connect } from 'react-redux';
import { addQuest, updateLocation, addWatcher, toggleQuest, updateQuests, setQuestFilter } from '../actions/actions';
// import quests from '../constants/quests.json';
import QuestList from '../components/QuestList';
import * as Exponent from 'exponent';
import socket from '../socket/socket';
import geolib from 'geolib';
import { getLocationAsync, createLocationWatcher, removeLocationWatcher } from '../utilities/locations';

const calculateDistance = (lat1, lng1, lat2, lng2, accuracy) => {
  const acc = accuracy || 20;
  const coord1 = { latitude: lat1, longitude: lng1 };
  const coord2 = { latitude: lat2, longitude: lng2 };
  const dist = geolib.getDistance(coord1, coord2, acc);
  return Math.floor(dist * 0.000621371 * 10)/10
};

const addDistanceToQuests = (quests, myLat, myLng) => {
  const questsWithDistance = quests.map((quest) => {
    quest.distance = calculateDistance(myLat, myLng, quest.lat, quest.lng, 20);
    return quest;
  });
  return questsWithDistance;
};

const sortByDistance = (quests) => {
  const byDist = quests.slice(0);
  byDist.sort((a, b) => (
    a.distance - b.distance
  ));
  return byDist;
};

const filterQuests = (quests, filter, charId) => {
  switch (filter) {
    case 'FILTER_ALL':
      return quests.filter(q => q.complete === '0' && q.creator_id !== charId);
    case 'FILTER_ACTIVE':
      return quests.filter(q => q.active && q.complete === '0' && q.creator_id !== charId);
    case 'FILTER_INACTIVE':
      return quests.filter(q => !q.active && q.complete === '0' && q.creator_id !== charId);
    case 'FILTER_COMPLETED':
      return quests.filter(q => q.complete.toString() === charId && q.creator_id !== charId);
    case 'FILTER_CREATED':
      return quests.filter(q => q.creator_id === charId && q.complete.toString() === '0');
  }
};

const mapStateToProps = (state) => {
  console.log('visible quest list state', state);
  const questsWithDistance = addDistanceToQuests(state.quests, state.location.latitude, state.location.longitude);
  const filteredQuests = filterQuests(questsWithDistance, state.questFilter, state.user.char_id);
  return {
    quests: sortByDistance(filteredQuests),
    lat: state.location.latitude,
    lng: state.location.longitude,
    watcherSub: state.watcherSub,
    user: state.user,
    questType: state.questType,
  };
};



const mapDispatchToProps = (dispatch) => {
  console.log('VISIBLE QUEST PROPS', this.props);
  return {
    onSubmitQuest: (name, creator_id, lat, lng, crypto, created_lat, created_lng, timestamp, timestart, timestop, questType) => {
      const newQuest = addQuest(name, creator_id, lat, lng, crypto, created_lat, created_lng, timestamp, timestart, timestop, questType);
      console.log('emitting submit quest', newQuest);
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
    },
    fetchQuests: (charId) => {
      socket.emit('get quests', charId);
    },
    setFilter: (filter) => {
      dispatch(setQuestFilter(filter));
    },
  };
};

const VisibleQuestList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(QuestList);

export default VisibleQuestList;
