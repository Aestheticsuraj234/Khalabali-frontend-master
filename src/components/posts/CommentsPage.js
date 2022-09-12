import { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Box,
  Flex,
  Text,
  Heading,
  Alert,
  AlertIcon,
  CircularProgress,
} from "@chakra-ui/react";
import PostEdit from "./PostEdit";
import CommentsThread from "./CommentsThread";
import WriteCommentBox from "./WriteCommentBox";
import LoginAndRegisterButtons from "../login/LoginAndRegisterButtons";
import {
  userSelector,
  createLoadingAndErrorSelector,
  postSelector,
  commentsSelector,
} from "../../states/selectors";
import { getPostAndComments } from "../../states/actions";

// comment and reply object such as reply of every comment added to the it's comment as array containing all reply.
// comment has commentId null while reply has valid commentId
const getCommentsWithChildren = (comments) => {
  const commentsWithChildren = comments.map((comment) => ({
    ...comment,
    children: [],
  }));
  commentsWithChildren.forEach((childComment) => {
    const { commentId } = childComment;
    if (commentId) {
      const parent = commentsWithChildren.find(
        (comment) => commentId === comment.id
      );
      parent.children = parent.children.concat(childComment);
    }
  });
  return commentsWithChildren.filter(
    ({ commentId, body, children }) =>
      commentId === null && (body !== null || children.length > 0)
  );
};

// returned JSX component
const CommentsPage = ({
  isLoading,
  error,
  post,
  comments,
  getPostAndComments,
  user,
}) => {
  const { id } = useParams(); // get id from params

  // request(API call) to get post and comments & reply at selected post(id)
  useEffect(() => {
    getPostAndComments(id);
  }, []);

  // loading jsx when loading
  if (isLoading) {
    return (
      <Flex m={10} justifyContent="center" alignItems="center" width={"100%"}>
        <CircularProgress isIndeterminate />
      </Flex>
    );
  } else if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        There is nothing to show
      </Alert>
    );
  }

  // props in post
  const {
    id: postId,
    type,
    subreddit,
    createdAt,
    title,
    body,
    postVotes,
    hasVoted,
  } = post;

  const numComments = comments.filter(({ body }) => body !== null).length; // number of comments

  const rootComments = getCommentsWithChildren(comments);

  // returned JSX post with comments and reply
  return (
    <Box width={"100%"}>
      <PostEdit
        id={post.id}
        type={type}
        subreddit={subreddit.name}
        author={post.user.username}
        createdAt={createdAt}
        title={title}
        body={body}
        numComments={numComments}
        numVotes={postVotes}
        hasVoted={hasVoted}
      />
      <br />
      {user ? (
        <Box>
          <Box m={2}>
            <Text as="span" color="gray.500">
              {"Comment as "}
            </Text>
            <Text as="span">{user.username}</Text>
          </Box>
          <WriteCommentBox postId={postId} parentCommentId={null} />
        </Box>
      ) : (
        <Flex
          p={5}
          border="1px"
          borderRadius={5}
          borderColor="gray.500"
          alignItems="center"
          flexDirection={["column", "row"]}
          justifyContent="space-between"
        >
          <Heading size="md" color="gray.500">
            Log in or register to leave a comment
          </Heading>
          <LoginAndRegisterButtons />
        </Flex>
      )}
      <br />
      <CommentsThread comments={rootComments} />
    </Box>
  );
};

// redux selectors for loading and error messages
const { loadingSelector, errorSelector } = createLoadingAndErrorSelector([
  "GET_POST_AND_COMMENTS",
]);

// redux mapping state to props
const mapStateToProps = (state) => ({
  isLoading: loadingSelector(state),
  error: errorSelector(state),
  post: postSelector(state),
  comments: commentsSelector(state),
  user: userSelector(state),
});

// redux dispatch when called
const mapDispatchToProps = (dispatch) => ({
  getPostAndComments: (id) => dispatch(getPostAndComments(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentsPage);
