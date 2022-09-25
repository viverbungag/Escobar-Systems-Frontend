import React from 'react';
import IncomeTable from '../../../src/components/IncomeAndExpenseSystem/Income/IncomeTable/IncomeTable';
import SideMenu from '../../../src/components/IncomeAndExpenseSystem/Shared/SideMenu/SideMenu';
import styles from './IncomePage.module.scss';
import WindowControlBar from '../../../src/components/Shared/WindowControlBar/WindowControlBar';
import { useRouter } from "next/router";

export default function IncomePage() {

  const router = useRouter();

  const handleBackButtonOnClick = () => {
    localStorage.getItem("isAdmin") === "true"
      ? router.push("/main-admin-dashboard")
      : router.push("/main-employee-dashboard");
  }

  return (
    <div className={styles["income-page"]}>
      <WindowControlBar handleBackButtonOnClick={handleBackButtonOnClick}/>
      <div className={styles.section}>
        <SideMenu
          homeState=""
          viewincomeState="active"
          viewexpenseState=""
          viewexpensecategoryState=""
        />
        <div className={styles.content}>
          <div className={styles.table}>
            <IncomeTable />
          </div>
        </div>
      </div>
    </div>
  );
}