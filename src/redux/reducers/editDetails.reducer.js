const editDetailsReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_EDIT_DETAILS':
        return action.payload;
      default:
        return state;
    }
  };
    
    // edit details will be on the redux state at:
    // state.editDetails
    export default editDetailsReducer;