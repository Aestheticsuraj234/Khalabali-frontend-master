// total pages reducer
const totalPagesReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_TOTAL_PAGES':
          return action.totalPages;
      default:
        return state;
    }
  };
  
  export default totalPagesReducer;
  