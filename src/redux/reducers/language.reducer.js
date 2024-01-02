const languageReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_LANGUAGES':
        return action.payload;
      default:
        return state;
    }
  };
  
  // languages will be on the redux state at:
  // state.languages
  export default languageReducer;