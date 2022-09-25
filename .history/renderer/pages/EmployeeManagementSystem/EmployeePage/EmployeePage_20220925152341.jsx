import React from 'react';
import EmployeeTable from '../../../src/components/EmployeeManagementSystem/Employee/EmployeeTable/EmployeeTable';
import SideMenu from '../../../src/components/EmployeeManagementSystem/Shared/SideMenu/SideMenu';
import styles from'./EmployeePage.module.scss';

function EmployeePage() {
  return (
    <div className={styles.section}>
      <SideMenu homeState="" viewattendanceState="" viewemployeeState="active" viewpositionsState="" viewtypesState="" viewaccountsState="" />
      <div className={styles.content}>
        <EmployeeTable />
      </div>
    </div>
  )
}

export default EmployeePage