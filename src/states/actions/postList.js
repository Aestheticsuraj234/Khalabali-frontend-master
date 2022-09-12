import axios from "../../axios-config";

// set postList action and payload
export const setPostList = (postList) => ({
  type: "SET_POST_LIST",
  postList,
});

// set total page action and payload
export const setTotalPages = (totalPages) => ({
  type: "SET_TOTAL_PAGES",
  totalPages,
});

// api request to get postList and dipach response.
export const getPostList = (filters) => async (dispatch) => {
  const { page, subreddit, title, value } = filters;
  const token = JSON.parse(localStorage.getItem("authState")).token;

  try {
    dispatch({ type: "GET_POST_LIST_REQUEST" });

    let apiHeaderAndParam = {
      params: {
        page: `${page}`,
        subreddit: `${subreddit}`,
        title: `${title}`,
        sortAll: `${value}`,
      },
    };

    if (token) {
      apiHeaderAndParam = {
        ...apiHeaderAndParam,
        headers: { Authorization: ` ${token}` },
      };
    }

    const response = await axios.get("/posts", {
      ...apiHeaderAndParam,
    });
    // dispatch post list
    dispatch(
      setPostList(
        response.data.FoundPost.map((post) => ({
          ...post,
          votes: post.postVotes,
        }))
      )
    );

    // dispatch totalPages
    dispatch(setTotalPages(response.data.totalPages));
    dispatch({ type: "GET_POST_LIST_SUCCESS" });
  } catch (e) {
    dispatch({
      type: "GET_POST_LIST_FAILURE",
      message: e.message,
      response: e.response,
    });
  }
};
