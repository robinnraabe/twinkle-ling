const deckDetailsReducer = (state = [], action) => {
  console.log('set deck', action.payload);
  switch (action.type) {
    case 'SET_DECK_DETAILS':
      return action.payload;
    default:
      return state;
  }
};
  
  // deck details will be on the redux state at:
  // state.deckDetails
  export default deckDetailsReducer;
  