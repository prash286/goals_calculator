import React, { useEffect, useRef, useState } from "react";
import { Box, Grid, TextField } from "@mui/material";
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
import { useGoalCalculator } from "../context/goalCalculationContext";
import {
  calculateBillexClubAndNormalEarnings,
  formatAmount,
  formatInvestPerAmount,
} from "../utils/utils";

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

const goalCategoryArr = ["Vehicle", "House", "Trip", "Furniture"];

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
  fontSize: "1.5rem",
};
const edgeStyle = {
  ...contentStyle,
  color: "var(--lightgray)",
  width: "100%",
  border: "none",
  outline: "none",
  fontSize: "1.5rem",
};

export default function CreateGoal() {
  const theme = useTheme();
  const goalAmtRef = useRef();
  const { setData, setIsNavigate } = useGoalCalculator();

  const [formData, setFormData] = useState({
    categoryName: "Vehicle",
    goalName: "",
    goalAmount: "",
    goalTimeline: 3,
    amtInvestPerMonth: "",
    billexClubEarnings: "",
    normalEarnings: "",
    interestEarn: "",
  });

  const [error, setError] = useState({ goalName: false, goalAmount: false });

  const handleChange = (event) => {
    const name = event.target.name;
    const val = event.target.value;

    if (name === "goalAmount" && val?.includes("₹")) {
      let amountWithoutSymbol = val.replace("₹", "");
      amountWithoutSymbol = amountWithoutSymbol.replace(/,/g, "");
      let amountAsInt = parseInt(amountWithoutSymbol);
      setFormData((oldData) => ({ ...oldData, [name]: amountAsInt }));
    } else {
      setFormData((oldData) => ({ ...oldData, [name]: val }));
    }

    if (name === "goalAmount") {
      if (val) {
        setError((errData) => ({ ...errData, goalAmount: false }));
      } else {
        setError((errData) => ({ ...errData, goalAmount: true }));
      }
    }

    if (name === "goalName") {
      if (val) {
        setError((errData) => ({ ...errData, goalName: false }));
      } else {
        setError((errData) => ({ ...errData, goalName: true }));
      }
    }
  };

  const handleBlur = () => {
    const goalAmtValue = goalAmtRef.current.value;

    goalAmtRef.current.value = formatAmount(goalAmtValue, 0);

    calculateInvestPerMonthValue(formData.goalTimeline);
  };

  const calculateInvestPerMonthValue = (month) => {
    if (formData.goalAmount) {
      const perMonthVal = (Number(formData.goalAmount) / month).toFixed(1);
      setFormData((prevData) => ({
        ...prevData,
        amtInvestPerMonth: perMonthVal,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        amtInvestPerMonth: "",
      }));
    }
  };

  function handleMonthsSlider(e) {
    let ele = "";
    let val = "";

    switch (e) {
      case 0:
        ele = document.querySelector(
          ".slick-track .slick-slide:first-child .currentActiveMonth"
        );
        val = ele.value;
        break;
      case 1:
        ele = document.querySelector(
          ".slick-track .slick-slide:nth-child(2) .currentActiveMonth"
        );
        val = ele.value;
        break;
      case 2:
        ele = document.querySelector(
          ".slick-track .slick-slide:nth-child(3) .currentActiveMonth"
        );
        val = ele.value;
        break;
      case 3:
        ele = document.querySelector(
          ".slick-track .slick-slide:last-child .currentActiveMonth"
        );
        val = ele.value;
        break;

      default:
        break;
    }

    setFormData((prevData) => ({ ...prevData, goalTimeline: val }));
    calculateInvestPerMonthValue(val);
  }

  function validateData() {
    if (formData.goalName && formData.goalAmount) {
      setError((errData) => ({
        ...errData,
        goalName: false,
        goalAmount: false,
      }));
      setData(formData);
      setIsNavigate(true);
    } else {
      if (!formData.goalName) {
        setError((errData) => ({ ...errData, goalName: true }));
      } else {
        setError((errData) => ({ ...errData, goalName: false }));
      }
      if (!formData.goalAmount) {
        setError((errData) => ({ ...errData, goalAmount: true }));
      } else {
        setError((errData) => ({ ...errData, goalAmount: false }));
      }
    }
  }

  useEffect(() => {
    if (formData.goalAmount && formData.goalTimeline) {
      const { billexClubEarnings, normalEarnings, interestEarn } =
        calculateBillexClubAndNormalEarnings(
          formData.goalAmount,
          formData.goalTimeline
        );
      setFormData((prevData) => ({
        ...prevData,
        billexClubEarnings,
        normalEarnings,
        interestEarn,
      }));
    }
  }, [formData.goalAmount, formData.goalTimeline]);

  return (
    <Box id="createGoalBox">
      <h1
        style={{
          color: "var(--heading-text)",
          marginBottom: "1vw",
          fontWeight: 700,
          fontSize: "clamp(1.4375rem, 1.1491rem + 1.1743vw, 2.25rem)",
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
        <TextField
          error={error.goalName}
          helperText={error.goalName ? "Please enter goal name." : ""}
          label="Goal name"
          autoComplete="off"
          name="goalName"
          onChange={handleChange}
        />

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
              "& .css-hfutr2-MuiSvgIcon-root-MuiSelect-icon": {
                color: "var(--input-text)",
              },
            }}
            name="categoryName"
            defaultValue="Vehicle"
            onChange={handleChange}
            input={
              <OutlinedInput id="goalCategoryInput" label="Goal category" />
            }
            MenuProps={MenuProps}
          >
            {goalCategoryArr.map((category) => (
              <MenuItem
                key={category}
                value={category}
                style={getStyles(category, formData.categoryName, theme)}
              >
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          error={error.goalAmount}
          label="Goal amount"
          autoComplete="off"
          type="text"
          name="goalAmount"
          inputRef={goalAmtRef}
          onChange={handleChange}
          onBlur={handleBlur}
          helperText={error.goalAmount ? "Please enter valid amount" : ""}
        />

        <Box
          sx={{ border: "1px solid rgba(102, 105, 113, 1)", padding: "1rem" }}
        >
          <p
            style={{
              color: "var(--heading-text)",
              fontSize: "clamp(1.1875rem, 1.0766rem + 0.4517vw, 1.5rem)",
            }}
          >
            Choose goal timeline <span>(in months)</span>
          </p>
          <Grid container spacing={2} sx={{ marginTop: "1rem" }}>
            <Grid item xs={6} sx={{ padding: "0px !important" }}>
              <Carousel
                afterChange={handleMonthsSlider}
                arrows
                dotPosition="left"
                infinite={false}
              >
                <div>
                  <button disabled style={edgeStyle}>
                    &nbsp;
                  </button>
                  <button
                    style={centeredStyle}
                    value={3}
                    className="currentActiveMonth"
                  >
                    3 months
                  </button>
                  <button disabled style={edgeStyle}>
                    6 months
                  </button>
                </div>
                <div>
                  <button style={edgeStyle}>3 months</button>
                  <button
                    value={6}
                    style={centeredStyle}
                    className="currentActiveMonth"
                  >
                    6 months
                  </button>
                  <button style={edgeStyle}>9 months</button>
                </div>
                <div>
                  <button style={edgeStyle}>6 months</button>
                  <button
                    value={9}
                    style={centeredStyle}
                    className="currentActiveMonth"
                  >
                    9 months
                  </button>
                  <button style={edgeStyle}>12 months</button>
                </div>
                <div>
                  <button style={edgeStyle}>9 months</button>
                  <button
                    value={12}
                    style={centeredStyle}
                    className="currentActiveMonth"
                  >
                    12 months
                  </button>
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
                  <b style={{ fontSize: "1.5rem" }}>
                    {formData.amtInvestPerMonth
                      ? formatInvestPerAmount(formData.amtInvestPerMonth, 0)
                      : 0}
                    &nbsp;
                  </b>
                  /month
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
          onClick={validateData}
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
