import React, { useState, useEffect } from "react";
import SideMenu from "../../../src/components/IncomeAndExpenseSystem/Shared/SideMenu/SideMenu";
import styles from "./ExpensePage.module.scss";
import ExpenseContent from "../../../src/components/IncomeAndExpenseSystem/Expense/ExpenseContent/ExpenseContent";
import TitleBar from "../../../src/components/IncomeAndExpenseSystem/Shared/TitleBar/TitleBar";
import { useRouter } from "next/router";

export default function ExpensePage() {
  const router = useRouter();

  return (
    <div>
      <div className={styles.title_bar}>
        <TitleBar />
      </div>
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
