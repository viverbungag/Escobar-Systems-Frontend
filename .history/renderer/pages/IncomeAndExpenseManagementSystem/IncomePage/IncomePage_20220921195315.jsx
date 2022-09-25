import React from 'react';
import IncomeTable from '../../components/Income/IncomeTable/IncomeTable';
import SideMenu from '../../components/Shared/SideMenu/SideMenu';
import styles from './IncomePage.module.scss';
import Toast from "../../components/Shared/Toast/Toast";

export default function IncomePage() {
  return (
    <div className={styles.section}>
      <Toast />
      <SideMenu homeState="" viewincomeState="active" viewexpenseState="" viewexpensecategoryState="" />
      <div className={styles.content}>
        <div className={styles.table}>
          <IncomeTable />
        </div>
      </div>
    </div>
  )
}