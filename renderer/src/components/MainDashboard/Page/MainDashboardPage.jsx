import React from 'react';
import { useRouter } from "next/router";
import styles from "./MainDashboardPage.module.scss";

const MainDashboardPage = () => {
  const router = useRouter();

  const handleInventoryManagementSystemButtonOnClick = () => {
    router.push("InventoryManagementSystem/dashboard");
  }

  const handleEmployeeManagementSystemAdminButtonOnClick = () => {
    
  }

  const handleEmployeeManagementSystemEmployeeButtonOnClick = () => {

  }

  const handleOrderingSystemButtonOnClick = () => {

  }

  const handleIncomeAndExpenseSystemButtonOnClick = () => {

  }



  return (
    <div className={styles["main-dashboard-page"]}>
      <button
        className={styles[""]}
        onClick={handleInventoryManagementSystemButtonOnClick}
      >
        {"Inventory Management System"}
      </button>
      <button
        className={styles[""]}
        onClick={handleEmployeeManagementSystemAdminButtonOnClick}
      >
        {"Employee Management System (Admin)"}
      </button>
      <button
        className={styles[""]}
        onClick={handleEmployeeManagementSystemEmployeeButtonOnClick}
      >
        {"Employee Management System (Employee)"}
      </button>
      <button
        className={styles[""]}
        onClick={handleOrderingSystemButtonOnClick}
      >
        {"Ordering System"}
      </button>
      <button
        className={styles[""]}
        onClick={handleIncomeAndExpenseSystemButtonOnClick}
      >
        {"Income and Expense System"}
      </button>
    </div>
  );
}

export default MainDashboardPage