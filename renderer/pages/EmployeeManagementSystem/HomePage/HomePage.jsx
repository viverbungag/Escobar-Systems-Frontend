import React, { useEffect, useState } from 'react';
import AttendanceForm from '../../../src/components/EmployeeManagementSystem/Attendance/AttendanceForm/AttendanceForm';
import EmployeeSideMenu from '../../../src/components/EmployeeManagementSystem/Shared/EmployeeSideMenu/EmployeeSideMenu';
import styles from './HomePage.module.scss';
import Clock from 'react-clock';
import 'react-clock/dist/Clock.css';
import TitleBar from '../../../src/components/EmployeeManagementSystem/Shared/TitleBar/TitleBar';

function HomePage() {
  const [datetime, setDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(
      () => setDateTime(new Date()),
      1000
    );

    return () => {
      clearInterval(interval);
    }
  }, []);

  return (
    <div>
      <TitleBar />
      <div className={styles.section}>
        <EmployeeSideMenu homeState="active" viewattendanceState="" viewaccountState="" />   
        <div className={styles.content}>
          <div className={styles.left}>
            <Clock value={datetime} renderNumbers={true} size={200} />
          </div>
          <div className={styles.right}>
            <AttendanceForm />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage