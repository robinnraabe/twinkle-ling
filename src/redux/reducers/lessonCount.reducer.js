const lessonCountReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_LESSON_ITEMS_COUNT':
        return action.payload;
      default:
        return state;
    }
  };
  
  // lessonCount will be on the redux state at:
  // state.lessonCount
  export default lessonCountReducer;

