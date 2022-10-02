import React from 'react';
import { useRouter } from "next/router";
import styles from "./MainAdminDashboardPage.module.scss";
import InventoryIcon from '@mui/icons-material/Inventory'; // inventory
import BadgeIcon from '@mui/icons-material/Badge'; // employee (employee)
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';// employee (admin)
import PointOfSaleIcon from '@mui/icons-material/PointOfSale'; // ordering
import PaymentsIcon from '@mui/icons-material/Payments';
import LogoutIcon from "@mui/icons-material/Logout";
import Link from 'next/link';
import { useUser } from '../../contexts/UserContext';
import WindowControlBar from '../../Shared/WindowControlBar/WindowControlBar';


const MainAdminDashboardPage = () => {
  const router = useRouter();

  const { employeeName, accessInventoryManagementSystem, accessEmployeeManagementSystem, accessIncomeAndExpenseSystem, accessOrderingSystem } = useUser();

  const handleInventoryManagementSystemButtonOnClick = () => {
    router.push("InventoryManagementSystem/dashboard");
  }

  const handleEmployeeManagementSystemButtonOnClick = () => {
    router.push("EmployeeManagementSystem/AttendancePage/AttendancePage");
  }

  const handleOrderingSystemButtonOnClick = () => {
    router.push("OrderingSystem/dashboard");
  }

  const handleIncomeAndExpenseSystemButtonOnClick = () => {
    router.push("IncomeAndExpenseSystem/Dashboard/Dashboard");
  }



  return (
    <div>
      <WindowControlBar hideBackButton />
      <div className={styles["main-dashboard-page"]}>
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
            onClick={handleEmployeeManagementSystemButtonOnClick}
          >
            <AdminPanelSettingsIcon />
            <span>{"Employee Management System"}</span>
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
          <div className={styles["main-dashboard-page__info"]}>
            <div className={styles["main-dashboard-page__top-text"]}>
              Escobar
            </div>
            <div className={styles["main-dashboard-page__bottom-text"]}>
              Admin Dashboard
            </div>
          </div>
          <Link href= "/home">
          <div className={styles["main-dashboard-page__logout-container"]}>
            <LogoutIcon />
            <span>Logout</span>
          </div>
          </Link>
        </footer>
      </div>
    </div>
  );
}

export default MainAdminDashboardPage