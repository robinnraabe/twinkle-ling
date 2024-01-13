const answerReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_ANSWERS':
        return action.payload;
      default:
        return state;
    }
  };
  
  // answers will be on the redux state at:
  // state.answers
  export default answerReducer;