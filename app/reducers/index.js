import { combineReducers } from 'redux';
// import visibilityFilter from './visibilityFilter';
import quests from './quests';
import server from './server';

const App = combineReducers({
  quests: quests,
  server: server,
});

export default App;
