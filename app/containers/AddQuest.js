import { connect } from 'react-redux';
import { addQuest } from '../actions/actions';
import QuestList from '../components/QuestList';

const mapStateToProps = (state, dispatch) => {
  return {
    quests: state.quests,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onSubmitQuest: (name, location, questType, experience, creator_id, lat, lng, item_id) => {
      dispatch(addQuest(name, location, questType, experience, creator_id, lat, lng, item_id));
    },
  };
};


const AddQuest = connect(
  mapStateToProps,
  mapDispatchToProps,
)(QuestList);

export default AddQuest;
