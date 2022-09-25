import Link from 'next/link';
import React from 'react';
import styles from './EmployeeSideMenu.module.scss';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { useUser } from '../../Contexts/UserContext';

export default function EmployeeSideMenu({ homeState, viewattendanceState, viewaccountState }) {
    const { employeeName } = useUser();

  return (
    <div className={styles.container}>
        <div className={styles.header}>
            <div className={styles.text}>
                <div className={styles.upper}>ESCOBAR</div>
                <div className={styles.lower}>Employee Management System</div>
            </div>
        </div>
        <div className={styles.menu}>
            <ul>
                <li className={styles.home}>
                    <Link 
                    href='/HomePage/HomePage'>
                        <div className={[homeState && styles["sidebar_item_selected"], styles["sidebar_item_home"]].join(" ")}>Dashboard</div>
                    </Link>
                </li>
                <li>
                    <div className={styles.label}>Attendance</div>
                    <Link 
                    href='/EmployeeAttendancePage/EmployeeAttendancePage'>
                        <div className={[viewattendanceState && styles["sidebar_item_selected"], styles["sidebar_item"]].join(" ")}>My History</div>
                    </Link>
                </li>
                <li>
                    <div className={styles.label}>Employee</div>
                    <Link 
                    href='/EmployeeAccountPage/EmployeeAccountPage'>
                        <div className={[viewaccountState && styles["sidebar_item_selected"], styles["sidebar_item"]].join(" ")}>My Account</div>
                    </Link>
                </li>
            </ul>      
        </div>
        <div className={styles.footer}>
            <div className={styles.user_container}>
                <div className={styles.current_user}>{employeeName}</div>
                <div className={styles.current_type}>Employee</div>
            </div>
            <div className={styles.logout_btn}>
                <Link 
                href="/home"
                >
                    <LogoutRoundedIcon />
                </Link>
            </div>
        </div>
    </div>
  )
}