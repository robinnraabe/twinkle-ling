const wrongReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_WRONG':
        return action.payload;
      default:
        return state;
    }
  };
  
  // wrong will be on the redux state at:
  // state.wrong
  export default wrongReducer;