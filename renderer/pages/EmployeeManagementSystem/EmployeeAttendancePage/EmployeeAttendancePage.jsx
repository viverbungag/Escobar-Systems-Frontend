import React from 'react';
import EmployeeSideMenu from '../../../src/components/EmployeeManagementSystem/Shared/EmployeeSideMenu/EmployeeSideMenu';
import styles from'./EmployeeAttendancePage.module.scss';
import EmployeeAttendanceTable from '../../../src/components/EmployeeManagementSystem/EmployeeAttendance/EmployeeAttendanceTable/EmployeeAttendanceTable';
import TitleBar from '../../../src/components/EmployeeManagementSystem/Shared/TitleBar/TitleBar';

export default function EmployeeAttendancePage() {
  return (
    <div>
      <TitleBar />
      <div className={styles.section}>
        <EmployeeSideMenu homeState="" viewattendanceState="active" viewaccountState="" />
        <div className={styles.content}>
          <EmployeeAttendanceTable />
        </div>
      </div>
    </div>
  )
}