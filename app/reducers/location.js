import {
  REQUEST_LOCATION,
  RECEIVE_LOCATION,
} from '../actions/actions';

export function location (state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) {
  switch (action.type) {
    // case INVALIDATE_SUBREDDIT:
    //   return Object.assign({}, state, {
    //     didInvalidate: true,
    //   });
    case REQUEST_LOCATION:
      console.log('REQUEST_LOCATION');
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false,
      });
    case RECEIVE_LOCATION:
      console.log('RECEIVE_LOCATION');
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        latitude: action.latitude,
        longitude: action.longitude,
      });
    default:
      return state;
  }
}

export const addWatcher = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_WATCHER':
      console.log('location add watch reducer hit', action);
      return {
        watcherSub: action.watcherSub,
      };
    default:
      return addWatcher;
  }
};