import styles from "./WindowControlBar.module.scss";
import RemoveIcon from '@mui/icons-material/Remove';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import MinimizeRoundedIcon from '@mui/icons-material/MinimizeRounded';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import React from 'react'
import { ipcRenderer } from "electron";

const exitApp = () => {
  ipcRenderer.send('close');
}

const minimizeApp = () => {
  ipcRenderer.send('minimize');
}

const WindowControlBar = ({handleBackButtonOnClick}) => {
  return (
    <div className={styles["window-control-bar"]}>
      <div className={styles["window-control-bar__contents"]}>
        <section className={styles["window-control-bar__left-section"]} onClick={handleBackButtonOnClick}>
          <ArrowBackIosNewIcon /> <span>Back to Home</span>
        </section>
        <section className={styles["window-control-bar__right-section"]}>
          <div
            className={[
              styles["window-control-bar__icon"],
              styles["window-control-bar__minimize-icon"],
            ].join(" ")}
            onClick={minimizeApp}
          >
            <MinimizeRoundedIcon />
          </div>
          <div
            className={[
              styles["window-control-bar__icon"],
              styles["window-control-bar__exit-icon"],
            ].join(" ")}
            onClick={exitApp}
          >
            <CloseRoundedIcon />
          </div>
        </section>
      </div>
    </div>
  );
}

export default WindowControlBar