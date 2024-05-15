import React from "react";
import logo from "../assets/images/logo.png";
import { Box, Divider, useMediaQuery } from "@mui/material";

import CommonuButton from "./CommonuButton";
import Menu from "./Menu";

export default function Navbar() {
  const tabletMode = useMediaQuery("(max-width:1023px)");
  return (
    <nav className="navbar">
      <img src={logo} alt="logo" />
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {!tabletMode ? (
          <>
            <Box sx={{ paddingRight: "2.5rem" }}>
              <ul className="navlinks">
                <li>Features</li>
                <li>Blog</li>
                <li className="active-link">Calculators</li>
                <li>About</li>
                <li>Contact</li>
              </ul>
            </Box>
            <Divider
              orientation="vertical"
              variant="middle"
              flexItem
              sx={{ borderColor: "#D1D5DB" }}
            />
          </>
        ) : (
          ""
        )}
        <Box
          sx={{
            paddingLeft: "2.5rem",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "2.5vw",
          }}
        >
          <CommonuButton
            variant="contained"
            style={{
              padding: "0.5rem 2.5vw",
              background: "var(--bg-golden)",
              color: "var(--lightblack2)",
              borderRadius: "unset",
              fontWeight: "700",
              textAlign: "center",
              textTransform: "none",
              whiteSpace: "nowrap",
              minWidth: "118px",
              maxWidth: "171px",
              width: "100%",
            }}
          >
            Join waitlist
          </CommonuButton>
          {!tabletMode ? (
            <CommonuButton
              variant="contained"
              style={{
                border: "1px solid var(--lightgreen1)",
                padding: "0.5rem 2.5rem",
                background: "transparent",
                color: "var(--lightgreen1)",
                borderRadius: "unset",
                fontWeight: "700",
                textAlign: "center",
                textTransform: "none",
                whiteSpace: "nowrap",
                width: "108px",
              }}
            >
              Login
            </CommonuButton>
          ) : (
            <Menu />
          )}
        </Box>
      </Box>
    </nav>
  );
}
