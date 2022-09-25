import React, { useState, useEffect } from 'react';
import SideMenu from '../../../src/components/IncomeAndExpenseSystem/Shared/SideMenu/SideMenu';
import styles from'./ExpensePage.module.scss';
import ExpenseContent from '../../../src/components/IncomeAndExpenseSystem/Expense/ExpenseContent/ExpenseContent';

export default function ExpensePage() {
  
  return (
    <div className={styles.section}>
      <SideMenu homeState="" viewincomeState="" viewexpenseState="active" viewexpensecategoryState="" />
      <div className={styles.content}>
        <ExpenseContent />
      </div>
    </div>
  )
}