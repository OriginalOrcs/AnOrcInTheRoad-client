import { combineReducers } from 'redux';
import { quests, updateQuests, toggleQuest } from './quests';
import user from './user';
import { location, addWatcher } from './location';

const App = combineReducers({
  quests: updateQuests,
  user: user,
  location: location,
  watcherSub: addWatcher,
  toggleQuest: toggleQuest,
});

export default App;
