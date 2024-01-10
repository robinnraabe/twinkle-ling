const lessonExtrasReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_LESSON_EXTRAS':
        return action.payload;
      default:
        return state;
    }
  };
  
  // lessonExtras will be on the redux state at:
  // state.lessonExtras
  export default lessonExtrasReducer;