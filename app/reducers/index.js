import { combineReducers } from 'redux';
import quests from './quests';

const App = combineReducers({
  quests: quests,
});

export default App;
