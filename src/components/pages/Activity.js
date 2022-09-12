import PostList from "../posts/PostList";
import { Box } from "@chakra-ui/react";
import PageNavbar from "./PagesNavbar";

function Activity() {
  return (
    <Box width={"100%"}>
      <PageNavbar />
      <PostList />
    </Box>
  );
}

export default Activity;
