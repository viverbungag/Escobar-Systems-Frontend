import React from 'react'
import styles from "./ResetButton.module.scss";
import RestartAltIcon from '@mui/icons-material/RestartAlt';

const ResetButton = ({label, onClick}) => {
  return (
    <button className={styles["reset-button"]} onClick={onClick}>
      <div className ={styles["reset-button__container"]}>
        <div className={styles["reset-button__icon"]}>
          <RestartAltIcon />
        </div>
        <span className={styles["reset-button__label"]}>{label}</span>
      </div>
    </button>
  )
}

export default ResetButton