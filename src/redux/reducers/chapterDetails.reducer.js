const chapterReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_CHAPTER_DETAILS':
        return action.payload;
      default:
        return state;
    }
  };
  
  // deck will be on the redux state at:
  // state.deck
  export default chapterReducer;