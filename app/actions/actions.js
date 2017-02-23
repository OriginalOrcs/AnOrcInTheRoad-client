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
