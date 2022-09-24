import React from 'react'
import styles from "./SaveButton.module.scss";
import { Icon } from '@iconify/react';
import plusIcon from '@iconify/icons-el/plus';

const SaveButton = ({label, onClick}) => {
  return (
    <button className={styles["save-button"]} onClick={onClick}>
      <div className ={styles["save-button__container"]}>
        <div className={styles["save-button__icon"]}>
          <Icon icon={plusIcon}/>
        </div>
        <span className={styles["save-button__label"]}>{label}</span>
      </div>
    </button>
  )
}

export default SaveButton