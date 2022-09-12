import { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Flex, Text, IconButton } from "@chakra-ui/react";
import { TriangleUpIcon, TriangleDownIcon } from "@chakra-ui/icons";
import { submitVote } from "../../states/actions";
// import { userSelector } from "../states/selectors";

const UpvoteBar = ({
  type = "post",
  size = 5,
  numVotes,
  id,
  voteValue,
  submitVote,
  user,
}) => {
  const [localNumVotes, setNumVotes] = useState(numVotes);
  const [localVoteValue, setVoteValue] = useState(voteValue);
  // console.log(voteValue, localVoteValue);

  const upvoteColor = "orange.500";
  const downvoteColor = "blue.500";

  const numberColor =
    localVoteValue === 1
      ? upvoteColor
      : localVoteValue === -1
      ? downvoteColor
      : null;

  const upvoteIcon = (
    <TriangleUpIcon
      color={localVoteValue === 1 ? upvoteColor : null}
      w={size}
      h={size}
      _hover={{ color: upvoteColor }}
    />
  );

  const downvoteIcon = (
    <TriangleDownIcon
      color={localVoteValue === -1 ? downvoteColor : null}
      w={size}
      h={size}
      _groupHover={{ color: downvoteColor }}
    />
  );

  const updateNumberOfVotes = (votes) => {
    // console.log(votes);
    setNumVotes(votes);
  };

  const handleUpvote = () => {
    const voteDetails = { type, id };
    if (localVoteValue === 1) {
      voteDetails.voteValue = "0";
      setVoteValue(0);
      updateNumberOfVotes(localNumVotes - 1);
    } else if (localVoteValue === 0 || localVoteValue === null) {
      voteDetails.voteValue = "1";
      setVoteValue(1);

      updateNumberOfVotes(localNumVotes + 1);
    } else if (localVoteValue === -1) {
      voteDetails.voteValue = "1";
      setVoteValue(1);

      updateNumberOfVotes(localNumVotes + 2);
    }

    // console.log(voteDetails, "hi manihs", voteValue);
    // return;
    submitVote(voteDetails);
  };

  const handleDownvote = () => {
    const voteDetails = { type, id };
    if (localVoteValue === 1) {
      voteDetails.voteValue = "-1";
      setVoteValue(-1);

      updateNumberOfVotes(localNumVotes - 2);
    } else if (localVoteValue === 0 || localVoteValue === null) {
      voteDetails.voteValue = "-1";
      setVoteValue(-1);

      updateNumberOfVotes(localNumVotes - 1);
    } else if (localVoteValue === -1) {
      voteDetails.voteValue = "0";
      setVoteValue(0);

      updateNumberOfVotes(localNumVotes + 1);
    }
    // console.log(voteDetails, "hi manihs", voteValue);
    // return;
    submitVote(voteDetails);
  };

  return (
    <Flex direction="column" alignItems="center" mr={3}>
      <IconButton
        role="group"
        onClick={handleUpvote}
        backgroundColor="inherit"
        color={localVoteValue && localNumVotes === 1 ? upvoteColor : null}
        boxShadow="none !important"
        icon={upvoteIcon}
      />
      <Text fontSize={3.5 * size} color={numberColor} p={0}>
        {localNumVotes}
      </Text>
      <IconButton
        role="group"
        onClick={handleDownvote}
        backgroundColor="inherit"
        color={localVoteValue && localNumVotes === -1 ? downvoteColor : null}
        boxShadow="none !important"
        icon={downvoteIcon}
      />
    </Flex>
  );
};

UpvoteBar.propTypes = {
  size: PropTypes.number,
  numVotes: PropTypes.number,
  type: PropTypes.oneOf(["post", "comment"]),
  id: PropTypes.number,
  voteValue: PropTypes.oneOf([-1, 0, 1, null]),
  submitVote: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
  submitVote: (type, id, voteValue, newNumVotes) =>
    dispatch(submitVote(type, id, voteValue, newNumVotes)),
});

// const mapStateToProps = (state) => ({
//   user: userSelector(state),
// })

export default connect(null, mapDispatchToProps)(UpvoteBar);
