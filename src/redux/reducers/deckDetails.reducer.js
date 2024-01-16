const deckDetailsReducer = (state = [], action) => {
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
  