import { connect } from 'react-redux';
import MapScreen from '../screens/MapScreen';
import socket from '../socket/socket';


const mapStateToProps = (state) => {
  return {
    quests: state.quests,
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
  };
};

const Mapping = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MapScreen);

export default Mapping;