import React from 'react'
import styles from "./ModalSaveButton.module.scss";

const ModalSaveButton = ({label, onClick}) => {
  return (
    <button className={styles["modal-save-button"]} onClick={onClick}>
    <div className ={styles["modal-save-button__container"]}>
      <span className={styles["modal-save-button__label"]}>{label}</span>
    </div>
  </button>
  )
}

export default ModalSaveButton