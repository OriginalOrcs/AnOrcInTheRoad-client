import { connect } from 'react-redux';
import MapScreen from '../screens/MapScreen';
import socket from '../socket/socket';

const modifyQuestProps = (quests) => {
  const questsWithDistance = quests.map((quest) => {
    if (quest.questType === 'addCryptoQuest') {
      quest.lat = quest.created_lat;
      quest.lng = quest.created_lng;
    }
    return quest;
  });
  return questsWithDistance;
};

const mapStateToProps = (state) => {
  return {
    quests: modifyQuestProps(state.quests),
    lat: state.location.latitude,
    lng: state.location.longitude,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
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
  };
};

const Mapping = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MapScreen);

export default Mapping;