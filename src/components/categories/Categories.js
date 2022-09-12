import {
  Wrap,
  WrapItem,
  Box,
  HStack,
  InputGroup,
  Input,
  InputLeftElement,
  Heading,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import CategoriesBox from "./CategoriesBox";
import catgBox from "../../styles/catgBox.module.css";

const cotegoryList = [
  {
    id: 1,
    tagName: "Sample Tag",
    threads: "1,234",
    description: "Lets disucss what's happening around the world of politics.",
    similarTags: [
      "world politics",
      "human rights",
      "trump",
      "climate change",
      "Changing policy",
    ],
  },
  {
    id: 2,
    tagName: "Sample Tag",
    threads: "1,234",
    description: "Lets disucss what's happening around the world of politics.",
    similarTags: [
      "world politics",
      "human rights",
      "trump",
      "climate change",
      "Changing policy",
    ],
  },
];

function Categories() {
  const [searchInput, setSearchInput] = useState("");
  console.log(searchInput);

  const searchedCotegoryList = cotegoryList.filter((eachItem) =>
    eachItem.tagName.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <Box width={"100%"}>
      <HStack
        // spacing={{
        //   sm: '10em',
        //   md: '20em',
        //   lg: '30em',
        //   xl: '50em',
        //   '2xl': '56.4em',
        // }}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Heading size={"md"}>Categories</Heading>
        <InputGroup className={catgBox.categoryinput}>
          <InputLeftElement
            pointerEvents="none"
            children={<SearchIcon color="gray.600" />}
          />
          <Input type="text" placeholder="Search Categories..." />
        </InputGroup>
      </HStack>
      <Wrap display="flex" justifyContent="center" alignItems="center">
        <WrapItem>
          <CategoriesBox />
        </WrapItem>
        <WrapItem>
          <CategoriesBox />
        </WrapItem>
        <WrapItem>
          <CategoriesBox />
        </WrapItem>
        <WrapItem>
          <CategoriesBox />
        </WrapItem>
        <WrapItem>
          <CategoriesBox />
        </WrapItem>
        <WrapItem>
          <CategoriesBox />
        </WrapItem>
        <WrapItem>
          <CategoriesBox />
        </WrapItem>
      </Wrap>
    </Box>
    // <Box>
    //   <HStack
    //     spacing={{
    //       sm: '10em',
    //       md: '20em',
    //       lg: '30em',
    //       xl: '50em',
    //       '2xl': '56.4em',
    //     }}
    //   >
    //     <Heading size={'md'}>Categories</Heading>
    //     <InputGroup className={catgBox.categoryinput}>
    //       <InputLeftElement
    //         pointerEvents="none"
    //         children={<SearchIcon color="gray.600" />}
    //       />
    //       <Input type="text" placeholder="Search Categories..." value={searchInput}
    //         onChange={(e)=>setSearchInput(e.target.value)} />
    //     </InputGroup>
    //   </HStack>
    //   <Wrap display='flex' justifyContent='center'>
    //     {searchedCotegoryList.map((eachTopic) =>
    //     <WrapItem >
    //     <CategoriesBox eachTopic={eachTopic} />
    //     </WrapItem>
    //     )}
    //   </Wrap>
    // </Box>
  );
}

export default Categories;
