import React from "react";
import Calculator from "./Calculator";
import Navbar from "../components/Navbar";
import { Box } from "@mui/material";

export default function AppLayout() {
  return (
    <>
      <Navbar />
      <Box sx={{ padding: "0 5vw" }}>
        <Box
          sx={{
            height: "60px",
            display: "flex",
            alignItems: "center",
          }}
        >
          Breadcrum
        </Box>
        <Calculator />
      </Box>
    </>
  );
}
