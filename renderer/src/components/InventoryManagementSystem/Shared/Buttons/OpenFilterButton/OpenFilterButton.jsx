import React from 'react'
import styles from "./OpenFilterButton.module.scss";
import FilterAltIcon from '@mui/icons-material/FilterAlt';

const OpenFilterButton = ({label, onClick}) => {
  return (
    <button className={styles["open-filter-button"]} onClick={onClick}>
      <div className ={styles["open-filter-button__container"]}>
        <div className={styles["open-filter-button__icon"]}>
          <FilterAltIcon />
        </div>
        <span className={styles["open-filter-button__label"]}>{label}</span>
      </div>
    </button>
  )
}

export default OpenFilterButton