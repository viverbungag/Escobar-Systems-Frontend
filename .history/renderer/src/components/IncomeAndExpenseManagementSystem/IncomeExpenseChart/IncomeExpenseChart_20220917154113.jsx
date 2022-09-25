import React from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import { Chart } from "chart.js/auto";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import styles from './IncomeExpenseChart.module.scss';

function IncomeExpenseChart({ verticalBarGraphData, donutGraphData }) {
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.box}>
          <div className={styles.box_header}>Income and Expense Per Month Comparison</div>
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
          <div className={styles.box_header}>Income and Expense As a whole comparison</div>
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
      </div>

    </div>
  );
}

export default IncomeExpenseChart;