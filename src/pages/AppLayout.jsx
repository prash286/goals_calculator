import React from "react";
import { Box, useMediaQuery } from "@mui/material";
import TransactionDetails from "./TransactionDetails";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";

import Navbar from "../components/Navbar";
import Calculator from "./Calculator";
import Footer from "./Footer";
import { useGoalCalculator } from "../context/goalCalculationContext";
import vectorIcon1 from "../assets/images/vector1.png";
import vectorIcon2 from "../assets/images/vector2.png";

export default function AppLayout() {
  const tabletMode = useMediaQuery("(max-width:1023px)");
  const mobileDevice = useMediaQuery("(max-width:425px)");
  const { isNavigate } = useGoalCalculator();

  return (
    <>
      <Navbar />
      <Box
        sx={{
          padding: "0 5vw",
          position: "relative",
          overflow: "hidden",
          minHeight: "100vh",
          background:
            "linear-gradient(72.67deg, rgba(93,128,255,1) 1.13%, rgba(0,0,0,1) 35%, rgba(102,105,113,1) 97.34%)",
        }}
      >
        <img
          src={vectorIcon1}
          alt=""
          style={{ position: "absolute", left: 0, zIndex: 0, opacity: 0.008 }}
        />
        <img
          src={vectorIcon2}
          alt=""
          style={{ position: "absolute", right: 0, zIndex: 0, opacity: 0.008 }}
        />
        <Box
          sx={{
            height: "60px",
            display: "flex",
            alignItems: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div role="presentation">
            <Breadcrumbs
              maxItems={mobileDevice ? 3 : 4}
              separator="›"
              aria-label="breadcrumb"
            >
              <Link
                underline="hover"
                color="var(--white2)"
                href="#"
                sx={{ color: "var(--white2)" }}
              >
                Home
              </Link>
              <Link
                underline="hover"
                color="var(--white2)"
                href="#"
                sx={{ color: "var(--white2)" }}
              >
                Calculators
              </Link>
              <Link
                underline="hover"
                color="var(--white2)"
                href="#"
                sx={{ color: "var(--white2)" }}
              >
                Investing
              </Link>
              <Link
                underline="hover"
                color="#AEFFC9"
                href="#"
                sx={{ color: "#AEFFC9" }}
              >
                Goals Calculator
              </Link>
            </Breadcrumbs>
          </div>
        </Box>
        {isNavigate ? <TransactionDetails /> : <Calculator />}
      </Box>
      {tabletMode ? <Footer /> : ""}
    </>
  );
}
