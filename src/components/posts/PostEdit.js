import { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import {
  Text,
  Heading,
  Box,
  Flex,
  HStack,
  Tooltip,
  IconButton,
  useColorMode,
} from "@chakra-ui/react";
import { ChatIcon, EditIcon } from "@chakra-ui/icons";
import ThemedBox from "../ThemedBox";
import UpvoteBar from "./UpvoteBar";
import EditBox from "./EditBox";
import DeleteButton from "./DeleteButton";
import ChakraMarkdown from "../ChakraMarkdown";
import { userSelector } from "../../states/selectors";
import ShareButton from "./ShareButton";

const PostEdit = ({
  id,
  type,
  subreddit,
  author,
  createdAt,
  title,
  body,
  numVotes,
  hasVoted,
  numComments,
  user,
}) => {
  const { colorMode } = useColorMode();
  const postDetailColor = "gray.500";
  const postDetailBgColor = colorMode === "light" ? "gray.100" : "gray.600";
  const isTextPost = type === "text";

  const [isEditing, setIsEditing] = useState(false);
  const deletedText = "[deleted]";

  // jsx element
  return (
    <ThemedBox
      p={[2, 4]}
      borderRadius="md"
      width="100%"
      light="gray.50"
      dark="gray.700"
    >
      <Flex>
        <UpvoteBar
          type="post"
          numVotes={numVotes}
          id={id}
          voteValue={hasVoted}
          user={user}
        />
        <Box flexGrow={1}>
          <Text
            as={Link}
            to={`/r/${subreddit}`}
            color={postDetailColor}
            fontWeight="bold"
          >
            {`r/${subreddit}`}
          </Text>{" "}
          <Text as="span" color={postDetailColor}>
            {`Posted by `}
          </Text>
          <Text as="span">{author ? `u/${author}` : deletedText}</Text>
          <Text as="span" color={postDetailColor} style={{ float: "right" }}>
            {" "}
            <Tooltip label={moment(createdAt).format("LLLL")}>
              {moment(createdAt).fromNow()}
            </Tooltip>
          </Text>
          <Heading
            as={isTextPost ? Link : "a"}
            display="block"
            to={isTextPost ? `/r/${subreddit}/comments/${id}` : null}
            href={isTextPost ? null : body}
            target={isTextPost ? null : "_blank"}
            mt={2}
            mb={2}
            fontSize="1.20em"
            fontWeight="600"
            fontFamily={"serif"}
          >
            {title || deletedText}
          </Heading>
          {isTextPost ? (
            isEditing ? (
              <EditBox
                type="post"
                id={id}
                initialText={body}
                onClose={() => setIsEditing(false)}
              />
            ) : (
              <Box listStylePosition="inside">
                <ChakraMarkdown>{body}</ChakraMarkdown>
              </Box>
            )
          ) : null}
          <Flex
            mt={1}
            alignItems="center"
            color={postDetailColor}
            fontWeight="bold"
          >
            <Box
              as={Link}
              to={`/r/${subreddit}/comments/${id}`}
              p={1}
              h={8}
              borderRadius="sm"
              _hover={{ backgroundColor: postDetailBgColor }}
            >
              <ChatIcon mr={2} />
              {numComments} {numComments <= 1 ? "comment" : "comments"}
            </Box>
            <ShareButton />
          </Flex>
        </Box>
        {user && user.username === author && (
          <HStack alignItems="flex-start">
            {isTextPost && !isEditing && (
              <IconButton
                onClick={() => setIsEditing(true)}
                // backgroundColor="inherit"
                variant="outline"
                colorScheme="teal"
                size="sm"
                marginLeft={1}
                icon={<EditIcon />}
              />
            )}
            <DeleteButton type="post" id={id} />
          </HStack>
        )}
      </Flex>
    </ThemedBox>
  );
};

// user from redux
const mapStateToProps = (state) => ({
  user: userSelector(state),
});

export default connect(mapStateToProps)(PostEdit);
