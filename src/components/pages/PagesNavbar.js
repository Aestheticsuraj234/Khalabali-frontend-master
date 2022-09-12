import { NavLink } from "react-router-dom";
import { Box, List, UnorderedList } from "@chakra-ui/react";
import pageStyle from "../../styles/pageStyle.module.css";

const PageNavbar = () => {
  // className
  let activeStyle = {
    textDecoration: "underline",
    fontSize: "large",
    color: "#2e2eb8",
    fontWeight: "600",
  };
   // className
  let inActiveStyle = {
    textDecoration: "none",
    color: "#2e2eb8",
  };
  // jsx component
  return (
    <Box width={"100%"}>
      <UnorderedList className={pageStyle.navOptions}>
        <List mr={3}>
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : inActiveStyle)}
            className={pageStyle.trendContent}
            to="/pages/activity"
          >
            Activity
          </NavLink>
        </List>
        <List mr={3}>
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : inActiveStyle)}
            className={pageStyle.trendContent}
            to="#"
          >
            Threads
          </NavLink>
        </List>
        <List mr={3}>
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : inActiveStyle)}
            className={pageStyle.trendContent}
            to="#"
          >
            Replies
          </NavLink>
        </List>
        <List mr={3} display={["none", "block"]}>
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : inActiveStyle)}
            className={pageStyle.trendContent}
            to="#"
          >
            526 Followers
          </NavLink>
        </List>
        <List display={["none", "block"]}>
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : inActiveStyle)}
            className={pageStyle.trendContent}
            to="#"
          >
            489 Following
          </NavLink>
        </List>
        <List mr={3}>
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : inActiveStyle)}
            className={pageStyle.trendContent}
            to="/pages/categories"
          >
            Categories
          </NavLink>
        </List>
      </UnorderedList>
    </Box>
  );
};

export default PageNavbar;
