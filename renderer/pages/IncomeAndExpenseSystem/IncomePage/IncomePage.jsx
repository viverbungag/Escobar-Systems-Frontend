import React from 'react';
import IncomeTable from '../../../src/components/IncomeAndExpenseSystem/Income/IncomeTable/IncomeTable';
import SideMenu from '../../../src/components/IncomeAndExpenseSystem/Shared/SideMenu/SideMenu';
import styles from './IncomePage.module.scss';
import TitleBar from '../../../src/components/IncomeAndExpenseSystem/Shared/TitleBar/TitleBar';
import { useRouter } from "next/router";

export default function IncomePage() {

  const router = useRouter();

  const handleBackButtonOnClick = () => {
    localStorage.getItem("isAdmin") === "true"
      ? router.push("/main-admin-dashboard")
      : router.push("/main-employee-dashboard");
  }

  return (
    <div>
      <div className={styles.title_bar}>
        <TitleBar />
      </div>
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