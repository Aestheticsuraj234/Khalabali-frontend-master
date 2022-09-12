import axios from "../../axios-config";
import { editPost } from "./post";
import { setPostList } from "./postList";
import { setComments } from "./comments";
import { commentsSelector, postListSelector } from "../selectors";

// login action and payload
export const login = (user, token) => ({
  type: "LOGIN",
  user,
  token,
});

// logout action
export const logout = () => ({ type: "LOGOUT" });

// login api request to submit user details and response will dispatch
export const startLogin = (username, password) => async (dispatch) => {
  try {
    dispatch({ type: "LOGIN_REQUEST" });
    const response = await axios.post(
      "/users/login",
      {
        username,
        password,
      },
      {
        withCredentials: true,
      }
    );
    const { user, token } = response.data;
    dispatch(login(user, token));
    dispatch({ type: "LOGIN_SUCCESS" });
  } catch (e) {
    dispatch({
      type: "LOGIN_FAILURE",
      message: e.message,
      response: e.response,
    });
  }
};

// logout request response will dispatch
export const startLogout = () => async (dispatch, getState) => {
  try {
    dispatch({ type: "LOGOUT_REQUEST" });
    // await axios.post('/users/logout');
    localStorage.removeItem('authState');
    dispatch(logout());
    dispatch(editPost(1, { hasVoted: null }));
    dispatch(
      setPostList(
        postListSelector(getState()).map((post) => ({
          ...post,
          hasVoted: null,
        }))
      )
    );
    dispatch(
      setComments(
        commentsSelector(getState()).map((comment) => ({
          ...comment,
          hasVoted: null,
        }))
      )
    );
    dispatch({ type: "LOGOUT_SUCCESS" });
  } catch (e) {
    dispatch({
      type: "LOGOUT_FAILURE",
      message: e.message,
      response: e.response,
    });
  }
};

//register a user api request to submit user details and response will dispatch
export const startRegister =
  (username, password, email) => async (dispatch) => {
    try {
      dispatch({ type: "REGISTER_REQUEST" });
      const response = await axios.post(
        "/users/register",
        {
          username,
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      const { user } = response.data;
      //console.log(user)
      dispatch(login(user));
      dispatch({ type: "REGISTER_SUCCESS" });
    } catch (e) {
      dispatch({
        type: "REGISTER_FAILURE",
        message: e.message,
        response: e.response,
      });
    }
  };
