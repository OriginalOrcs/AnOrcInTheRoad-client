const user = (state = {}, action) => {
  switch (action.type) {

    case 'USER_LOGIN':
      return {
        name: action.name,
        user_id: action.user_id,
      };

    case 'USER_LOGOUT':
      return {};

    case 'UPDATE_CHARID':
      return {
        ...state,
        char_id: action.char_id,
      };

    case 'CREATE_CHARACTER':
      return {
        name: action.name,
        user_id: action.user_id,
      };

    case 'TRIGGER_UPDATE_CHARACTER':
      return {
        name: action.name,
        user_id: action.user_id,
        char_id: action.id,
        level: action.level,
        experience: action.experience,
      };

    default:
      return state;
  }
};

export default user;
