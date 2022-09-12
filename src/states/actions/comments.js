import axios from "../../axios-config";
import { commentsSelector } from "../selectors";

// set comment action and payload
export const setComments = (comments) => ({
  type: "SET_COMMENTS",
  comments,
});

//update comment action and payload
export const updateComment = (id, updates) => ({
  type: "UPDATE_COMMENT",
  id,
  updates,
});

// delete a comment action and payload
export const deleteComment = (id) => ({
  type: "DELETE_COMMENT",
  id,
});

// new comment submiit api request response wiil be dispatch
// to post a comment token will be added with header. the response will be concat with previous comments
export const submitComment = (commentDetails) => async (dispatch, getState) => {
  const token = JSON.parse(localStorage.getItem("authState")).token;
  try {
    const { body, postId, commentId } = commentDetails;
    dispatch({ type: "SUBMIT_COMMENT_REQUEST" });
    const response = await axios.post(
      "/comments",
      {
        body,
        postId,
        commentId,
      },
      {
        headers: { Authorization: token },
      }
    );
    const comments = commentsSelector(getState());
    dispatch(setComments([response.data].concat(comments)));
    dispatch({ type: "SUBMIT_COMMENT_SUCCESS" });
  } catch (e) {
    dispatch({
      type: "SUBMIT_COMMENT_FAILURE",
      message: e.message,
      response: e.response,
    });
  }
};
