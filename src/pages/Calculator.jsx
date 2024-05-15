import React from "react";
import CreateGoal from "./CreateGoal";
import { Box } from "@mui/material";
import userPic from "../assets/images/user-pic.png";

export default function Calculator() {
  return (
    <Box id="createGoalContainer">
      <CreateGoal />
      <Box sx={{ flex: 1, textAlign: "center" }} id="userPic">
        <img
          src={userPic}
          alt="pic"
          style={{ width: "100%", maxWidth: "512px" }}
        />
      </Box>
    </Box>
  );
}
