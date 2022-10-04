import React from 'react'
import styles from './UnpaidPage.module.scss';
import Sidebar from "../Sidebar/Sidebar.jsx";
import UnpaidPageBody from './UnpaidPageBody/UnpaidPageBody.jsx';
import UnpaidOrderTab from './UnpaidOrderTab/UnpaidOrderTab.jsx';
const UnpaidPage = () => {
  return (
    <div className={styles["UnpaidPage"]}>
        <Sidebar page = 'unpaid'/>
        <div className={styles["Component"]}>
        <UnpaidPageBody />
        <UnpaidOrderTab />
      </div>
    </div>
  )
}

export default UnpaidPage
