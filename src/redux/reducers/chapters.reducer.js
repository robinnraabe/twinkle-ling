const chapterReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_CHAPTER_DETAILS':
        return action.payload;
      default:
        return state;
    }
  };
  
  // chapters will be on the redux state at:
  // state.chapters
  export default chapterReducer;