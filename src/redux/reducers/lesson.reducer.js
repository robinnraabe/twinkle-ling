const lessonReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_LESSON':
        return action.payload;
      default:
        return state;
    }
  };
  
  // lesson will be on the redux state at:
  // state.lesson
  export default lessonReducer;