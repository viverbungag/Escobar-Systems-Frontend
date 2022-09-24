import styles from "./WindowControlBar.module.scss";
import CloseIcon from '@mui/icons-material/Close';
import RemoveIcon from '@mui/icons-material/Remove';
import React from 'react'
import { ipcRenderer } from "electron";

const exitApp = () => {
  ipcRenderer.send('close');
}

const minimizeApp = () => {
  ipcRenderer.send('minimize');
}

const WindowControlBar = () => {
  return (
    <div className = {styles["window-control-bar"]}>
    <div className = {styles["window-control-bar__container"]}>
      <div className = {[styles["window-control-bar__icon"], styles["window-control-bar__minimize-icon"]].join(" ")} onClick = {minimizeApp}>
        <RemoveIcon/>
      </div>
      <div className = {[styles["window-control-bar__icon"], styles["window-control-bar__exit-icon"]].join(" ")} onClick = {exitApp}>
        <CloseIcon/>
      </div>
    </div>
</div>
  )
}

export default WindowControlBar