import React, { useState } from "react";
import { connect } from "react-redux";
import {
  Box,
  Stack,
  FormControl,
  FormErrorMessage,
  Input,
  Textarea,
  Button,
  Text,
} from "@chakra-ui/react";
import { createLoadingAndErrorSelector } from "../../states/selectors";
import { createSubreddit } from "../../states/actions/subreddits";
import { useNavigate } from "react-router-dom";

const CreateSubredditPage = ({ createSubreddit, isLoading, error }) => {
  // initialising form value / input name
  const [state, setState] = useState({
    name: "",
    description: "",
  });
  const { name, description } = state;

  // for routing
  let navigate = useNavigate();

  // sub reddit name vaildation
  const isNameValid = (name) => {
    const nameRegex = new RegExp("^[a-z0-9]+$", "i");
    return nameRegex.test(name);
  };

  // this is for form submission
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const { name, description } = state;
      const { name: subredditName } = await createSubreddit(name, description);
      navigate(`/r/${subredditName}`);
    } catch (e) {}
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

  // jsx element
  return (
    <Box w={["100%", "90%", "80%", "70%"]} m="auto">
      {error && (
        <Text color="red.500" mb={2}>
          *Both Subredit Name and it's descriptions required
        </Text>
      )}
      <form onSubmit={handleSubmit}>
        <Stack>
          <FormControl
            isInvalid={name && name.length > 0 && !isNameValid(name)}
          >
            <Input
              value={name}
              onChange={(e) => handleInputData(e.target.value, "name")}
              variant="filled"
              placeholder="subreddit name"
              isRequired
            />
            <FormErrorMessage>
              Name can only contain alphanumeric characters
            </FormErrorMessage>
          </FormControl>
          <FormControl>
            <Textarea
              value={description}
              onChange={(e) => handleInputData(e.target.value, "description")}
              variant="filled"
              rows={5}
              placeholder="description"
            />
          </FormControl>
          <Button
            isLoading={isLoading}
            type="submit"
            isDisabled={!isNameValid(name)}
          >
            create
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

// redux stuff
const { loadingSelector, errorSelector } = createLoadingAndErrorSelector(
  ["CREATE_SUBREDDIT"],
  false
);

const mapStateToProps = (state) => ({
  isLoading: loadingSelector(state),
  error: errorSelector(state),
});

// redux dispatch when called
const mapDispatchToProps = (dispatch) => ({
  createSubreddit: (name, description) =>
    dispatch(createSubreddit(name, description)),
});

//  exproting things
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateSubredditPage);
