import socket from '../socket/socket';
import { connect } from 'react-redux';
import Party from '../components/Party';

const mapStateToProps = (state) => {
  return {
    user: state.user,
    createdParty: state.createdParty, // if true, user created party, if false && party{} has members, they didn't create party and cannot create one, only invite and remove themselves with current party, if false and party{} empty, user can create a new party
    party: state.party,
    quests: state.quests.filter(q => q.complete === '0'),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  	
  };
};

const PartyCreate = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Party);

export default PartyCreate;