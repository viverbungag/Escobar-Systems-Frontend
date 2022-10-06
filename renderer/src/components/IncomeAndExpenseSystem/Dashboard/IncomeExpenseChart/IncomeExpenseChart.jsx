import React, { useState } from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { Chart } from "chart.js/auto";
import styles from "./IncomeExpenseChart.module.scss";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

function IncomeExpenseChart({
  verticalBarGraphData,
  donutGraphData,
  lineOrdersGraphData,
  lineIncomeGraphData,
  tablesBarGraphData,
  servingTypeGraphData,
}) {
  const [toggleType, setToggleType] = useState("Income and Expense Comparison");
  const handleToggleChange = (e) => {
    setToggleType(e.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.toggle_container}>
        <ToggleButtonGroup value={toggleType} onChange={handleToggleChange}>
          <ToggleButton value="Income and Expense Comparison">
            Income and Expense Comparison
          </ToggleButton>
          <ToggleButton value="Income and Orders Per Hour">
            Income and Orders Per Hour
          </ToggleButton>
          <ToggleButton value="Orders Per Table">Orders Per Table</ToggleButton>
          <ToggleButton value="Dine-In & Take-Out Comparison">
            Dine-In & Take-Out Comparison
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
      <div className={styles.row}>
        {toggleType === "Income and Expense Comparison" && (
          <>
            <div className={styles.box}>
              <div className={styles.box_header}>
                Income and Expense Per Month Comparison
              </div>
              <div className={styles.box_content}>
                <Bar
                  data={verticalBarGraphData}
                  options={{
                    plugins: {
                      legend: {
                        position: "bottom",
                        align: "center",
                        labels: {
                          usePointStyle: true,
                          pointStyle: "circle",
                        },
                      },
                    },
                  }}
                />
              </div>
            </div>
            <div className={styles.box}>
              <div className={styles.box_header}>
                Income and Expense Overall Comparison
              </div>
              <div
                className={[
                  styles["box_content"],
                  styles["box_content_donut"],
                ].join(" ")}
              >
                <Doughnut
                  data={donutGraphData}
                  options={{
                    plugins: {
                      legend: {
                        position: "right",
                        align: "center",
                        labels: {
                          usePointStyle: true,
                          pointStyle: "circle",
                        },
                      },
                    },
                  }}
                />
              </div>
            </div>
          </>
        )}
        {toggleType === "Income and Orders Per Hour" && (
          <>
            <div className={styles.box}>
              <div className={styles.box_header}>Number of Orders Per Hour</div>
              <div
                className={[
                  styles["box_content"],
                  styles["box_content_line"],
                ].join(" ")}
              >
                <Line
                  data={lineOrdersGraphData}
                  options={{
                    plugins: {
                      legend: {
                        position: "right",
                        align: "center",
                        labels: {
                          usePointStyle: true,
                          pointStyle: "circle",
                        },
                      },
                    },
                  }}
                />
              </div>
            </div>
            <div className={styles.box}>
              <div className={styles.box_header}>Income Per Hour</div>
              <div
                className={[
                  styles["box_content"],
                  styles["box_content_line"],
                ].join(" ")}
              >
                <Line
                  data={lineIncomeGraphData}
                  options={{
                    plugins: {
                      legend: {
                        position: "right",
                        align: "center",
                        labels: {
                          usePointStyle: true,
                          pointStyle: "circle",
                        },
                      },
                    },
                  }}
                />
              </div>
            </div>
          </>
        )}
        {toggleType === "Orders Per Table" && (
          <div className={styles.box}>
            <div className={styles.box_header}>
              Number of Orders Served Per Table
            </div>
            <div
              className={[
                styles["box_content"],
                styles["box_content_line"],
              ].join(" ")}
            >
              <Bar
                data={tablesBarGraphData}
                options={{
                  plugins: {
                    legend: {
                      position: "right",
                      align: "center",
                      labels: {
                        usePointStyle: true,
                        pointStyle: "circle",
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
        )}
        {toggleType === "Dine-In & Take-Out Comparison" && (
          <div className={styles.box}>
            <div className={styles.box_header}>
              Dine-In & Take-Out Comparison
            </div>
            <div
              className={[
                styles["box_content"],
                styles["box_content_line"],
              ].join(" ")}
            >
              <Bar
                data={servingTypeGraphData}
                options={{
                  plugins: {
                    legend: {
                      position: "right",
                      align: "center",
                      labels: {
                        usePointStyle: true,
                        pointStyle: "circle",
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default IncomeExpenseChart;
