import { combineReducers } from 'redux';
// import visibilityFilter from './visibilityFilter';
import quests from './quests';

const App = combineReducers({
  quests: quests,
});

export default App;
