import { combineReducers } from 'redux';
import { quests, updateQuests } from './quests';
import auth from './auth';
import character from './character';

const App = combineReducers({
  quests: updateQuests,
  auth: auth,
  character: character,
});

export default App;
