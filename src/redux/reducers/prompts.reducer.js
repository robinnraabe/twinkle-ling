const promptReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_PROMPTS':
        return action.payload;
      default:
        return state;
    }
  };
  
  // prompts will be on the redux state at:
  // state.prompts
  export default promptReducer;