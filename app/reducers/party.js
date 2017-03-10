export const createParty = (state = false, action) => {
  switch (action.type) {
    case 'CREATE_PARTY':
      return true;
    case 'LEAVE_PARTY':
      return false;
    default:
      return state;
  }
};

export const updateParty = (state = [], action) => {
  switch (action.type) {
    case 'UPDATE_PARTY':
      return action.party;
    default:
      return state;
  }
};

