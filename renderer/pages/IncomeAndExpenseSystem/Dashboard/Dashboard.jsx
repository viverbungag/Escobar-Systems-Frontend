import React, { useState, useEffect } from "react";
import IncomeExpenseChart from "../../../src/components/IncomeAndExpenseSystem/Dashboard/IncomeExpenseChart/IncomeExpenseChart";
import SideMenu from "../../../src/components/IncomeAndExpenseSystem/Shared/SideMenu/SideMenu";
import styles from "./Dashboard.module.scss";
import Rest from "../../../src/rest/Rest.tsx";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField } from "@mui/material";
import dayjs from "dayjs";
import TitleBar from "../../../src/components/IncomeAndExpenseSystem/Shared/TitleBar/TitleBar";
import { useRouter } from "next/router";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import OrdersServedTable from "../../../src/components/IncomeAndExpenseSystem/Dashboard/OrdersServedTable/OrdersServedTable";

const INITIAL_URL = process.env.NEXT_PUBLIC_INITIAL_URL;

function HomePage() {
  const rest = new Rest();

  const router = useRouter();

  // const handleBackButtonOnClick = () => {
  //   localStorage.getItem("isAdmin") === "true"
  //     ? router.push("/main-admin-dashboard")
  //     : router.push("/main-employee-dashboard");
  // }

  const [fromDate, setFromDate] = useState(
    dayjs().date(1).subtract(4, "month")
  );
  const [toDate, setToDate] = useState(dayjs().date(1));

  const handleFromDateOnChange = (newDate) => {
    setFromDate(dayjs(newDate));
  };

  const handleToDateOnChange = (newDate) => {
    setToDate(dayjs(newDate));
  };

  const [verticalBarGraphData, setVerticalBarGraphData] = useState({
    labels: [],
    datasets: [],
  });

  const getVerticalBarGraphDataOnSuccess = (data) => {
    setVerticalBarGraphData({
      labels: data.map((item) => item.expenseMonth),
      datasets: [
        {
          label: "Income",
          data: data.map((data) => data.monthlyIncome),
          backgroundColor: ["#35b000"],
        },
        {
          label: "Expense",
          data: data.map((data) => data.monthlyExpenses),
          backgroundColor: ["#e10000"],
        },
      ],
    });
  };

  const getVerticalBarGraphData = () => {
    rest.getPost(
      `${INITIAL_URL}/expense/vertical-bar-graph`,
      {
        toDate: toDate.add(1, "month").date(0),
        fromDate: fromDate,
      },
      getVerticalBarGraphDataOnSuccess
    );
  };

  const [donutGraphData, setDonutGraphData] = useState({
    labels: [],
    datasets: [],
  });

  const getDonutGraphDataOnSuccess = (data) => {
    setDonutGraphData({
      labels: data.map((item) => item.donutLabel),
      datasets: [
        {
          label: "Monthly",
          data: data.map((item) => item.donutData),
          backgroundColor: ["#e10000", "#35b000"],
        },
      ],
    });
  };

  const getDonutGraphData = () => {
    rest.getPost(
      `${INITIAL_URL}/expense/donut-graph`,
      {
        toDate: toDate.add(1, "month").date(0),
        fromDate: fromDate,
      },
      getDonutGraphDataOnSuccess
    );
  };

  const [lineOrdersGraphData, setLineOrdersData] = useState({
    labels: [],
    datasets: [],
  });

  const [lineIncomeGraphData, setLineGraphData] = useState({
    labels: [],
    datasets: [],
  });

  const getLineGraphDataOnSuccess = (data) => {
    setLineGraphData({
      labels: data.map((item) => item.incomeHour),
      datasets: [
        {
          label: "Income For This Hour",
          data: data.map((item) => item.hourlyIncome),
          backgroundColor: ["#225560"],
        },
      ],
    });

    setLineOrdersData({
      labels: data.map((item) => item.incomeHour),
      datasets: [
        {
          label: "Orders For This Hour",
          data: data.map((item) => item.hourlyOrders),
          backgroundColor: ["#F0803C"],
        },
      ],
    });
  };

  const getLineGraphData = () => {
    rest.getPost(
      `${INITIAL_URL}/expense/line-graph`,
      {
        toDate: toDate.add(1, "month").date(0),
        fromDate: fromDate,
      },
      getLineGraphDataOnSuccess
    );
  };

  const [tablesBarGraphData, setTablesBarGraphData] = useState({
    labels: [],
    datasets: [],
  });

  const getTablesBarGraphDataOnSuccess = (data) => {
    setTablesBarGraphData({
      labels: data.map((item) => item.tableNumber),
      datasets: [
        {
          label: "Orders Served",
          data: data.map((item) => item.totalCount),
          backgroundColor: ["#35b000"],
        },
      ],
    });
  };

  const getTablesBarGraphData = () => {
    rest.getPost(
      `${INITIAL_URL}/expense/table-graph`,
      {
        toDate: toDate.add(1, "month").date(0),
        fromDate: fromDate,
      },
      getTablesBarGraphDataOnSuccess
    );
  };

  const [servingTypeGraphData, setServingTypeGraphData] = useState({
    labels: [],
    datasets: [],
  });

  const getServingTypeGraphDataOnSuccess = (data) => {
    console.log(data);
    setServingTypeGraphData({
      labels: data.map((item) => item.servingType),
      datasets: [
        {
          label: "Orders Served",
          data: data.map((item) => item.servingTypeQuantity),
          backgroundColor: ["#35b000"],
        },
      ],
    });
  };

  const getServingTypeGraphData = () => {
    rest.getPost(
      `${INITIAL_URL}/expense/serving-type-graph`,
      {
        toDate: toDate.add(1, "month").date(0),
        fromDate: fromDate,
      },
      getServingTypeGraphDataOnSuccess
    );
  };

  const [ordersServedData, setOrdersServedData] = useState([]);

  const getOrdersServedOnSuccess = (data) => {
    setOrdersServedData(data);
  };

  const getOrdersServed = () => {
    rest.getPost(
      `${INITIAL_URL}/expense/orders-served`,
      {
        toDate: toDate.add(1, "month").date(0),
        fromDate: fromDate,
      },
      getOrdersServedOnSuccess
    );
  };

  useEffect(() => {
    // console.log(fromDate);
    getVerticalBarGraphData();
    getDonutGraphData();
    getLineGraphData();
    getTablesBarGraphData();
    getOrdersServed();
    getServingTypeGraphData();
  }, [toDate, fromDate]);

  const current = new Date();
  const currentDate = `${current.getMonth() + 1}/${current.getFullYear()}`;

  const [type, setType] = useState("charts");

  const handleToggleChange = (e) => {
    setType(e.target.value);
  };

  return (
    <div>
      <div className={styles.title_bar}>
        <TitleBar />
      </div>
      <div className={styles["home-page"]}>
        <div className={styles["home-page__body"]}>
          <SideMenu homeState="active" viewincomeState="" viewexpenseState="" />
          <div className={styles["home-page__contents"]}>
            <section className={styles["home-page__top-section"]}>
              <div className={styles["home-page__date-section"]}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    views={["year", "month"]}
                    label="From"
                    value={fromDate}
                    minDate={dayjs().year(2018)}
                    maxDate={toDate}
                    onChange={handleFromDateOnChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    views={["year", "month"]}
                    label="To"
                    value={toDate}
                    minDate={fromDate}
                    maxDate={dayjs()}
                    onChange={handleToDateOnChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </div>
              <div className={styles["home-page__toggle-section"]}>
                <ToggleButtonGroup
                  className={styles.toggle_group}
                  color="primary"
                  value={type}
                  exclusive
                  onChange={handleToggleChange}
                >
                  <ToggleButton value="charts">Charts</ToggleButton>
                  <ToggleButton value="orders">Orders Served</ToggleButton>
                </ToggleButtonGroup>
              </div>
            </section>
            {type === "charts" ? (
              <div className={styles["home-page__charts"]}>
                <IncomeExpenseChart
                  verticalBarGraphData={verticalBarGraphData}
                  donutGraphData={donutGraphData}
                  lineOrdersGraphData={lineOrdersGraphData}
                  lineIncomeGraphData={lineIncomeGraphData}
                  tablesBarGraphData={tablesBarGraphData}
                  servingTypeGraphData={servingTypeGraphData}
                />
              </div>
            ) : (
              <div className={styles["home-page__orders-served-table"]}>
                <OrdersServedTable
                  ordersServed={ordersServedData}
                  fromDate={fromDate}
                  toDate={toDate}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
