import React from "react";
import CreateGoal from "./CreateGoal";
import { Box } from "@mui/material";

export default function Calculator() {
  return (
    <Box sx={{ padding: "2rem 0" }}>
      <CreateGoal />
    </Box>
  );
}
