import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";

import autoaAwesomeIcon from "../assets/images/auto_awesome.png";
import LinechartGraph from "../components/LinechartGraph";
import { useGoalCalculator } from "../context/goalCalculationContext";
import {
  calculateBillexClubAndNormalEarnings,
  shortCurrencyLength,
} from "../utils/utils";

Chart.register(CategoryScale);

export default function Linechart() {
  const { data } = useGoalCalculator();

  const { goalTimeline, billexClubEarnings, normalEarnings, goalAmount } = data;

  const createChartData = [
    {
      id: 1,
      year: 3,
      userGain: 10000,
      userLost: 8000,
    },
    {
      id: 2,
      year: 6,
      userGain: 20000,
      userLost: 15000,
    },
    {
      id: 3,
      year: 9,
      userGain: 35000,
      userLost: 40000,
    },
    {
      id: 4,
      year: 12,
      userGain: 50000,
      userLost: 35000,
    },
  ];

  const [chartData, setChartData] = useState({
    labels: createChartData.map((data) => data.year),
    datasets: [
      {
        data: createChartData.map((data) => data.userGain),
        borderColor: "#F59E0B",
        borderWidth: 2,
      },
      {
        data: createChartData.map((data) => data.userLost),
        borderColor: "#AFB1B7",
        borderWidth: 2,
      },
    ],
  });

  useEffect(() => {
    const months = [3, 6, 9, 12];
    const tempData = months.reduce((arr, currMonth, index) => {
      const { billexClubEarnings, normalEarnings } =
        calculateBillexClubAndNormalEarnings(goalAmount, currMonth);
      arr.push({
        id: index + 1,
        month: currMonth,
        billexClubPlan: billexClubEarnings,
        savingPlan: normalEarnings,
      });
      return arr;
    }, []);

    const createNewChartData = {
      labels: tempData?.map((data) => data.month),
      datasets: [
        {
          data: tempData?.map((data) => data.billexClubPlan),
          borderColor: "#F59E0B",
          borderWidth: 2,
        },
        {
          data: tempData?.map((data) => data.savingPlan),
          borderColor: "#AFB1B7",
          borderWidth: 2,
        },
      ],
    };

    setChartData(createNewChartData);
  }, [goalAmount]);

  return (
    <Box
      sx={{
        flex: 1,
        padding: "5rem 0",
        display: "flex",
        flexDirection: "column",
        columnGap: "4.5vh",
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LinechartGraph chartData={chartData} />
      </Box>

      <Box sx={{ marginTop: "2rem" }}>
        <p
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "1.5rem",
            marginBottom: "1.5rem",
          }}
        >
          <img src={autoaAwesomeIcon} alt="icon" />
          <span
            style={{
              color: "var(--lightpurpule)",
              fontSize: "clamp(1.1875rem, 1.0766rem + 0.4517vw, 1.5rem)",
              fontWeight: 700,
            }}
          >
            Insights
          </span>
        </p>
        <Box sx={{ padding: "1rem", backgroundColor: "var(--lightgreen2)" }}>
          <p style={{ marginBottom: "1rem" }}>
            With{" "}
            <b
              style={{ fontSize: "clamp(1rem, 0.8225rem + 0.7227vw, 1.5rem)" }}
            >
              BillexClub Invest
            </b>{" "}
            you’ll have{" "}
            <b
              style={{
                fontSize: "clamp(1.1875rem, 1.0766rem + 0.4517vw, 1.5rem)",
              }}
            >
              {shortCurrencyLength(billexClubEarnings?.toString())}
            </b>{" "}
            in {goalTimeline} months (
            {shortCurrencyLength(
              (billexClubEarnings / goalTimeline)?.toFixed(1)?.toString(),
              true
            )}
            /mon)
          </p>
          <span style={{ fontWeight: 700 }}>
            This will save you{" "}
            {shortCurrencyLength(
              (billexClubEarnings - normalEarnings)?.toString()
            )}{" "}
            extra
          </span>
        </Box>
        <p style={{ marginTop: "1.5rem", color: "var(--white2)" }}>
          With regular Savings plan you’ll have{" "}
          <b
            style={{
              fontSize: "clamp(1.1875rem, 1.0766rem + 0.4517vw, 1.5rem)",
            }}
          >
            {shortCurrencyLength(normalEarnings?.toString())}
          </b>{" "}
          in {goalTimeline} months (
          {shortCurrencyLength(
            (normalEarnings / goalTimeline)?.toFixed(1)?.toString(),
            true
          )}
          /mon)
        </p>
      </Box>
    </Box>
  );
}
