const itemCountReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_TOTAL_ITEMS_COUNT':
        return action.payload;
        default:
        return state;
    }
    };
    
    // itemCount will be on the redux state at:
    // state.itemCount
    export default itemCountReducer;