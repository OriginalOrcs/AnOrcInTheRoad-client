import { connect } from 'react-redux';
import MapScreen from '../screens/MapScreen';
import socket from '../socket/socket';


const mapStateToProps = (state) => {
  return {
    quests: state.quests,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  };
};

const Mapping = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MapScreen);

export default Mapping;