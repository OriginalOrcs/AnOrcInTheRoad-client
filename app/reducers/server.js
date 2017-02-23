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

const quest = (state = {}, action) => {
  switch (action.type) {
    case 'server/addQuest':
      console.log('server quest reducer hit');
      return {
        newQuest: action.data,
      };
    default:
      return quest;
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
    case 'server/addQuest':
      console.log('server reducer addQuest hit');
      return [
        ...state,
        quest(undefined, action),
      ];
    default:
      return state;
  }
};

export default server;
