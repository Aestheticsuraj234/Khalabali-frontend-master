const deleteIdReducer = (state = [], action) => {
  // console.log(action.updates);
  switch (action.type) {
    case "SET_DELETE_ID":
      return action.deleteId;

    default:
      return state;
  }
};

export default deleteIdReducer;
