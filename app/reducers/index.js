import { combineReducers } from 'redux';
import quests from './quests';
import auth from './auth';

const App = combineReducers({
  quests: quests,
  auth: auth,
});

export default App;
