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

export const toggleQuest = (id) => {
  return {
    type: 'TOGGLE_QUEST',
    id,
  };
};

export const userLogin = (username, user_pic, auth_id) => {
  console.log('ACTIONS USERNAME: ', username)
  return {
    type: 'USER_LOGIN',
    username,
    user_pic,
    auth_id,
  };
};

export const userLogout = () => {
  return {
    type: 'USER_LOGOUT',
  };
};


// export const setSelect = (questType) => {
//   return {
//     type: 'SET_SELECT',
//     questType,
//   };
// };

// export const setCurrentLocation = (coordinate) => {
//   return {
//     type: 'SET_CURRENT_LOCATION',
//     latitude: coordinate.latitude,
//     longitude: coordinate.longitude,
//   };
// };
