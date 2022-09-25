import React from 'react';
import styles from './ExpenseCategoryPage.module.scss';
import ExpenseCategoryContent from '../../../src/components/IncomeAndExpenseSystem/ExpenseCategory/ExpenseCategoryContent/ExpenseCategoryContent';
import SideMenu from '../../../src/components/IncomeAndExpenseSystem/Shared/SideMenu/SideMenu';
import { useRouter } from "next/router";
import WindowControlBar from '../../../src/components/Shared/WindowControlBar/WindowControlBar';

export default function ExpenseCategoryPage() {

  const router = useRouter();

  const handleBackButtonOnClick = () => {
    localStorage.getItem("isAdmin") === "true"
      ? router.push("/main-admin-dashboard")
      : router.push("/main-employee-dashboard");
  }

  return (
    <div className={styles["expense-category-page"]}>
      <WindowControlBar handleBackButtonOnClick={handleBackButtonOnClick}/>
      <div className={styles.section}>
        <SideMenu
          homeState=""
          viewincomeState=""
          viewexpenseState=""
          viewexpensecategoryState="active"
        />
        <div className={styles.content}>
          <ExpenseCategoryContent />
        </div>
      </div>
    </div>
  );
}