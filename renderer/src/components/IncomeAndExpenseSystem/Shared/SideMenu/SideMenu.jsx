import Link from "next/link";
import React from "react";
import styles from "./SideMenu.module.scss";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { useUser } from "../../../contexts/UserContext";
import { useRouter } from "next/router";

function SideMenu({
  homeState,
  viewincomeState,
  viewexpenseState,
  viewexpensecategoryState,
}) {
  const { employeeName } = useUser();
  const router = useRouter();
  const handleLogout = () => {
    router.push("/main-admin-dashboard");
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.text}>
          <div className={styles.upper}>ESCOBAR</div>
          <div className={styles.lower}>
            Income and Expense Management System
          </div>
        </div>
      </div>
      <div className={styles.menu}>
        <ul>
          <li className={styles.home}>
            <Link href="/IncomeAndExpenseSystem/Dashboard/Dashboard">
              <div
                className={[
                  homeState && styles.sidebar_item_selected,
                  styles.sidebar_item_home,
                ].join(" ")}
              >
                Dashboard
              </div>
            </Link>
          </li>
          <li>
            <div className={styles.label}>Income</div>
            <Link href="/IncomeAndExpenseSystem/IncomePage/IncomePage">
              <div
                className={[
                  viewincomeState && styles.sidebar_item_selected,
                  styles.sidebar_item,
                ].join(" ")}
              >
                Table
              </div>
            </Link>
          </li>
          <li>
            <div className={styles.label}>Expense</div>
            <Link href="/IncomeAndExpenseSystem/ExpensePage/ExpensePage">
              <div
                className={[
                  viewexpenseState && styles["sidebar_item_selected"],
                  styles["sidebar_item"],
                ].join(" ")}
              >
                Table
              </div>
            </Link>
            <Link href="/IncomeAndExpenseSystem/ExpenseCategoryPage/ExpenseCategoryPage">
              <div
                className={[
                  viewexpensecategoryState && styles["sidebar_item_selected"],
                  styles["sidebar_item"],
                ].join(" ")}
              >
                Categories
              </div>
            </Link>
          </li>
        </ul>
      </div>
      <div className={styles.footer}>
        <div className={styles.current_user}>{employeeName}</div>
        <div className={styles.logout_btn_container}>
          <LogoutRoundedIcon className={styles.logout_btn} onClick={handleLogout} />
        </div>
      </div>
    </div>
  );
}

export default SideMenu;
