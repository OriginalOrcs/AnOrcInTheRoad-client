import Exponent from 'exponent';

let nextQuestId = 0;

export const addQuest = (name, creator_id, lat, lng, crypto, created_lat, created_lng, timestamp, timestart, timestop, questType) => {
  return {
    type: 'ADD_QUEST',
    id: nextQuestId++,
    name,
    creator_id,
    lat,
    lng,
    crypto,
    created_lat,
    created_lng,
    timestamp,
    timestart,
    timestop,
    questType,
  };
};

export const userLogin = (name, user_id) => {
  return {
    type: 'USER_LOGIN',
    name,
    user_id,
  };
};

export const userLogout = () => {
  return {
    type: 'USER_LOGOUT',
  };
};

export const createCharacter = (character) => {
  return {
    type: 'CREATE_CHARACTER',
    character,
  };
};

export const triggerUpdateCharacter = (character) => {
  return {
    type: 'TRIGGER_UPDATE_CHARACTER',
    character,
  };
};

export const updateQuests = (quests) => {
  return {
    type: 'UPDATE_QUESTS',
    quests,
  };
};

export const addWatcher = (watcherSub) => {
  return {
    type: 'ADD_WATCHER',
    watcherSub,
  };
};

export const toggleQuest = (id, active) => {
  return {
    type: 'TOGGLE_QUEST',
    id,
    active,
  };
};

export const REQUEST_LOCATION = 'REQUEST_LOCATION';
export const RECEIVE_LOCATION = 'RECEIVE_LOCATION';
export const REQUEST_QUESTS = 'REQUEST_QUESTS';
export const RECEIVE_QUESTS = 'RECEIVE_QUESTS';

export function requestLocation() {
  return {
    type: REQUEST_LOCATION,
  };
}

export function receiveLocation(coord) {
  return {
    type: RECEIVE_LOCATION,
    latitude: coord.latitude,
    longitude: coord.longitude,
  };
}

export function updateLocation() {
  return function (dispatch) {
    const { Location } = Exponent;
    dispatch(requestLocation());
    return Location.getCurrentPositionAsync({ enableHighAccuracy: true })        // We can dispatch many times!
      .then(result => dispatch(receiveLocation(result.coords)));
  };
}

export function setQuestFilter(filter) {
  return {
    type: 'SET_QUEST_FILTER',
    filter,
  };
}

export function updateParty(party) {
  return {
    type: 'UPDATE_PARTY',
    party,
  };
}

export function createInvite(invite) {
  return {
    type: 'CREATE_INVITE',
    invite,
  };
}

export function createParty() {
  return {
    type: 'CREATE_PARTY',
  };
}

export function leaveParty() {
  return {
    type: 'LEAVE_PARTY',
  };
}
