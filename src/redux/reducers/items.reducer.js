const itemReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_ITEM_DETAILS':
        return action.payload;
      default:
        return state;
    }
  };
  
  // items will be on the redux state at:
  // state.items
  export default itemReducer;