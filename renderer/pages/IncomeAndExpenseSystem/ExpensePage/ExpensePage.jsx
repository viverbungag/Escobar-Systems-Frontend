import React, { useState, useEffect } from 'react';
import SideMenu from '../../../src/components/IncomeAndExpenseSystem/Shared/SideMenu/SideMenu';
import styles from'./ExpensePage.module.scss';
import ExpenseContent from '../../../src/components/IncomeAndExpenseSystem/Expense/ExpenseContent/ExpenseContent';
import WindowControlBar from '../../../src/components/Shared/WindowControlBar/WindowControlBar';
import { useRouter } from "next/router";

export default function ExpensePage() {

  const router = useRouter();

  const handleBackButtonOnClick = () => {
    localStorage.getItem("isAdmin") === "true"
      ? router.push("/main-admin-dashboard")
      : router.push("/main-employee-dashboard");
  }
  
  return (
    <div className={styles["expense-page"]}>
      <WindowControlBar handleBackButtonOnClick={handleBackButtonOnClick}/>
      <div className={styles.section}>
        <SideMenu
          homeState=""
          viewincomeState=""
          viewexpenseState="active"
          viewexpensecategoryState=""
        />
        <div className={styles.content}>
          <ExpenseContent />
        </div>
      </div>
    </div>
  );
}