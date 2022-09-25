import React from 'react';
import IncomeTable from '../../../src/components/IncomeAndExpenseSystem/Income/IncomeTable/IncomeTable';
import SideMenu from '../../../src/components/IncomeAndExpenseSystem/Shared/SideMenu/SideMenu';
import styles from './IncomePage.module.scss';

export default function IncomePage() {
  return (
    <div className={styles.section}>
      <SideMenu homeState="" viewincomeState="active" viewexpenseState="" viewexpensecategoryState="" />
      <div className={styles.content}>
        <div className={styles.table}>
          <IncomeTable />
        </div>
      </div>
    </div>
  )
}