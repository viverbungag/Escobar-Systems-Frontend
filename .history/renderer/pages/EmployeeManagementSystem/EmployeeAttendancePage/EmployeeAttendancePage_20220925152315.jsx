import React from 'react';
import EmployeeSideMenu from '../../../src/components/EmployeeManagementSystem/Shared/EmployeeSideMenu/EmployeeSideMenu';
import styles from'./EmployeeAttendancePage.module.scss';
import EmployeeAttendanceTable from '../../../src/components/EmployeeManagementSystem/EmployeeAttendance/EmployeeAttendanceTable/EmployeeAttendanceTable';
import Toast from '../../../src/components/EmployeeManagementSystem/Shared/Toast/Toast';

export default function EmployeeAttendancePage() {
  return (
    <div className={styles.section}>
      <Toast />
      <EmployeeSideMenu homeState="" viewattendanceState="active" viewaccountState="" />
      <div className={styles.content}>
        <EmployeeAttendanceTable />
      </div>
    </div>
  )
}