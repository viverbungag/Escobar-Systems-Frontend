import React from 'react';
import styles from './ExpenseCategoryPage.module.scss';
import ExpenseCategoryContent from '../../../src/components/IncomeAndExpenseManagementSystem/ExpenseCategory/ExpenseCategoryContent/ExpenseCategoryContent';
import SideMenu from '../../../src/components/IncomeAndExpenseManagementSystem/Shared/SideMenu/SideMenu';

export default function ExpenseCategoryPage() {

  return (
    <div className={styles.section}>
      <SideMenu homeState="" viewincomeState="" viewexpenseState="" viewexpensecategoryState="active" />
      <div className={styles.content}>
        <ExpenseCategoryContent />
      </div>
    </div>
  )
}