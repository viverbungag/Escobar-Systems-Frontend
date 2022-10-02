import React, { useState, useEffect } from 'react';
import IncomeExpenseChart from '../../../src/components/IncomeAndExpenseSystem/Dashboard/IncomeExpenseChart/IncomeExpenseChart';
import SideMenu from '../../../src/components/IncomeAndExpenseSystem/Shared/SideMenu/SideMenu';
import styles from './Dashboard.module.scss';
import Rest from '../../../src/rest/Rest.tsx';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField } from '@mui/material';
import dayjs from 'dayjs';
import TitleBar from '../../../src/components/IncomeAndExpenseSystem/Shared/TitleBar/TitleBar';
import { useRouter } from "next/router";

const INITIAL_URL = process.env.NEXT_PUBLIC_INITIAL_URL;

function HomePage() {

  const rest = new Rest();

  const router = useRouter();

  // const handleBackButtonOnClick = () => {
  //   localStorage.getItem("isAdmin") === "true"
  //     ? router.push("/main-admin-dashboard")
  //     : router.push("/main-employee-dashboard");
  // }

  const [fromDate, setFromDate] = useState(dayjs().date(1).subtract(4, 'month'));
  const[toDate, setToDate] = useState(dayjs().date(1));

  const handleFromDateOnChange = (newDate) => {
    setFromDate(dayjs(newDate));
  }

  const handleToDateOnChange = (newDate) => {
    setToDate(dayjs(newDate));
  }
  
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
  }
  
  const getVerticalBarGraphData = () => {
    console.log(toDate);
    // console.log(toDate.add(1, 'month').date(0))

    rest.getPost(
      `${INITIAL_URL}/expense/vertical-bar-graph`,
      {
        toDate: toDate.add(1, 'month').date(0),
        fromDate: fromDate
      },
      getVerticalBarGraphDataOnSuccess
    );
  }

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
          backgroundColor: ["#35b000", "#e10000", "rgb(255, 208, 1)"],
        },
      ],
    });
  }

  const getDonutGraphData = () => {
    rest.getPost(
      `${INITIAL_URL}/expense/donut-graph`,
      {
        toDate: toDate.add(1, 'month').date(0),
        fromDate: fromDate
      },
      getDonutGraphDataOnSuccess
    );
  }

  const [lineGraphData, setLineGraphData] = useState({
    labels: [],
    datasets: []
  })

  const getLineGraphDataOnSuccess = (data) => {
    setLineGraphData({
      labels: data.map((item) => item.donutLabel),
      datasets: [
        {
          label: "Monthly",
          data: data.map((item) => item.donutData),
          backgroundColor: ["#35b000", "#e10000", "rgb(255, 208, 1)"],
        },
      ],
    });
  }

  const getLineGraphData = () => {
    rest.getPost(
      `${INITIAL_URL}/expense/line-graph`,
      {
        toDate: toDate.add(1, 'month').date(0),
        fromDate: fromDate
      },
      getLineGraphDataOnSuccess
    );
  }

  useEffect(() =>{
    // console.log(fromDate);
    getVerticalBarGraphData();
    getDonutGraphData();
    getLineGraphData();
  }, [toDate, fromDate])

  const current = new Date();
  const currentDate = `${current.getMonth()+1}/${current.getFullYear()}`;

  return (
    <div>
      <div className={styles.title_bar}>
        <TitleBar />
      </div>
      <div className={styles["home-page"]}>
        <div className={styles["home-page__body"]}>
          <SideMenu homeState="active" viewincomeState="" viewexpenseState="" />
          <div className={styles["home-page__contents"]}>
            <section className={styles["home-page__date-section"]}>
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
            </section>
            <div className={styles.charts}>
              <IncomeExpenseChart
                verticalBarGraphData={verticalBarGraphData}
                donutGraphData={donutGraphData}
                lineGraphData={lineGraphData}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage