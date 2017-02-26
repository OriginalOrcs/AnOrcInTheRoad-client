const user = (state = {}, action) => {
  switch (action.type) {
    case 'USER_LOGIN':
      console.log('LOGIN auth reducer hit', state, action);
      return {
        username: action.username,
        user_pic: action.user_pic,
        user_id: action.user_id,
      };
    case 'USER_LOGOUT':
      console.log('LOGOUT auth reducer hit', state, action);
      return {};
    default:
      return user;
  }
};

const auth = (state = [], action) => {
  switch (action.type) {
    case 'USER_LOGIN':
    console.log('STATE FROM AUTH LOGIN REDUCER ', state, action)
      return [
        ...state,
        user(undefined, action),
      ];
    case 'USER_LOGOUT':
        console.log('STATE LOGOUT AUTH REDUCER ', state, action)
      return [
        ...state,
        user(undefined, action),
      ];
    default:
      return state;
  }
};

export default auth;
