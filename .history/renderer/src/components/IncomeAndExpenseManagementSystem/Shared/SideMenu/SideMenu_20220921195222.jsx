import Link from 'next/link';
import React from 'react';
import styles from './SideMenu.module.scss';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { useUser } from '../../contexts/UserContext';

function SideMenu({homeState, viewincomeState, viewexpenseState, viewexpensecategoryState}) {
    const { employeeName } = useUser();
  return (
    <div className={styles.container}>
        <div className={styles.header}>
            <div className={styles.text}>
                <div className={styles.upper}>ESCOBAR</div>
                <div className={styles.lower}>Income and Expense Management System</div>
            </div>
        </div>
        <div className={styles.menu}>
            <ul>
                <li className={styles.home}>
                    <Link 
                    href='/Dashboard/Dashboard'>
                        <div className={[homeState && styles.sidebar_item_selected, styles.sidebar_item_home].join(" ")}>Dashboard</div>
                    </Link>
                </li>
                <li>
                    <div className={styles.label}>Income</div>
                    <Link 
                    href='/IncomePage/IncomePage'>
                        <div className={[viewincomeState && styles.sidebar_item_selected, styles.sidebar_item].join(" ")}>Table</div>
                    </Link>
                </li>
                <li>
                    <div className={styles.label}>Expense</div>
                    <Link 
                    href='/ExpensePage/ExpensePage'>
                        <div className={[viewexpenseState && styles["sidebar_item_selected"], styles["sidebar_item"]].join(" ")}>Table</div>
                    </Link>
                    <Link 
                    href='/ExpenseCategoryPage/ExpenseCategoryPage'>
                        <div className={[viewexpensecategoryState && styles["sidebar_item_selected"], styles["sidebar_item"]].join(" ")}>Categories</div>
                    </Link>
                </li>
            </ul>      
        </div>
        <div className={styles.footer}>
            <div className={styles.current_user}>{employeeName}</div>
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

export default SideMenu