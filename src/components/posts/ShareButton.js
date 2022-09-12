import React from "react";
import { RWebShare } from "react-web-share";
import { Button } from "@chakra-ui/react";
import newStyle from "../../styles/new.module.css";
import { FaShare } from "react-icons/fa";

function ShareButton() {
  return (
    <div className={newStyle.shdbtn}>
      <RWebShare
        data={{
          text: "Web Share - khalbali",
          url: "http://ec2-3-109-3-237.ap-south-1.compute.amazonaws.com/",
          title: " Khalbali  http://localhost:3000",
        }}
        onClick={() => console.log("shared successfully!")}
      >
        <Button bgColor="transparent" color="gray">
          {" "}
          <FaShare />{" "}
        </Button>
      </RWebShare>
    </div>
  );
}

export default ShareButton;
