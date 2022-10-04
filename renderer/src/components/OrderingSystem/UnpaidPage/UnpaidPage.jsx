import React from 'react'
import styles from './UnpaidPage.module.scss';
import Sidebar from "../Sidebar/Sidebar.jsx";
const UnpaidPage = () => {
  return (
    <div className={styles["UnpaidPage"]}>
        <Sidebar page = 'unpaid'/>
        <h1> hi </h1>
    </div>
  )
}

export default UnpaidPage
