import { combineReducers } from 'redux';
import geolocation from './geolocation';


const combinedReducers = combineReducers({
	coordinates: geolocation
});

export default combinedReducers;