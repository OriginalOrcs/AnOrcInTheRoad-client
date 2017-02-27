let nextQuestId = 0;

export const addQuest = (name, location, questType, experience, creator_id, lat, lng, item_id) => {
  return {
    type: 'ADD_QUEST',
    id: nextQuestId++,
    questType,
    name,
    location,
    experience,
    creator_id,
    lat,
    lng,
    item_id,
  };
};

// export const toggleQuest = (id) => {
//   return {
//     type: 'TOGGLE_QUEST',
//     id,
//   };
// };

export const userLogin = (name, user_id) => {
  return {
    type: 'USER_LOGIN',
    name,
    user_id,
  };
};

export const updateCharId = (char_id) => {
  return {
    type: 'UPDATE_CHARID',
    char_id,
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

export const updateLocation = (location) => {
  return {
    type: 'UPDATE_LOCATION',
    location,
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

