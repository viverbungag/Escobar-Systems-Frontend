import Link from "next/link";
import React from "react";
import styles from "./SideMenu.module.scss";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { useUser } from "../../../contexts/UserContext";
import { useRouter } from "next/router";
import { Tooltip } from "@mui/material";

function SideMenu({
  homeState,
  viewattendanceState,
  viewemployeeState,
  viewpositionsState,
  viewtypesState,
  viewaccountsState,
}) {
  const { employeeName } = useUser();
  const router = useRouter();
  const handleLogout = () => {
    router.push("/main-admin-dashboard");
  };

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
            <Link href="/EmployeeManagementSystem/AttendancePage/AttendancePage">
              <Tooltip title="View attendance">
                <div
                  className={[
                    viewattendanceState && styles["sidebar_item_selected"],
                    styles["sidebar_item"],
                  ].join(" ")}
                >
                  View Attendance
                </div>
              </Tooltip>
            </Link>
          </li>
          <li>
            <div className={styles.label}>Employee</div>
            <Link href="/EmployeeManagementSystem/EmployeePage/EmployeePage">
              <Tooltip title="View, edit, delete employees">
                <div
                  className={[
                    viewemployeeState && styles["sidebar_item_selected"],
                    styles["sidebar_item"],
                  ].join(" ")}
                >
                  View Employees
                </div>
              </Tooltip>
            </Link>
          </li>
          <li>
            <div className={styles.label}>Others</div>
            <Link href="/EmployeeManagementSystem/PositionsPage/PositionsPage">
              <Tooltip title="View, edit, delete employee positions">
                <div
                  className={[
                    viewpositionsState && styles["sidebar_item_selected"],
                    styles["sidebar_item"],
                  ].join(" ")}
                >
                  Employee Positions
                </div>
              </Tooltip>
            </Link>
            <Link href="/EmployeeManagementSystem/TypesPage/TypesPage">
              <Tooltip title="View, edit, delete employee types">
                <div
                  className={[
                    viewtypesState && styles["sidebar_item_selected"],
                    styles["sidebar_item"],
                  ].join(" ")}
                >
                  Employee Types
                </div>
              </Tooltip>
            </Link>
            <Link href="/EmployeeManagementSystem/AccountsPage/AccountsPage">
              <Tooltip title="View, edit, delete accounts">
                <div
                  className={[
                    viewaccountsState && styles["sidebar_item_selected"],
                    styles["sidebar_item"],
                  ].join(" ")}
                >
                  Accounts
                </div>
              </Tooltip>
            </Link>
          </li>
        </ul>
      </div>
      <div className={styles.footer}>
        <div className={styles.user_container}>
          <div className={styles.current_user}>{employeeName}</div>
          <div className={styles.current_type}>Admin</div>
        </div>
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
