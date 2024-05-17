import React from "react";
import { Line } from "react-chartjs-2";
import { Box, useMediaQuery } from "@mui/material";

export default function LinechartGraph({ chartData }) {
  const tabletMode = useMediaQuery("(max-width:1094px)");
  const smallDevice = useMediaQuery("(max-width:899px)");

  return (
    <>
      <div className="chart-container">
        <Line
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              title: {
                display: false,
                text: "",
              },
              legend: {
                display: false,
              },
              tooltip: {
                displayColors: false,
                callbacks: {
                  title: function (context) {
                    let label = context[0].formattedValue || "";
                    label = label.replace(/,/g, "");

                    if (Number(label) >= 1000) {
                      return (Number(label) / 1000).toFixed(1) + "K";
                    } else {
                      return label;
                    }
                  },
                  label: function () {
                    return "";
                  },
                },
                backgroundColor: "transparent",
                titleColor: function (tooltipItem, chart) {
                  return tooltipItem.tooltip.labelColors[0].borderColor;
                },
                titleFont: { weight: 700, size: 16 },
                yAlign: "bottom",
              },
            },
            scales: {
              x: {
                grid: {
                  display: true,
                  color: "#44464B",
                },
                ticks: {
                  color: "#C7C8CD",
                  font: {
                    size: smallDevice ? 9 : tabletMode ? 12 : 16,
                    weight: 700,
                  },
                },
              },
              y: {
                display: true,
                ticks: {
                  display: false,
                },
                title: {
                  display: true,
                  text: "Investment value (INR Lakhs)",
                  color: "#C7C8CD",
                  font: {
                    size: smallDevice ? 9 : tabletMode ? 12 : 16,
                    weight: 700,
                    lineHeight: 1.2,
                  },
                },
                grid: {
                  display: true,
                  color: "#44464B",
                },
              },
            },
          }}
        />
      </div>
      <Box sx={{ fontWeight: 500, fontSize: "13px" }}>
        <p
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "0.5rem",
            marginBottom: "0.75rem",
            marginTop: "6px",
          }}
        >
          <span
            style={{
              display: "block",
              width: "3rem",
              height: "2.24px",
              backgroundColor: "#AFB1B7",
              borderRadius: "0.5rem",
            }}
          />
          <span style={{ color: "var(--white2)" }}>Savings Plan</span>
        </p>
        <p
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <span
            style={{
              display: "block",
              width: "3rem",
              height: "2.24px",
              backgroundColor: "#F59E0B",
              borderRadius: "0.5rem",
            }}
          />
          <span className="text-gradient">BillexClub Plan</span>
        </p>
      </Box>
    </>
  );
}
