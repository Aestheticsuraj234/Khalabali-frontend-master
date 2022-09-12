import axios from "../../axios-config";

import { setPost, editPost, deletePost } from "./post";
import { setComments, updateComment, deleteComment } from "./comments";
import { postListSelector, commentsSelector, postSelector } from "../selectors";

export const editPostId = (editId) => ({
  type: "SET_EDIT_ID",
  editId,
});

export const deletePostId = (deleteId) => ({
  type: "SET_DELETE_ID",
  deleteId,
});

// api request to get post with comments and dispatch response
export const getPostAndComments = (id) => async (dispatch) => {
  const token = JSON.parse(localStorage.getItem("authState")).token;
  try {
    dispatch({ type: "GET_POST_AND_COMMENTS_REQUEST" });
    if (token) {
      const response = await axios.get(`/comments/${id}`, {
        headers: { Authorization: `${token}` },
      });
      dispatch(setPost(response.data.postData));
      dispatch(setComments(response.data.commentData));
      dispatch({ type: "GET_POST_AND_COMMENTS_SUCCESS" });
    } else {
      const response = await axios.get(`/comments/${id}`);
      dispatch(setPost(response.data.postData));
      dispatch(setComments(response.data.commentData));
      dispatch({ type: "GET_POST_AND_COMMENTS_SUCCESS" });
    }
  } catch (e) {
    dispatch({ type: "GET_POST_AND_COMMENTS_FAILURE", message: e.message });
  }
};

// api request to edit a post and dispatch response
export const startEditPost =
  ({ id, body }) =>
  async (dispatch) => {
    const token = JSON.parse(localStorage.getItem("authState")).token;
    try {
      dispatch({ type: "EDIT_POST_REQUEST" });
      await axios.put(
        `/posts/${id}`,
        { body },
        {
          headers: { Authorization: token },
        }
      );
      dispatch(editPost(id, { body }));
      dispatch(editPostId(id));

      dispatch({ type: "EDIT_POST_SUCCESS" });
    } catch (e) {
      dispatch({
        type: "EDIT_POST_FAILURE",
        message: e.message,
        response: e.response,
      });
    }
  };

// api request to delete a post and dispatch response
export const startDeletePost = (id) => async (dispatch) => {
  const token = JSON.parse(localStorage.getItem("authState")).token;
  try {
    dispatch({ type: "DELETE_POST_REQUEST" });
    await axios.delete(`/posts/${id}`, {
      headers: { Authorization: token },
    });
    dispatch(deletePost(id));
    dispatch(deletePostId(id));
    dispatch({ type: "DELETE_POST_SUCCESS" });
  } catch (e) {
    dispatch({
      type: "DELETE_POST_FAILURE",
      message: e.message,
      response: e.response,
    });
  }
};

// api request to edit a post and dispatch response
export const startEditComment =
  ({ id, body }) =>
  async (dispatch) => {
    const token = JSON.parse(localStorage.getItem("authState")).token;
    try {
      dispatch({ type: "EDIT_COMMENT_REQUEST" });
      await axios.put(
        `/comments/${id}`,
        { body },
        {
          headers: { Authorization: token },
        }
      );
      dispatch(updateComment(id, { body }));
      dispatch({ type: "EDIT_COMMENT_SUCCESS" });
    } catch (e) {
      dispatch({
        type: "EDIT_COMMENT_FAILURE",
        message: e.message,
        response: e.response,
      });
    }
  };

// api request to delete a comment and dispatch response
export const startDeleteComment = (id) => async (dispatch) => {
  const token = JSON.parse(localStorage.getItem("authState")).token;
  try {
    dispatch({ type: "DELETE_COMMENT_REQUEST" });
    await axios.delete(`/comments/${id}`, {
      headers: { Authorization: token },
    });
    dispatch(deleteComment(id));
    dispatch({ type: "DELETE_COMMENT_SUCCESS" });
  } catch (e) {
    dispatch({
      type: "DELETE_COMMENT_FAILURE",
      message: e.message,
      response: e.response,
    });
  }
};

// api request to submit vote for a post or comment or reply
// by using type of post or type of comment vote and dispatch the response.
export const submitVote =
  ({ type, id, voteValue, newNumVotes }) =>
  async (dispatch, getState) => {
    const token = JSON.parse(localStorage.getItem("authState")).token;
    if (!["post", "comment"].includes(type)) {
      throw new Error("You can only submit votes for posts and comments");
    }

    if (type === "post") {
      const changePostVotes = ({ has_voted, votes }) => {
        const newPostDetails = { has_voted, votes };
        const { has_voted: originalVoteValue, votes: originalNumVotes } =
          postListSelector(getState()).find((post) => post.id === id) ||
          postSelector(getState());
        dispatch(editPost(id, newPostDetails));
        return { originalVoteValue, originalNumVotes };
      };

      const { originalVoteValue, originalNumVotes } = changePostVotes({
        has_voted: voteValue,
        votes: newNumVotes,
      });

      try {
        await axios.post(
          `/votes/post`,
          {
            item_id: id,
            vote_value: voteValue,
          },
          {
            headers: { Authorization: token },
          }
        );
      } catch (e) {
        changePostVotes({
          has_voted: originalVoteValue,
          votes: originalNumVotes,
        });
      }
    } else {
      const changeCommentVote = ({ has_voted, votes }) => {
        const { has_voted: originalVoteValue, votes: originalNumVotes } =
          commentsSelector(getState()).find((comment) => comment.id === id) ||
          {};
        dispatch(updateComment(id, { has_voted, votes }));
        return { originalVoteValue, originalNumVotes };
      };

      const { originalVoteValue, originalNumVotes } = changeCommentVote({
        has_voted: voteValue,
        votes: newNumVotes,
      });

      try {
        await axios.post(
          `/votes/comment`,
          {
            item_id: id,
            vote_value: voteValue,
          },
          {
            headers: { Authorization: token },
          }
        );
      } catch (e) {
        changeCommentVote({
          has_voted: originalVoteValue,
          votes: originalNumVotes,
        });
      }
    }
  };
