import React from "react";
import { Box } from "@mui/material";

import logo from "../assets/images/logo.png";
import fbIcon from "../assets/images/social-fb-icon.png";
import twIcon from "../assets/images/social-tw-icon.png";
import instaIcon from "../assets/images/social-insta-icon.png";
import inIcon from "../assets/images/social-in-icon.png";

export default function Footer() {
  return (
    <footer className="footer">
      <Box sx={{ width: "100%", textAlign: "center" }}>
        <img src={logo} alt="logo" />
      </Box>
      <Box id="footerLinks">
        <span>Blog</span>
        <span>Features</span>
        <span>About us</span>
        <span>Terms</span>
        <span>Privacy</span>
      </Box>
      <p style={{ color: "var(--lightgray)", marginBottom: "64px" }}>
        © 2023 Billex Pvt. Ltd. All rights reserved.
      </p>
      <Box>
        <p style={{ marginBottom: "2rem" }}>Follow us</p>
        <Box sx={{ display: "inline-flex", alignItems: "center", gap: "1rem" }}>
          <img src={fbIcon} alt="fb" />
          <img src={twIcon} alt="tw" />
          <img src={instaIcon} alt="insta" />
          <img src={inIcon} alt="in" />
        </Box>
      </Box>
    </footer>
  );
}
