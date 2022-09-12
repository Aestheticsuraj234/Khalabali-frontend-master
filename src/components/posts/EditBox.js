import { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import {
  Box,
  HStack,
  FormControl,
  FormErrorMessage,
  Textarea,
  Button,
} from "@chakra-ui/react";
import { startEditComment, startEditPost } from "../../states/actions";
import { createErrorSelector } from "../../states/selectors";

const EditBox = ({
  type = "post",
  id,
  initialText,
  onClose,
  error,
  startEditPost,
  startEditComment,
  getEditId,
}) => {
  // useState hooks
  const [value, setValue] = useState(initialText);
  const [isLoading, setIsLoading] = useState(false);

  const hasError = useRef(error);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      hasError.current = error;
    }
    return () => {
      isMounted = false;
    };
  });

  // handle submit of edit post or comment
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (type === "post") {
      await startEditPost({ id, body: value });
      // await getEditId(id);
    } else {
      await startEditComment({ id, body: value });
    }
    if (!hasError.current) {
      onClose();
    } else {
      setIsLoading(false);
    }
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <FormControl mb={3} isInvalid={!!error}>
          <Textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            rows={5}
          />
          <FormErrorMessage>{error}</FormErrorMessage>
        </FormControl>
        <HStack>
          <Button
            isDisabled={value === initialText}
            isLoading={isLoading}
            type="submit"
          >
            save
          </Button>
          <Button onClick={onClose}>cancel</Button>
        </HStack>
      </form>
    </Box>
  );
};

const errorSelector = createErrorSelector(["EDIT_POST", "EDIT_COMMENT"]);

const mapStateToProps = (state) => ({
  error: errorSelector(state),
});

// redux dispatch when called
const mapDispatchToProps = (dispatch) => ({
  startEditPost: ({ id, body }) => dispatch(startEditPost({ id, body })),
  startEditComment: ({ id, body }) => dispatch(startEditComment({ id, body })),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditBox);
