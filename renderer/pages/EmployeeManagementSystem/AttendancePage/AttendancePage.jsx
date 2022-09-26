import React from 'react';
import SideMenu from '../../../src/components/EmployeeManagementSystem/Shared/SideMenu/SideMenu';
import styles from'./AttendancePage.module.scss';
import AttendanceTable from '../../../src/components/EmployeeManagementSystem/Attendance/AttendanceTable/AttendanceTable';
import TitleBar from '../../../src/components/EmployeeManagementSystem/Shared/TitleBar/TitleBar';

function AttendancePage() {
  return (
    <div>
    <TitleBar />
      <div className={styles.section}>
        <SideMenu homeState="" viewattendanceState="active" viewemployeeState="" viewpositionsState="" viewtypesState="" viewaccountsState="" />
        <div className={styles.content}>
          <AttendanceTable />
        </div>
      </div>
    </div>
  )
}

export default AttendancePage