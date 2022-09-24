import React from 'react'
import styles from "./InactiveItemsButton.module.scss";
import { Icon } from '@iconify/react';
import viewFilled from '@iconify/icons-carbon/view-filled';

const InactiveItemsButton = ({label, onClick}) => {
  return (
    <div className={styles["inactive-items-button"]} onClick={onClick}>    
        <div className ={styles["inactive-items-button__container"]}>
            <div className={styles["inactive-items-button__icon"]}>
                <Icon icon={viewFilled}/>
            </div>
            <span className={styles["inactive-items-button__label"]}>{label}</span>
        </div>
    </div>
  )
}

export default InactiveItemsButton