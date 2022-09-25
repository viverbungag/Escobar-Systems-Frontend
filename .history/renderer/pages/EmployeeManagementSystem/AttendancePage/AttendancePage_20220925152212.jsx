import React from 'react';
import SideMenu from '../../../src/components/EmployeeManagementSystem/Shared/SideMenu/SideMenu';
import styles from'./AttendancePage.module.scss';
import AttendanceTable from '../../../src/components/EmployeeManagementSystem/Attendance/AttendanceTable/AttendanceTable';
import Toast from '../../../src/components/EmployeeManagementSystem/Shared/Toast/Toast';

function AttendancePage() {
  return (
    <div className={styles.section}>
      <Toast />
      <SideMenu homeState="" viewattendanceState="active" viewemployeeState="" viewpositionsState="" viewtypesState="" viewaccountsState="" />
      <div className={styles.content}>
        <AttendanceTable />
      </div>
    </div>
  )
}

export default AttendancePage