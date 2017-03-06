import {
  createRouter,
} from '@exponent/ex-navigation';

import HomeScreen from '../screens/HomeScreen';
import QuestListScreen from '../screens/QuestListScreen';
import MapScreen from '../containers/MapContainer';
import RootNavigation from './RootNavigation';
import UserScreen from '../screens/UserScreen';

export default createRouter(() => ({
  home: () => UserScreen,
  quests: () => QuestListScreen,
  map: () => MapScreen,
  rootNavigation: () => RootNavigation,
}));
