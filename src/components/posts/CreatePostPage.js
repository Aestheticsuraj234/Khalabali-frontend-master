import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  Box,
  Stack,
  FormControl,
  FormErrorMessage,
  Input,
  Textarea,
  RadioGroup,
  Radio,
  Select,
  Button,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import {
  createLoadingAndErrorSelector,
  subredditsSelector,
} from "../../states/selectors";
import { getSubreddits } from "../../states/actions/subreddits";
import { submitPost, dispatchPostError } from "../../states/actions/post";
import { useNavigate } from "react-router-dom";

// started functional

const CreatePostPage = ({
  isLoading,
  error,
  submitIsLoading,
  submitError,
  subreddits,
  submitPost,
  history,
  getSubreddits,
  dispatchPostError,
}) => {
  const [state, setState] = useState({
    postType: "text",
    title: "",
    body: "",
    url: "",
    subreddit: "",
  });

  const navigate = useNavigate();

  // get subreddit
  useEffect(() => {
    getSubreddits();
    dispatchPostError();
  }, [getSubreddits]);

  // handle submit data

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const { postType, title, body, url, subreddit } = state;
      const { id } = await submitPost({
        type: postType,
        title,
        body: postType === "text" ? body : url,
        subreddit,
      });
      navigate(`/r/${subreddit}/comments/${id}`, { replace: true });
    } catch (err) {}
  };

  //  this is for set / updating input data
  const handleInputData = (value, key) => {
    setState((prev) => {
      let previous = prev;

      previous[`${key}`] = value;

      return {
        ...previous,
      };
    });
  };

  // return jsx
  return (
    <Box w={["100%", "90%", "80%", "70%"]} m="auto">
      {submitError && (
        <Alert status="error" mb={4}>
          <AlertIcon />
          {submitError}
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <FormControl>
            <RadioGroup
              value={state.postType}
              onChange={(e) => handleInputData(e, "postType")}
            >
              <Stack direction="row" spacing={3}>
                <Radio value="text">text post</Radio>
                <Radio value="link">link</Radio>
              </Stack>
            </RadioGroup>
          </FormControl>
          <FormControl>
            <Input
              value={state.title}
              onChange={(e) => handleInputData(e.target.value, "title")}
              type="text"
              focusBorderColor="blue.500"
              variant="filled"
              placeholder="title"
              isRequired
            />
          </FormControl>
          <FormControl>
            {state.postType === "text" ? (
              <Textarea
                value={state.body}
                onChange={(e) => handleInputData(e.target.value, "body")}
                variant="filled"
                placeholder="text (optional)"
                rows={10}
              />
            ) : (
              <Input
                value={state.url}
                onChange={(e) => handleInputData(e.target.value, "url")}
                type="url"
                variant="filled"
                placeholder="url"
                required
              />
            )}
          </FormControl>
          <FormControl isInvalid={error}>
            <Select
              value={state.subreddit}
              onChange={(e) => handleInputData(e.target.value, "subreddit")}
              variant="filled"
              placeholder={isLoading ? "loading..." : "choose a subreddit"}
              isRequired
            >
              {subreddits.map(({ name }) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </Select>
            <FormErrorMessage>Could not load subreddits</FormErrorMessage>
          </FormControl>
          <Button
            type="submit"
            isLoading={isLoading || submitIsLoading || null}
          >
            Submit
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

//  redux things
const { loadingSelector, errorSelector } = createLoadingAndErrorSelector([
  "GET_SUBREDDITS",
]);

const {
  loadingSelector: submitLoadingSelector,
  errorSelector: submitErrorSelector,
} = createLoadingAndErrorSelector(["SUBMIT_POST"], false);

const mapStateToProps = (state) => ({
  isLoading: loadingSelector(state),
  error: errorSelector(state),
  submitIsLoading: submitLoadingSelector(state),
  submitError: submitErrorSelector(state),
  subreddits: subredditsSelector(state),
});

// redux dispatch when called
const mapDispatchToProps = (dispatch) => ({
  getSubreddits: () => dispatch(getSubreddits()),
  submitPost: (postDetails) => dispatch(submitPost(postDetails)),
  dispatchPostError: () => dispatch(dispatchPostError()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreatePostPage);
