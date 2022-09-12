import React from "react";
import { HStack, Flex, Heading, Text, Box } from "@chakra-ui/react";
import TrendingAdmins from "./TrendingAdmins.js";
import TrendingSiteStatistics from "./TrendingSiteStatistics";
import TrendingNavbar from "./TrendingNavbar";

const TrendingAbout = () => {
  return (
    <Box width={"100%"}>
      <TrendingNavbar />

      <Heading size="sm" mb={3}>
        About khalabali
      </Heading>
      <Text mb={3}>
        Khalabali is the community where everyone can share their openion
        freely.
      </Text>
      <Heading size="sm" mb={3}>
        Admins
      </Heading>
      <Flex gap="3">
        <HStack>
          <TrendingAdmins />
        </HStack>
      </Flex>

      {/* Admins Section */}
      {/* Mods Section */}
      <Heading size="sm" mb={3}>
        Moderators
      </Heading>
      <Flex gap="3">
        <HStack>
          <TrendingAdmins />
        </HStack>
      </Flex>
      <Heading size="sm" mb={3}>
        Site Statistics
      </Heading>
      <TrendingSiteStatistics />
      <Heading size="sm" mb={3} mt={3}>
        Contact Us
      </Heading>
      <p>Please feel free to leave us a message at khalabali...</p>
    </Box>
  );
};

export default TrendingAbout;
