import React from 'react';
import styles from "./SimpleButton.module.scss";

const SimpleButton = ({label, onClick}) => {
  return (
    <button className={styles["simple-button"]} onClick={onClick}>
        <div className ={styles["simple-button__container"]}>
            <span className={styles["simple-button__label"]}>{label}</span>
        </div>
    </button>
  )
}

export default SimpleButton