const deckReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_USER_DECK_LIST':
        return action.payload;
      default:
        return state;
    }
  };
  
  // deck will be on the redux state at:
  // state.deck
  export default deckReducer;
  