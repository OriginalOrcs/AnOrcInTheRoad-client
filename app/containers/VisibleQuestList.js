import { connect } from 'react-redux';
import { addQuest } from '../actions/actions';
import quests from '../constants/quests.json';
import QuestList from '../components/QuestList';

const mapStateToProps = (state) => {
  return {
    quests: state.quests,
    // quests: quests,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmitQuest: (name, location, questType) => {
      console.log('Visible quest list: ADDING QUEST');
      dispatch(addQuest(name, location, questType));
    },
  };
};

const VisibleQuestList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(QuestList);

export default VisibleQuestList;