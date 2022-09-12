import { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { IconButton } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { createErrorSelector } from "../../states/selectors";
import { startDeletePost, startDeleteComment } from "../../states/actions";

const DeleteButton = ({
  type = "post",
  error,
  id,
  startDeletePost,
  startDeleteComment,
}) => {
  const hasError = useRef(error);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      hasError.current = error;
    }
    return () => {
      isMounted = false;
    };
  }, [error]);

  const [isLoading, setIsLoading] = useState(false);

  // on click delete button event handle
  const handleClick = async () => {
    setIsLoading(true);
    if (type === "post") {
      await startDeletePost(id);
    } else {
      await startDeleteComment(id);
    }
    if (!hasError.current) {
      setIsLoading(false);
    }
  };

  // jsx element
  return (
    <IconButton
      onClick={handleClick}
      isLoading={isLoading}
      backgroundColor="inherit"
      variant="outline"
      colorScheme="teal"
      size="sm"
      icon={<DeleteIcon />}
    />
  );
};

// error selector from redux
const errorSelector = createErrorSelector(
  ["DELETE_POST", "DELETE_COMMENT"],
  false
);

const mapStateToProps = (state) => ({
  error: errorSelector(state),
});

// redux dispatch when called
const mapDispatchToProps = (dispatch) => ({
  startDeletePost: (id) => dispatch(startDeletePost(id)),
  startDeleteComment: (id) => dispatch(startDeleteComment(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeleteButton);
