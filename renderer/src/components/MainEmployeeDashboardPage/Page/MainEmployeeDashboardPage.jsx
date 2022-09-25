import React from 'react';
import { useRouter } from "next/router";
import styles from "./MainEmployeeDashboardPage.module.scss";
import InventoryIcon from '@mui/icons-material/Inventory'; // inventory
import BadgeIcon from '@mui/icons-material/Badge'; // employee (employee)
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';// employee (admin)
import PointOfSaleIcon from '@mui/icons-material/PointOfSale'; // ordering
import PaymentsIcon from '@mui/icons-material/Payments';
import LogoutIcon from "@mui/icons-material/Logout";
import Link from 'next/link';
import { useUser } from '../../contexts/UserContext';
import WindowControlBar from '../../Shared/WindowControlBar/WindowControlBar';


const MainEmployeeDashboardPage = () => {
  const router = useRouter();

  const {
    employeeName,
    accessInventoryManagementSystem,
    accessEmployeeManagementSystem,
    accessIncomeAndExpenseSystem,
    accessOrderingSystem,
  } = useUser();

  const handleInventoryManagementSystemButtonOnClick = () => {
    router.push("InventoryManagementSystem/dashboard");
  }

  const handleEmployeeAttendanceSystemButtonOnClick = () => {

  }

  const handleOrderingSystemButtonOnClick = () => {

  }

  const handleIncomeAndExpenseSystemButtonOnClick = () => {
    router.push("IncomeAndExpenseSystem/Dashboard/Dashboard");
  }



  return (
    <div className={styles["main-dashboard-page"]}>
      <WindowControlBar hideBackButton />
      <header className={styles["main-dashboard-page__header"]}>
        <h3>WELCOME</h3>
        <h2>{employeeName}</h2>
      </header>

      <div className={styles["main-dashboard-page__main-content"]}>
        {accessInventoryManagementSystem && <button
          className={styles["main-dashboard-page__card"]}
          onClick={handleInventoryManagementSystemButtonOnClick}
        >
          <InventoryIcon />
          <span>{"Inventory Management System"}</span>
        </button>}
       {accessEmployeeManagementSystem && <button
          className={styles["main-dashboard-page__card"]}
          onClick={handleEmployeeAttendanceSystemButtonOnClick}
        >
          <BadgeIcon />
          <span>{"Employee Attendance System"}</span>
        </button>}
        {accessOrderingSystem && <button
          className={styles["main-dashboard-page__card"]}
          onClick={handleOrderingSystemButtonOnClick}
        >
          <PointOfSaleIcon />
          <span>{"Ordering System"}</span>
        </button>}
        {accessIncomeAndExpenseSystem && <button
          className={styles["main-dashboard-page__card"]}
          onClick={handleIncomeAndExpenseSystemButtonOnClick}
        >
          <PaymentsIcon />
          <span>{"Income and Expense System"}</span>
        </button>}
      </div>
      <footer className={styles["main-dashboard-page__footer"]}>
        <Link href= "/home">
        <div className={styles["main-dashboard-page__logout-container"]}>
          <LogoutIcon />
          <span>Logout</span>
        </div>
        </Link>
      </footer>
    </div>
  );
}

export default MainEmployeeDashboardPage