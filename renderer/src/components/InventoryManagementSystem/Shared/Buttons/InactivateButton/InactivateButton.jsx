import React from 'react'
import styles from "./InactivateButton.module.scss";
import { Icon } from '@iconify/react';
import minusIcon from '@iconify/icons-el/minus';

const InactivateButton = ({label, onClick, disableCondition}) => {
  return (
    <button className={styles["inactivate-button"]} onClick={onClick} disabled={disableCondition}>
        <div className ={styles["inactivate-button__container"]}>
        <div className={styles["inactivate-button__icon"]}>
            <Icon icon={minusIcon}/>
        </div>
        <span className={styles["inactivate-button__label"]}>{label}</span>
        </div>
    </button>
  )
}

export default InactivateButton