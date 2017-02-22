const msg = (state = {}, action) => {
  switch (action.type) {
    case 'server/hello':
      console.log('server message reducer hit');
      return {
        payload: action.data,
      };
    default:
      return msg;
  }
};

const server = (state = [], action) => {
  switch (action.type) {
    case 'server/hello':
      console.log('server reducer hit');
      return [
        ...state,
        msg(undefined, action),
      ];
    default:
      return state;
  }
};

export default server;
