import { combineReducers } from 'redux';
import currentLocation from './geolocation';


const combinedReducers = combineReducers({
	currentLocation
});

export default combinedReducers;