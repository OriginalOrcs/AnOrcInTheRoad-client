import { connect } from 'react-redux';
import { createCharacter } from '../actions/actions';
import UserProfile from '../components/UserProfile';
import socket from '../socket/socket';

const mapStateToProps = (state) => {
  return {
    selectedImage: null,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCreateCharacter: ((user_id, name) => {
      const result = createCharacter({ user_id, name });
      console.log('map dispatch to props create char', result);
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

