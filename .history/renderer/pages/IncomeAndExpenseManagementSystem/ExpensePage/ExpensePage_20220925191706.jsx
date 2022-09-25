import React from 'react';
import SideMenu from '../../../src/components/IncomeAndExpenseManagementSystem/Shared/SideMenu/SideMenu';
import styles from'./ExpensePage.module.scss';
import ExpenseContent from '../../components/Expense/ExpenseContent/ExpenseContent';

export default function ExpensePage() {
  
  return (
    <div className={styles.section}>
      <Toast />
      <SideMenu homeState="" viewincomeState="" viewexpenseState="active" viewexpensecategoryState="" />
      <div className={styles.content}>
        <ExpenseContent />
      </div>
    </div>
  )
}