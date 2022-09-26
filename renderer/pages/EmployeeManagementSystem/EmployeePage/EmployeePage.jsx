import React from 'react';
import EmployeeTable from '../../../src/components/EmployeeManagementSystem/Employee/EmployeeTable/EmployeeTable';
import SideMenu from '../../../src/components/EmployeeManagementSystem/Shared/SideMenu/SideMenu';
import styles from'./EmployeePage.module.scss';
import TitleBar from '../../../src/components/EmployeeManagementSystem/Shared/TitleBar/TitleBar';

function EmployeePage() {
  return (
    <div>
      <TitleBar />
      <div className={styles.section}>
        <SideMenu homeState="" viewattendanceState="" viewemployeeState="active" viewpositionsState="" viewtypesState="" viewaccountsState="" />
        <div className={styles.content}>
          <EmployeeTable />
        </div>
      </div>
    </div>
  )
}

export default EmployeePage