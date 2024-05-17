import React, { useState } from "react";
import { Box, Divider } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

import CommonuButton from "../components/CommonuButton";
import leftArrow from "../assets/images/left-arrow.png";
import { useGoalCalculator } from "../context/goalCalculationContext";
import { shortCurrencyLength } from "../utils/utils";

export default function TransactionModal() {
  const [value, setValue] = useState("");
  const { data, setIsNavigate } = useGoalCalculator();
  const { goalTimeline, amtInvestPerMonth, interestEarn, billexClubEarnings } =
    data;
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Box
      sx={{
        flex: 1,
        maxWidth: "488px",
        backgroundColor: "var(--bg-black)",
        color: "var(--white2)",
        padding: "2.5rem 1.5rem",
      }}
    >
      <h1
        style={{
          fontWeight: 700,
          fontSize: "clamp(1.4375rem, 1.1491rem + 1.1743vw, 2.25rem)",
          marginBottom: "2vw",
        }}
      >
        Goals Calculator
      </h1>

      <CommonuButton
        variant="contained"
        style={{
          backgroundColor: "transparent",
          color: "var(--lightblack1)",
          borderRadius: "unset",
          "&:hover": {
            backgroundColor: "transparent",
          },
        }}
        onClick={() => setIsNavigate(false)}
      >
        <img src={leftArrow} alt="arrow" />
        <span
          style={{ marginLeft: "0.5rem", fontWeight: 700, color: "#C7C8CD" }}
        >
          Back
        </span>
      </CommonuButton>

      <section
        style={{
          marginTop: "2rem",
        }}
      >
        <p
          style={{
            fontWeight: 700,
            fontSize: "clamp(1.1875rem, 1.0766rem + 0.4517vw, 1.5rem)",
            marginBottom: "2rem",
          }}
        >
          Excellent, there’s a{" "}
          <span style={{ color: "var(--lightpurpule)" }}>better way</span> than
          saving?
        </p>
        <FormControl sx={{ width: "100%" }}>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={value}
            onChange={handleChange}
            sx={{ display: "flex", flexDirection: "column", gap: "2rem" }}
          >
            <label
              className={
                value === "savings"
                  ? "goalRadioLabel activeGoal"
                  : "goalRadioLabel"
              }
            >
              <FormControlLabel
                value="savings"
                control={<Radio />}
                label="Savings"
              />
              <span>
                Invest {shortCurrencyLength(amtInvestPerMonth)} per month for{" "}
                {goalTimeline} months to achieve your goal.{" "}
              </span>
            </label>

            <label
              className={
                value === "billexClubInvest"
                  ? "goalRadioLabel activeGoal"
                  : "goalRadioLabel"
              }
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "0.5rem",
                  whiteSpace: "nowrap",
                }}
              >
                <FormControlLabel
                  value="billexClubInvest"
                  control={<Radio />}
                  label="BillexClub Invest"
                  sx={{ marginRight: "1vw" }}
                />
                <p>
                  up to <span className="text-gradient">10% pa</span>
                </p>
              </Box>

              <p
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <span
                  style={{
                    padding: "2px 4px",
                    fontSize: "clamp(0.75rem, 0.6612rem + 0.3613vw, 1rem)",
                    background: "var(--bg-golden)",
                    color: "#080909",
                    whiteSpace: "nowrap",
                  }}
                >
                  No lock in
                </span>
                <span
                  style={{
                    color: "var(--white2)",
                    fontWeight: 700,
                    fontSize: "1rem",
                    textAlign: "right",
                  }}
                >
                  Automatic monthly investment
                </span>
              </p>

              <section
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "1.25vw",
                }}
              >
                <Box sx={{ maxWidth: "102px", textAlign: "center" }}>
                  <p
                    style={{
                      fontSize: "1rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Invest
                  </p>
                  <p className="text-gradient">
                    {shortCurrencyLength(amtInvestPerMonth)} <br />
                    <span
                      style={{
                        fontSize:
                          "clamp(1.1875rem, 1.2541rem + -0.271vw, 1rem)",
                        fontWeight: 400,
                      }}
                    >
                      per month
                    </span>
                  </p>
                </Box>

                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ borderColor: "var(--lightblack1)", borderWidth: "1px" }}
                />

                <Box sx={{ maxWidth: "102px", textAlign: "center" }}>
                  <p
                    style={{
                      fontSize: "1rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    For
                  </p>
                  <p className="text-gradient">
                    {goalTimeline} <br />
                    <span
                      style={{
                        fontSize:
                          "clamp(1.1875rem, 1.2541rem + -0.271vw, 1rem)",
                        fontWeight: 400,
                      }}
                    >
                      month
                    </span>
                  </p>
                </Box>

                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ borderColor: "var(--lightblack1)", borderWidth: "1px" }}
                />

                <Box sx={{ maxWidth: "102px", textAlign: "center" }}>
                  <p
                    style={{
                      fontSize: "1rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Earn
                  </p>
                  <p className="text-gradient">
                    {shortCurrencyLength(interestEarn)} <br />
                    <span
                      style={{
                        fontSize:
                          "clamp(1.1875rem, 1.2541rem + -0.271vw, 1rem)",
                        fontWeight: 400,
                      }}
                    >
                      interest
                    </span>
                  </p>
                </Box>
              </section>

              <p
                style={{
                  fontSize: "1rem",
                  fontWeight: "400",
                  textAlign: "center",
                }}
              >
                Amount after {goalTimeline} months{" "}
                <span
                  style={{
                    color: "#4ADE80",
                    fontSize: "clamp(1.1875rem, 1.0766rem + 0.4517vw, 1.5rem)",
                    fontWeight: 700,
                  }}
                >
                  {shortCurrencyLength(billexClubEarnings?.toString())}
                </span>
              </p>
            </label>
          </RadioGroup>
        </FormControl>
      </section>
    </Box>
  );
}
