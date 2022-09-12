const editPostReducer = (state = [], action) => {
  // console.log(action.updates);
  switch (action.type) {
    case "EDIT_POST":
      const { updates, id } = action;
      return { ...updates, id };
    default:
      return state;
  }
};

export default editPostReducer;
