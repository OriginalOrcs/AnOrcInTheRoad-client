import { connect } from 'react-redux';
import { createCharacter } from '../actions/actions';
import CharacterCreate from '../components/CharacterCreate';

import socket from '../socket/socket';

const mapStateToProps = (state) => {
  return {
    character: state.character,
    selectedImage: '../assets/images/3.png',
    user_id: state.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCreateCharacter: ((user_id, name) => {
      const result = createCharacter(user_id, name);
      console.log(result);
      dispatch(result);
      socket.emit('add character', result);
    }),
  };
};

const CreateCharacter = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CharacterCreate);

export default CreateCharacter;

