import { connect } from 'react-redux';
import { createCharacter } from '../actions/actions';
import CharacterCreate from '../components/CharacterCreate';

import socket from '../socket/socket';

const mapStateToProps = (state) => {
  console.log('STATE FROM CREATE CHAR: ', state.auth[0])
  return {
    character: state.character,
    selectedImage: null,
    user_id: state.auth[0],
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

const CreateCharacter = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CharacterCreate);

export default CreateCharacter;

