import styles from './TitleBar.module.scss'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import MinimizeRoundedIcon from '@mui/icons-material/MinimizeRounded';

import { ipcRenderer } from "electron";

function close_app() {
    ipcRenderer.send('close');
}

function minimize_app() {
    ipcRenderer.send('minimize');
}

const TitleBar = ({Page}) => {
  return (
    <div>
      <div className={[Page === "login" && styles["container--Login"], Page === "dashboard" && styles["container--Dashboard"], Page === "payout" && styles["container--Payout"], Page === "neworder" && styles["container--Neworder"]].join(" ")}>
        <div className={[Page === "login" && styles["Text--Login"], Page === "dashboard" && styles["Text--Dashboard"], Page === "payout" && styles["Text--Payout"], Page === "neworder" && styles["Text--Neworder"]].join(" ")}>
          {/* <h1> Escobar Ordering System </h1> */}
        </div>
        <div className={styles.buttons}>
          <button id='minBtn' onClick={minimize_app} className={`${styles.button} ${styles.min_btn}`}>
            <MinimizeRoundedIcon fontSize='small'/>
          </button>
          <button id='closeBtn' onClick={close_app} className={`${styles.button} ${styles.exit_btn}`}>
            <CloseRoundedIcon fontSize='small'/>
          </button>
      </div>   
    </div>
    </div>

  );
}

export default TitleBar