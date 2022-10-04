import React from 'react'
import styles from './UnpaidPage.module.scss';
import Sidebar from "../Sidebar/Sidebar.jsx";
import UnpaidPageBody from './UnpaidPageBody/UnpaidPageBody';
import UnpaidOrderTab from './UnpaidOrderTab/UnpaidOrderTab';
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
