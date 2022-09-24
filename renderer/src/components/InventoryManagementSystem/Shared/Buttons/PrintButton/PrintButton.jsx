import React from 'react'
import styles from "./PrintButton.module.scss";
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';

const PrintButton = ({label, onClick}) => {
  return (
    <button className={styles["print-button"]} onClick={onClick}>
      <div className ={styles["print-button__container"]}>
        <div className={styles["print-button__icon"]}>
          <LocalPrintshopIcon />
        </div>
        <span className={styles["print-button__label"]}>{label}</span>
      </div>
    </button>
  )
}

export default PrintButton