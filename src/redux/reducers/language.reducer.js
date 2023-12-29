const languageReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_LANGUAGES':
        return action.payload;
      default:
        return state;
    }
  };
  
  // language will be on the redux state at:
  // state.language
  export default languageReducer;