import React from 'react'
import styles from "./StockOutButton.module.scss";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";

const StockOutButton = ({label, onClick}) => {
  return (
    <button className={styles["stock-out-button"]} onClick={onClick}>
      <div className ={styles["stock-out-button__container"]}>
        <div className={styles["stock-out-button__icon"]}>
          <IndeterminateCheckBoxIcon />
        </div>
        <span className={styles["stock-out-button__label"]}>{label}</span>
      </div>
    </button>
  )
}

export default StockOutButton