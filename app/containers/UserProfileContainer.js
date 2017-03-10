import { connect } from 'react-redux';
import { createCharacter } from '../actions/actions';
import UserProfile from '../components/UserProfile';
import socket from '../socket/socket';

const mapStateToProps = (state) => {
  return {
    user: state.user,
    quests: state.quests,
    party: state.party,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCreateCharacter: ((user_id, name, classType) => {
      const result = createCharacter({ user_id, name, classType });
      dispatch(result);
      socket.emit('create character', result.character);
    }),
  };
};

const UserProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserProfile);

export default UserProfileContainer;

