import React from "react";
import {
  Stack,
  Input,
  Box,
  Wrap,
  HStack,
  UnorderedList,
  ListItem,
  Button,
} from "@chakra-ui/react";
import newStyle from "../../styles/new.module.css";
import { BiMessageDetail } from "react-icons/bi";
import { RiChatPollLine, RiQuestionnaireLine } from "react-icons/ri";
import { FaPhotoVideo } from "react-icons/fa";
import { MdOndemandVideo } from "react-icons/md";
import TextEditor from "./TextEditor";

function New() {
  return (
    <Stack spacing={4} width={"100%"}>
      <h1>Create New Topic</h1>
      <hr></hr>
      <h1>Topic Title</h1>
      <Input variant="filled" placeholder="Subject of your topic" />
      <h1>
        Describe your topic well, while keeping the subject as short as
        possible.
      </h1>
      <h1>Topic Type</h1>
      <Box>
        <HStack>
          <Wrap spacing={6}>
            <Box className={newStyle.box1}>
              <Box alignItems="baseline">
                <BiMessageDetail className={newStyle.icon} />
                <span>
                  <h1 className={newStyle.heading1}> Discussion</h1>
                </span>
              </Box>
            </Box>
            <Box className={newStyle.box1}>
              <Box alignItems="baseline">
                <RiQuestionnaireLine className={newStyle.icon} />
                <span>
                  <h1 className={newStyle.heading1}> Question</h1>
                </span>
              </Box>
            </Box>
            <Box className={newStyle.box1}>
              <Box alignItems="baseline">
                <RiChatPollLine className={newStyle.icon} />
                <span>
                  <h1 className={newStyle.heading1}> Poll</h1>
                </span>
              </Box>
            </Box>
            <Box className={newStyle.box1}>
              <Box alignItems="baseline">
                <FaPhotoVideo className={newStyle.icon} />
                <span>
                  <h1 className={newStyle.heading1}> Gallery</h1>
                </span>
              </Box>
            </Box>
            <Box className={newStyle.box1}>
              <Box alignItems="baseline">
                <MdOndemandVideo className={newStyle.icon} />
                <span>
                  <h1 className={newStyle.heading1}> Video </h1>
                </span>
              </Box>
            </Box>
          </Wrap>
        </HStack>
      </Box>

      <h1>Topic Body</h1>

      <UnorderedList flex className={newStyle.unlist}>
        <ListItem className={newStyle.listItem}>
          <Button className={newStyle.listbtn}>
            <BiMessageDetail className={newStyle.icon1} />
          </Button>
        </ListItem>
        <ListItem className={newStyle.listItem}>
          <Button className={newStyle.listbtn}>
            <BiMessageDetail className={newStyle.icon1} />
          </Button>
        </ListItem>
        <ListItem className={newStyle.listItem}>
          <Button className={newStyle.listbtn}>
            <BiMessageDetail className={newStyle.icon1} />
          </Button>
        </ListItem>
        {/* <ListItem>Facilisis in pretium nisl aliquet</ListItem>
                <ListItem>Facilisis in pretium nisl aliquet</ListItem>
                <ListItem>Facilisis in pretium nisl aliquet</ListItem> */}
      </UnorderedList>
      <TextEditor />
    </Stack>
  );
}

export default New;
