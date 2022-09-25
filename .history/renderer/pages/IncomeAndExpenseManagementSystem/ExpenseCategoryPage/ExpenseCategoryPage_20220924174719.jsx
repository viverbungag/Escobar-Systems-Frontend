import React from 'react';
import styles from './ExpenseCategoryPage.module.scss';
import ExpenseCategoryContent from '../../components/ExpenseCategory/ExpenseCategoryContent/ExpenseCategoryContent';
import SideMenu from '../../components/Shared/SideMenu/SideMenu';
import Toast from '../../components/Shared/Toast/Toast';

export default function ExpenseCategoryPage() {

  return (
    <div className={styles.section}>
    <Toast/>
      <SideMenu homeState="" viewincomeState="" viewexpenseState="" viewexpensecategoryState="active" />
      <div className={styles.content}>
        <ExpenseCategoryContent />
      </div>
    </div>
  )
}