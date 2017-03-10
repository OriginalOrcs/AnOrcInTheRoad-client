const user = (state = {}, action) => {
  switch (action.type) {

    case 'USER_LOGIN':
      return {
        name: action.name,
        user_id: action.user_id,
      };

    case 'USER_LOGOUT':
      return {};

    case 'CREATE_CHARACTER':
      return {
        name: action.name,
        user_id: action.user_id,
        classType: action.classType,
      };

    case 'TRIGGER_UPDATE_CHARACTER':
      return {
        name: action.character.name,
        user_id: action.character.user_id,
        char_id: action.character.id,
        level: action.character.level,
        experience: action.character.experience,
        classType: action.character.classType,
      };

    default:
      return state;
  }
};

export default user;
