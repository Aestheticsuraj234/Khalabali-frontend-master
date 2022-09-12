import {
  Box,
  HStack,
  IconButton,
  Tag,
  Wrap,
  WrapItem,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import { FiHeart } from "react-icons/fi";
import React from "react";
import ThemedBox from "../ThemedBox";
import catgBox from "../../styles/catgBox.module.css";

function CategoriesBox({eachTopic}) {
  // const { eachTopic } = props;

  return (
    <ThemedBox
      p={[2, 4]}
      borderRadius="md"
      light="gray.50"
      dark="gray.700"
      maxWidth="450"
      m={2}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box>
        <HStack display={"flex"} justifyContent={"space-between"}>
          <Tag>Sample Tag</Tag>
          <p className={catgBox.threads}>Threads - 1,234 </p>
        </HStack>
        <Box mt={10}>
          <p>Lets disucss what's happening around the world of politics.</p>
        </Box>
        <Box mt={4}>
          <p className={catgBox.tags}>Similar TAGS</p>
          <Wrap spacing={3} mt={1}>
            <WrapItem>
              <Tag colorScheme="purple">world politics</Tag>
            </WrapItem>
            <WrapItem>
              <Tag colorScheme="blue">human rights</Tag>
            </WrapItem>
            <WrapItem>
              <Tag colorScheme="green">trump</Tag>
            </WrapItem>
            <WrapItem>
              <Tag colorScheme="yellow">climate change</Tag>
            </WrapItem>
            <WrapItem>
              <Tag colorScheme="red">Changing policy</Tag>
            </WrapItem>
          </Wrap>
        </Box>
        <Box as="p" mt={5}>
          <IconButton>
            <FiHeart />
          </IconButton>
        </Box>
      </Box>
    </ThemedBox>

    // <ThemedBox
    // p={[2, 4]}
    //   borderRadius="md"
    //   light="gray.50"
    //   dark="gray.700"
    //   minWidth='300'
    //   maxWidth= '450'
    //   m={2}
    // >
    //   <Box >
    //     <HStack display={'flex'} justifyContent={'space-between'}>
    //       <Tag>{eachTopic.tagName}</Tag>
    //       <p className={catgBox.threads}>Threads -{eachTopic.thread} </p>
    //     </HStack>
    //     <Box mt={10}>
    //       <p>{eachTopic.description}</p>
    //     </Box>
    //     <Box mt={4}>
    //       <p className={catgBox.tags}>Similar TAGS</p>
    //       <Wrap spacing={3} mt={1}>
    //         <UnorderedList>
    //         {
    //           eachTopic.similarTags.map(
    //             <ListItem>
    //               <Tag colorScheme="purple">{eachTopic.similarTags}</Tag>
    //             </ListItem>
    //           )
    //         }
    //         </UnorderedList>
    //       </Wrap>
    //     </Box>
    //     <Box as="p" mt={5}>
    //       <IconButton>
    //         <FiHeart />
    //       </IconButton>
    //     </Box>
    //   </Box>
    //   </ThemedBox>
  );
}

export default CategoriesBox;
