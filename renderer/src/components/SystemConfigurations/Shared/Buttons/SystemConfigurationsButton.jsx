import React from 'react';
import styles from "./SystemConfigurationsButton.module.scss";

const SystemConfigurationsButton = ({label, onClick}) => {
  return (
    <button className={styles["system-configurations-button"]} onClick={onClick}>
        <div className ={styles["system-configurations-button__container"]}>
            <span className={styles["system-configurations-button__label"]}>{label}</span>
        </div>
    </button>
  )
}

export default SystemConfigurationsButton