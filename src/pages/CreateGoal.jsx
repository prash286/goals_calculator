import { Box, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CommonuButton from "../components/CommonuButton";
import { Carousel } from "antd";

import house from "../assets/images/house.png";
import car from "../assets/images/car.png";
import trip from "../assets/images/trip.png";
import furniture from "../assets/images/furniture.png";
import rightArrow from "../assets/images/right-arrow.png";
import userPicMobile from "../assets/images/user-pic-mobile.png";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const contentStyle = {
  margin: 0,
  height: "40px",
  color: "#D9D9D9",
  lineHeight: "40px",
  textAlign: "center",
  background: "transparent",
};

const centeredStyle = {
  ...contentStyle,
  color: "var(--white2)",
  width: "100%",
  border: "none",
  outline: "none",
};
const edgeStyle = {
  ...contentStyle,
  color: "var(--lightgray)",
  width: "100%",
  border: "none",
  outline: "none",
};

export default function CreateGoal() {
  const theme = useTheme();
  const [personName, setPersonName] = useState("Oliver Hansen");
  const [goalAmt, setGoalAmt] = useState();

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <Box id="createGoalBox">
      <h1
        style={{
          color: "var(--heading-text)",
          marginBottom: "1rem",
          fontWeight: 700,
        }}
      >
        Goals Calculator
      </h1>

      <h3 style={{ color: "var(--heading-text)", fontWeight: 700 }}>
        Create a goal
      </h3>

      <Box id="userPicMobile" sx={{ my: "2rem" }}>
        <img src={userPicMobile} alt="user" />
      </Box>

      <Box
        sx={{
          marginTop: "1rem",
          marginBottom: "2rem",
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
        }}
      >
        <span style={{ color: "rgba(199, 200, 205, 1)" }}>Suggestions</span>
        <Box id="suggestionContainer">
          <button className="suggestion-box">
            <img src={house} alt="house" />
            <span>House</span>
          </button>
          <button className="suggestion-box">
            <img src={car} alt="house" />
            <span>Car</span>
          </button>
          <button className="suggestion-box">
            <img src={trip} alt="house" />
            <span>Trip</span>
          </button>
          <button className="suggestion-box">
            <img src={furniture} alt="house" />
            <span>Furniture</span>
          </button>
        </Box>
      </Box>

      <section
        style={{ display: "flex", flexDirection: "column", rowGap: "2rem" }}
      >
        <TextField label="Goal name" autoComplete="off" />

        <FormControl sx={{ width: 300 }}>
          <InputLabel id="goalCategory">Goal category</InputLabel>
          <Select
            labelId="goal-category-label"
            id="goalCategory"
            sx={{
              ".MuiInputBase-input.MuiOutlinedInput-input": {
                marginTop: "1rem",
                padding: "0 16px !important",
              },
            }}
            value={personName}
            onChange={handleChange}
            input={
              <OutlinedInput id="goalCategoryInput" label="Goal category" />
            }
            MenuProps={MenuProps}
          >
            {names.map((name) => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, personName, theme)}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Goal amount"
          autoComplete="off"
          type="text"
          value={goalAmt}
          // onBlur={(e) => {
          //   const value = Number(e.target.value);
          //   if (!isNaN(value) && value) {
          //     // Set the raw numeric value
          //     setGoalAmt(
          //       value.toLocaleString("en-IN", {
          //         style: "currency",
          //         currency: "INR",
          //         minimumFractionDigits: 0,
          //         maximumFractionDigits: 0,
          //       })
          //     );
          //   }
          // }}
          onChange={(e) => setGoalAmt(e.target.value)}
        />

        <Box
          sx={{ border: "1px solid rgba(102, 105, 113, 1)", padding: "1rem" }}
        >
          <p style={{ color: "var(--heading-text)" }}>
            Choose goal timeline <span>(in months)</span>
          </p>
          <Grid container spacing={2} sx={{ marginTop: "1rem" }}>
            <Grid item xs={6} sx={{ padding: "0px !important" }}>
              <Carousel arrows dotPosition="left" infinite={false}>
                <div>
                  <button disabled style={edgeStyle}>
                    &nbsp;
                  </button>
                  <button style={centeredStyle}>3 months</button>
                  <button disabled style={edgeStyle}>
                    6 months
                  </button>
                </div>
                <div>
                  <button style={edgeStyle}>3 months</button>
                  <button style={centeredStyle}>6 months</button>
                  <button style={edgeStyle}>9 months</button>
                </div>
                <div>
                  <button style={edgeStyle}>6 months</button>
                  <button style={centeredStyle}>9 months</button>
                  <button style={edgeStyle}>12 months</button>
                </div>
                <div>
                  <button style={edgeStyle}>9 months</button>
                  <button style={centeredStyle}>12 months</button>
                  <button style={edgeStyle}>&nbsp;</button>
                </div>
              </Carousel>
            </Grid>
            <Grid item xs={6} sx={{ padding: "0px !important" }}>
              <Box
                sx={{
                  color: "var(--lightgreen2)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                  textAlign: "center",
                }}
              >
                <span>Invest</span>
                <span>
                  <b style={{ fontSize: "1.5rem" }}>₹8,000&nbsp;</b>/month
                </span>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <CommonuButton
          variant="contained"
          style={{
            backgroundColor: "var( --white2)",
            color: "var(--lightblack1)",
            borderRadius: "unset",
            "&:hover": {
              backgroundColor: "var( --white2)",
            },
          }}
        >
          <span style={{ marginRight: "0.5rem", fontWeight: 700 }}>
            Continue
          </span>
          <img src={rightArrow} alt="arrow" />
        </CommonuButton>
      </section>
    </Box>
  );
}
