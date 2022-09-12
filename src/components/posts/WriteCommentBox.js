import React, {useState} from 'react';
import { connect } from 'react-redux';
import {
  Box,
  HStack,
  FormControl,
  FormErrorMessage,
  Textarea,
  Button,
} from '@chakra-ui/react';
import { userSelector, createLoadingAndErrorSelector }  from '../../states/selectors';
import { submitComment } from '../../states/actions/comments';

const WriteCommentBox=(props)=>{

  const [body, setBody]=useState();
  const [hasError, setHasError] = useState();
  // props
  const { type = 'comment', isLoading, error, user, postId, parentCommentId, submitComment, onClose}=props 
  const isReply = type === 'reply';

  // handle submit comment
  const handleSubmit =async(e) => {
    e.preventDefault();
    await submitComment({
      body,
      postId: postId,
      commentId: parentCommentId,
    });
    setBody('');
    if (error) {
      setHasError(true);
    }
    if (!error && onClose) {
      onClose();
    }
  };

  // jsx component
    return (
      <Box>
        <form onSubmit={handleSubmit}>
          <FormControl mb={3} isInvalid={error && hasError}>
            <Textarea
              value={body}
              onChange={(e) =>setBody(e.target.value)}
              variant="filled"
              isDisabled={!user}
              placeholder="what are your thoughts?"
              rows={5}
            />
            <FormErrorMessage>{error}</FormErrorMessage>
          </FormControl>
          <HStack>
            <Button isDisabled={!body} isLoading={isLoading} type="submit">
              {type}
            </Button>
            {isReply && onClose && <Button onClick={onClose}>cancel</Button>}
          </HStack>
        </form>
      </Box>
    );
  }

  // redux selectors for loading and error messages
const { loadingSelector, errorSelector } = createLoadingAndErrorSelector(
  ['SUBMIT_COMMENT'],
  false
);

// redux mapping state to props
const mapStateToProps = (state) => ({
  isLoading: loadingSelector(state),
  error: errorSelector(state),
  user: userSelector(state),
});
// redux dispatch when called
const mapDispatchToProps = (dispatch) => ({
  submitComment: (commentDetails) => dispatch(submitComment(commentDetails)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WriteCommentBox);
