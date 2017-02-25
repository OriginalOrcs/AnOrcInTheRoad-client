import { combineReducers } from 'redux';
import { quests, updateQuests, toggleQuest } from './quests';
import auth from './auth';
import character from './character';
import { location, addWatcher } from './location';

const App = combineReducers({
  quests: updateQuests,
  auth: auth,
  character: character,
  location: location,
  watcherSub: addWatcher,
  toggleQuest: toggleQuest,
});

export default App;
