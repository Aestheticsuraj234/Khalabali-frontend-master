import { React, useState } from "react";
import { Menu, MenuButton, MenuItem, MenuList, Button } from "@chakra-ui/react";
import { connect } from "react-redux";
import { ChevronDownIcon } from "@chakra-ui/icons";
//
function FilterComponent(props) {
  const [filterValue, setFilterValue] = useState("Filter By Date");
  const { postList } = props;
  console.log(postList);
  const oldToNew = () => {
    setFilterValue("Old to New");
    postList.reverse();
  };
  const newToOld = () => {
    setFilterValue("New to Old");
  };
  return (
    <div>
      <Menu>
        <MenuButton
          h={7}
          mx={3}
          as={Button}
          rightIcon={<ChevronDownIcon />}
          // onClick={() => {
          //   console.log(postList);
          // }}
        >
          {filterValue}
        </MenuButton>
        <MenuList>
          <MenuItem onClick={oldToNew}>Old to New</MenuItem>
          <MenuItem onClick={newToOld}>New to Old</MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    postList: state.postList,
  };
};

export default connect(mapStateToProps)(FilterComponent);
