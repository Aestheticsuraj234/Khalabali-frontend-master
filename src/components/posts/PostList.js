import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import {
  Box,
  Flex,
  // Alert,
  // AlertIcon,
  Heading,
  CircularProgress,
  Spacer,
  Select,
} from "@chakra-ui/react";
import PostEdit from "./PostEdit";
import {
  createLoadingAndErrorSelector,
  postListSelector,
  totalPageSelector,
  editPostSelector,
  deleteIdSelector,
  editIdSelector,
} from "../../states/selectors";
import { getPostList } from "../../states/actions/postList";
import PostListHeading from "./PostListHeading";
import { userSelector } from "../../states/selectors";

const PostList = ({
  isLoading,
  error,
  postList,
  getPostList,
  totalPages,
  editedPost,
  deleteId,
  editId,
  user,
}) => {
  const [value, setValue] = useState("ASC");
  const [page, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [title, setTitle] = useState("");
  const [postItems, setPostItems] = useState([...postList]);
  // const [subreddit, setSubreddit]=useState(null);
  console.log(postList);
  // // console.log(totalPages)
  console.log(postItems);
  console.log(editedPost);
  console.log(editId);

  let subreddit = useParams().subreddit || "";

  // search query
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  let query = useQuery();

  let queryTitle = query.get("search") || "";

  // change of search query and subreddits, set subreddit and reset page number
  // useEffect(()=>{
  //   setSubreddit(getSubreddit)
  //   setCurrentPage(1);
  //   setPostItems([]);
  // },[getSubreddit])

  // send request on change of any of subreddit, page, title
  useEffect(() => {
    getPostList({ subreddit, page, title, value });
  }, [getPostList, subreddit, page, title, value]);

  // load postList including previous
  const loadPostList = async () => {
    setPostItems((prevVal) => {
      const uniq = {};
      const arr = [...prevVal, ...postList];
      var uniquePosts = arr.filter(
        (obj) => !uniq[obj.id] && (uniq[obj.id] = true)
      );
      if (deleteId) {
        uniquePosts = uniquePosts.filter((post) => post.id !== deleteId);
        return uniquePosts;
      } else if (editId) {
        console.log("edit working");
        let reqEditPost = uniquePosts.filter((post) => post.id === editId);
        const nonEditUniquePosts = uniquePosts.filter(
          (post) => post.id !== editedPost.id
        );
        const newEditedPost = { ...reqEditPost, ...editedPost };
        uniquePosts = [newEditedPost, ...nonEditUniquePosts];
        return uniquePosts;
      }
      return uniquePosts;
    });
  };

  //
  useEffect(() => {
    loadPostList(postList);
  }, [postList, deleteId, editId]);

  //  change of search query and subreddits, set search quary & setSubreddit and reset page number
  useEffect(() => {
    setTitle(queryTitle);
    setCurrentPage(1);
    setPostItems([]);
  }, [queryTitle, subreddit]);

  console.log(postItems);
  // useEffect(() => {
  //   setPostItems((prevVal) => {
  //     const arr = [...prevVal]
  //     let reqEditPost = arr.filter((post) => post.id === editId);
  //     const notEditedUniquePosts = arr.filter((post) => post.id !== editId);
  //     const newEditedPost = { ...reqEditPost, ...editedPost };
  //     const uniquePosts = [newEditedPost, ...notEditedUniquePosts];
  //     return uniquePosts;
  //   });
  // }, [editId]);

  //  setting new fetch postList
  const fetchMoreData = async () => {
    if (page < totalPages && totalPages > 1) {
      setCurrentPage(page + 1);
    } else if (totalPages > 0) {
      setCurrentPage(totalPages);
      setHasMore(false);
    }
  };

  const handleFilter = (event) => {
    setValue(event.target.value);
  };

  // filter by date jsx
  const filterByDate = () => {
    return (
      <>
        <Select
          placeholder="Filter By Date"
          value={value}
          variant="filled"
          onChange={handleFilter}
          width={160}
          h={7}
          fontWeight={"bold"}
          borderRadius="5px"
          m={2}
        >
          <option value="DESC">Old to New</option>
          <option value="ASC">New to Old</option>
        </Select>
      </>
    );
  };

  // loading component
  if (isLoading && postItems.length === 0) {
    return (
      <Flex m={10} justifyContent="center" alignItems="center">
        <CircularProgress isIndeterminate />
      </Flex>
    );
  }

  // postList component on scroll page number change and new loaded postList added to previous postList
  return (
    <Box>
      <Flex>
        <Heading size={"md"}>{subreddit ? `r/${subreddit}` : "Home"}</Heading>
        <Spacer />
        {filterByDate()}
      </Flex>
      <PostListHeading />
      <InfiniteScroll
        dataLength={postItems.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={
          <Flex m={10} justifyContent="center" alignItems="center">
            <CircularProgress isIndeterminate />
          </Flex>
        }
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>You have seen it all</b>
          </p>
        }
      >
        {postItems.length > 0 ? (
          postItems.map((post) => {
            return (
              <Box key={`${post.id}-${title}`} my={4}>
                <PostEdit
                  id={post.id}
                  type={post.type}
                  subreddit={post.subreddit.name}
                  author={post.user.username}
                  createdAt={post.createdAt}
                  title={post.title}
                  body={post.body}
                  numComments={post.PostComments}
                  numVotes={post.postVotes}
                  hasVoted={post.hasVoted}
                />
              </Box>
            );
          })
        ) : (
          <Flex m={10} justifyContent="center" alignItems="center">
            <p>No post to display</p>
          </Flex>
        )}

        <Spacer />
      </InfiniteScroll>
    </Box>
  );
};

// redux selectors for loading and error messages
const { loadingSelector, errorSelector } = createLoadingAndErrorSelector([
  "GET_POST_LIST",
]);
// redux mapping state to props
const mapStateToProps = (state) => ({
  isLoading: loadingSelector(state),
  error: errorSelector(state),
  postList: postListSelector(state),
  totalPages: totalPageSelector(state),
  user: userSelector(state),
  editedPost: editPostSelector(state),
  deleteId: deleteIdSelector(state),
  editId: editIdSelector(state),
});
// redux dispatch when called
const mapDispatchToProps = (dispatch) => ({
  getPostList: (filters) => dispatch(getPostList(filters)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
