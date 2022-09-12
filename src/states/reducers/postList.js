// postList reducer
const postListReducer = (state = [], action) => {
  // console.log(action.updates);
  switch (action.type) {
    case "SET_POST_LIST":
      return action.postList;
    case "EDIT_POST":
      const postList = state.map((post) =>
        post.id === action.id ? { ...post, ...action.updates } : post
      );
      return postList;
    case "DELETE_POST":
      const deletedFields = { title: null, body: null, author_name: null };
      return state.map((post) =>
        post.id === action.id ? { ...post, ...deletedFields } : post
      );
    default:
      return state;
  }
};

export default postListReducer;
