import axios from "../../axios-config";
import { subredditsSelector } from '../selectors';

// set Subreddit action and payload
export const setSubreddits = (subreddits) => ({
  type: "SET_SUBREDDITS",
  subreddits,
});

// api request to get all subreddits and dispatch response
export const getSubreddits = () => async (dispatch) => {
  try {
    dispatch({ type: "GET_SUBREDDITS_REQUEST" });
    const response = await axios.get(
      "/subreddits"
    );
    dispatch(setSubreddits(response.data));
    dispatch({ type: "GET_SUBREDDITS_SUCCESS" });
  } catch (e) {
    dispatch({
      type: "GET_SUBREDDITS_FAILURE",
      message: e.message,
      response: e.response,
    });
  }
};

// api request to create new subreddits and dispatch the response
export const createSubreddit =
  (name, description) => async (dispatch, getState) => {
    const token = JSON.parse(localStorage.getItem("authState")).token;
    try {
      dispatch({ type: "CREATE_SUBREDDIT_REQUEST" });
      const response = await axios.post(
        "/subreddits",
        { name, description },

        {
          headers: { Authorization: token },
        }
      );
      dispatch(
        setSubreddits(subredditsSelector(getState()).concat(response.data))
      );
      dispatch({ type: "CREATE_SUBREDDIT_SUCCESS" });
      return response.data;
    } catch (e) {
      dispatch({
        type: "CREATE_SUBREDDIT_FAILURE",
        message: e.message,
        response: e.response,
      });
    }
  };
