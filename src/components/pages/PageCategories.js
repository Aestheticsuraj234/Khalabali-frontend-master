import React from "react";
import { Box } from "@chakra-ui/react";
// import Activity from "./Activity"
import PageNavbar from "./PagesNavbar";
import Categories from "../categories/Categories";

function pageCategories() {
  return (
    <Box width={"100%"}>
      <PageNavbar />
      <Categories />
    </Box>
  );
}
export default pageCategories;
