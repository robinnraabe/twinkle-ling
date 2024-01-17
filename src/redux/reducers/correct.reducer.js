const correctReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_CORRECT':
        return action.payload;
      default:
        return state;
    }
  };
  
  // correct will be on the redux state at:
  // state.correct
  export default correctReducer;