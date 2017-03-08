import { connect } from 'react-redux';
import { addQuest, updateLocation, addWatcher, toggleQuest, updateQuests } from '../actions/actions';
import quests from '../constants/quests.json';
import QuestList from '../components/QuestList';
import * as Exponent from 'exponent';
import socket from '../socket/socket';
import geolib from 'geolib';
import { getLocationAsync, createLocationWatcher, removeLocationWatcher } from '../utilities/locations';

const addDistanceToQuests = (quests, myLat, myLng) => {
  const questsWithDistance = quests.map((quest) => {
    quest.distance = calculateDistance(myLat, myLng, quest.lat, quest.lng, 20);
    return quest;
  });
  return questsWithDistance;
};

const calculateDistance = (lat1, lng1, lat2, lng2, accuracy) => {
  const acc = accuracy || 20;
  var coord1 = { latitude: lat1, longitude: lng1 };
  var coord2 = { latitude: lat2, longitude: lng2 };
  return geolib.getDistance(coord1, coord2, acc);
}

const sortByDistance = (quests) => {
  var byDist = quests.slice(0);
  byDist.sort((a, b) => (
    a.distance - b.distance
  ));
  console.log('byDist', byDist);
  return byDist;
}

const mapStateToProps = (state) => {
  console.log('visible quest list state', state);
  var questsWithDistance = addDistanceToQuests(state.quests, state.location.latitude, state.location.longitude);
  return {
    // quests: quests,
    // location: { latitude: 37.783712, longitude: -122.408914 },
    questsWithDistance,
    quests: state.quests,
    lat: state.location.latitude,
    lng: state.location.longitude,
    watcherSub: state.watcherSub,
    user: state.user,
    filteredQuests: filterQuests(questsWithDistance, state.questFilter),
    sortedQuests: sortByDistance(questsWithDistance),
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

// import { toggleTodo } from '../actions'

const filterQuests = (quests, filter) => {
  switch (filter) {
    case 'FILTER_ALL':
      return quests
    case 'FILTER_ACTIVE':
      return todos.filter(t => t.completed)
    case 'FILTER_COMPLETED':
      return todos.filter(t => !t.completed)
  }
}

// const mapStateToProps = (state) => {
//   return {
//     todos: filterQuests(state.questsWithDistance, state.questFilter)
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     onQuestClick: (id) => {
//       dispatch(toggleTodo(id))
//     }
//   }
// }

const VisibleQuestList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(QuestList);

export default VisibleQuestList;
