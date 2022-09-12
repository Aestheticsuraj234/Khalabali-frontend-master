import axios from "../../axios-config";

// set post action and payload
export const setPost = (post) => ({
  type: "SET_POST",
  post,
});

// edit post action and payload
export const editPost = (id, updates) => ({
  type: "EDIT_POST",
  id,
  updates,
});

// delete post action and payload
export const deletePost = (id) => ({
  type: "DELETE_POST",
  id,
});

// api request to submit a new post and dispatch response
export const submitPost = (postDetails) => async (dispatch) => {
  const token = JSON.parse(localStorage.getItem("authState")).token;
  const { type, title, body, subreddit } = postDetails;
  try {
    dispatch({ type: "SUBMIT_POST_REQUEST" });
    const response = await axios.post(
      "/posts",
      {
        type,
        title,
        body,
        subreddit,
      },
      {
        headers: { Authorization: token },
      }
    );
    dispatch({ type: "SUBMIT_POST_SUCCESS" });
    return response.data;
  } catch (e) {
    dispatch({
      type: "SUBMIT_POST_FAILURE",
      message: e.message,
      respones: e.response,
    });
  }
};

export const dispatchPostError = () => async (dispatch) => {
  try {
    dispatch({
      type: "SUBMIT_POST_FAILURE",
      message: null,
      respones: null,
    });
  } catch {
    console.log("you are catched");
  }
};
