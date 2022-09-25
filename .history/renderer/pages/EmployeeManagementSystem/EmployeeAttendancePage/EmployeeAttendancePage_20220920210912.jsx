import React from 'react';
import EmployeeSideMenu from '../../components/Shared/EmployeeSideMenu/EmployeeSideMenu';
import styles from'./EmployeeAttendancePage.module.scss';
import EmployeeAttendanceTable from '../../components/EmployeeAttendance/EmployeeAttendanceTable/EmployeeAttendanceTable';
import Toast from '../../components/Shared/Toast/Toast';

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