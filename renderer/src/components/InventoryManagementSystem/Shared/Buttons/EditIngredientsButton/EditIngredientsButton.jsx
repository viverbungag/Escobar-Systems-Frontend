import React from 'react'
import styles from "./EditIngredientsButton.module.scss";
import { Icon } from '@iconify/react';
import editIcon from "@iconify/icons-akar-icons/edit";

const EditIngredientsButton = ({label, onClick}) => {
  return (
    <button className={styles["edit-ingredients-button"]} onClick={onClick}>
      <div className ={styles["edit-ingredients-button__container"]}>
        <div className={styles["edit-ingredients-button__icon"]}>
          <Icon icon={editIcon}/>
        </div>
        <span className={styles["edit-ingredients-button__label"]}>{label}</span>
      </div>
    </button>
  )
}

export default EditIngredientsButton