import Link from "next/link";
import React from "react";
import styles from "./SideMenu.module.scss";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import Tooltip from "@mui/material/Tooltip";
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
    localStorage.getItem("isAdmin") === "true"
      ? router.push("/main-admin-dashboard")
      : router.push("/main-employee-dashboard");
  };

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
              <Tooltip title="View charts & orders served">
                <div
                  className={[
                    homeState && styles.sidebar_item_selected,
                    styles.sidebar_item_home,
                  ].join(" ")}
                >
                  Dashboard
                </div>
              </Tooltip>
            </Link>
          </li>
          <li>
            <div className={styles.label}>Income</div>
            <Link href="/IncomeAndExpenseSystem/IncomePage/IncomePage">
              <Tooltip title="View daily income">
                <div
                  className={[
                    viewincomeState && styles.sidebar_item_selected,
                    styles.sidebar_item,
                  ].join(" ")}
                >
                  View Gross Income
                </div>
              </Tooltip>
            </Link>
          </li>
          <li>
            <div className={styles.label}>Expense</div>
            <Link href="/IncomeAndExpenseSystem/ExpensePage/ExpensePage">
              <Tooltip title="View, edit, delete expenses & view stock in transactions">
                <div
                  className={[
                    viewexpenseState && styles["sidebar_item_selected"],
                    styles["sidebar_item"],
                  ].join(" ")}
                >
                  View Expenses
                </div>
              </Tooltip>
            </Link>
          </li>
          <li>
            <div className={styles.label}>Others</div>
            <Link href="/IncomeAndExpenseSystem/ExpenseCategoryPage/ExpenseCategoryPage">
              <Tooltip title="View, edit, delete expense categories">
                <div
                  className={[
                    viewexpensecategoryState && styles["sidebar_item_selected"],
                    styles["sidebar_item"],
                  ].join(" ")}
                >
                  Expense Categories
                </div>
              </Tooltip>
            </Link>
          </li>
        </ul>
      </div>
      <div className={styles.footer}>
        <div className={styles.current_user}>{employeeName}</div>
        <div className={styles.logout_btn_container}>
          <Tooltip title="Back to home">
            <LogoutRoundedIcon
              className={styles.logout_btn}
              onClick={handleLogout}
            />
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

export default SideMenu;
