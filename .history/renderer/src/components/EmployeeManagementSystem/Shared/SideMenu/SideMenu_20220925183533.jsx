import Link from 'next/link';
import React from 'react';
import styles from './SideMenu.module.scss';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { useUser } from '../../Contexts/UserContext';

function SideMenu({ viewattendanceState, viewemployeeState, viewpositionsState, viewtypesState, viewaccountsState }) {
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
                <li>
                    <div className={styles.label}>Attendance</div>
                    <Link 
                    href='/pages/EmployeeManagementSystem/AttendancePage/AttendancePage'>
                        <div className={[viewattendanceState && styles["sidebar_item_selected"], styles["sidebar_item"]].join(" ")}>Table</div>
                    </Link>
                </li>
                <li>
                    <div className={styles.label}>Employee</div>
                    <Link 
                    href='/pages/EmployeeManagementSystem/EmployeePage/EmployeePage'>
                        <div className={[viewemployeeState && styles["sidebar_item_selected"], styles["sidebar_item"]].join(" ")}>Table</div>
                    </Link>
                    <Link 
                    href='/pages/EmployeeManagementSystem/PositionsPage/PositionsPage'>
                        <div className={[viewpositionsState && styles["sidebar_item_selected"], styles["sidebar_item"]].join(" ")}>Positions</div>
                    </Link>
                    <Link 
                    href='/pages/EmployeeManagementSystem/TypesPage/TypesPage'>
                        <div className={[viewtypesState && styles["sidebar_item_selected"], styles["sidebar_item"]].join(" ")}>Types</div>
                    </Link>
                    <Link 
                    href='/pages/EmployeeManagementSystem/AccountsPage/AccountsPage'>
                        <div className={[viewaccountsState && styles["sidebar_item_selected"], styles["sidebar_item"]].join(" ")}>Accounts</div>
                    </Link>
                </li>
            </ul>      
        </div>
        <div className={styles.footer}>
            <div className={styles.user_container}>
                <div className={styles.current_user}>{employeeName}</div>
                <div className={styles.current_type}>Admin</div>
            </div>
            <div className={styles.logout_btn}>
                <Link 
                href="/pages/EmployeeManagementSystem/home"
                >
                    <LogoutRoundedIcon />
                </Link>
            </div>
        </div>
    </div>
  )
}

export default SideMenu