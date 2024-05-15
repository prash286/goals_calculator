import React from "react";
import Calculator from "./Calculator";
import Navbar from "../components/Navbar";
import { Box, useMediaQuery } from "@mui/material";
import vectorIcon1 from "../assets/images/vector1.png";
import vectorIcon2 from "../assets/images/vector2.png";
import Footer from "./Footer";

export default function AppLayout() {
  const tabletMode = useMediaQuery("(max-width:1023px)");
  return (
    <>
      <Navbar />
      <Box
        sx={{
          padding: "0 5vw",
          position: "relative",
          overflow: "hidden",
          background:
            "linear-gradient(72.67deg, rgba(93, 128, 255, 1) 1.13%, rgba(102, 105, 113, 1) 97.34%)",
        }}
      >
        <img
          src={vectorIcon1}
          alt=""
          style={{ position: "absolute", left: 0, zIndex: 0, opacity: 0.15 }}
        />
        <img
          src={vectorIcon2}
          alt=""
          style={{ position: "absolute", right: 0, zIndex: 0, opacity: 0.15 }}
        />
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
      {tabletMode ? <Footer /> : ""}
    </>
  );
}
