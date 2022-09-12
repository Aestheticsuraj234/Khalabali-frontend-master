// post reducer new post, edit post, delete post
const postReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_POST":
      return action.post;
    case "EDIT_POST":
      const { updates, id } = action;
      return { ...state, ...updates, ...id };
    case "DELETE_POST":
      const deletedFields = { title: null, body: null, author_name: null };
      return { ...state, ...deletedFields };
    default:
      return state;
  }
};

export default postReducer;
