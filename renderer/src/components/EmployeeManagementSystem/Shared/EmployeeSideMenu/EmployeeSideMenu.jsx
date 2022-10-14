import Link from "next/link";
import React from "react";
import styles from "./EmployeeSideMenu.module.scss";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { useUser } from "../../../contexts/UserContext";
import { useRouter } from "next/router";
import { Tooltip } from "@mui/material";

export default function EmployeeSideMenu({
  homeState,
  viewattendanceState,
  viewaccountState,
}) {
  const { employeeName } = useUser();
  const router = useRouter();
  const handleLogout = () => {
    router.push("/main-employee-dashboard");
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
          <li className={styles.home}>
            <Link href="/EmployeeManagementSystem/HomePage/HomePage">
              <Tooltip title="Time-In & Time-Out">
                <div
                  className={[
                    homeState && styles["sidebar_item_selected"],
                    styles["sidebar_item_home"],
                  ].join(" ")}
                >
                  Dashboard
                </div>
              </Tooltip>
            </Link>
          </li>
          <li>
            <div className={styles.label}>Attendance</div>
            <Link href="/EmployeeManagementSystem/EmployeeAttendancePage/EmployeeAttendancePage">
              <Tooltip title="View my attendance history">
                <div
                  className={[
                    viewattendanceState && styles["sidebar_item_selected"],
                    styles["sidebar_item"],
                  ].join(" ")}
                >
                  My History
                </div>
              </Tooltip>
            </Link>
          </li>
          <li>
            <div className={styles.label}>Employee</div>
            <Link href="/EmployeeManagementSystem/EmployeeAccountPage/EmployeeAccountPage">
              <Tooltip title="View and edit my account">
                <div
                  className={[
                    viewaccountState && styles["sidebar_item_selected"],
                    styles["sidebar_item"],
                  ].join(" ")}
                >
                  My Account
                </div>
              </Tooltip>
            </Link>
          </li>
        </ul>
      </div>
      <div className={styles.footer}>
        <div className={styles.user_container}>
          <div className={styles.current_user}>{employeeName}</div>
          <div className={styles.current_type}>Employee</div>
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
