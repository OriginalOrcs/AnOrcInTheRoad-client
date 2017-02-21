const quest = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_QUEST':
      console.log('quest reducer hit');
      return {
        id: action.id,
        name: action.name,
        location: action.location,
        questType: action.questType,
        experience: action.experience,
        creator_id: action.creator_id,
        lat: action.lat,
        lng: action.lng,
        item_id: action.item_id,
      };
    default:
      return quest;
  }
};

const quests = (state = [], action) => {
  switch (action.type) {
    case 'ADD_QUEST':
      return [
        ...state,
        quest(undefined, action),
      ];
    default:
      return state;
  }
};

export default quests;
