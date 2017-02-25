const updateCharacter = (state = [], action) => {
  switch (action.type) {
    case 'CREATE_CHARACTER':
      const character = action.character;
      console.log('update character reducer hit', state, action);
      return [
        ...state,
      ];
    default:
      return state;
  }
};

export default updateCharacter;
