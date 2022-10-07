import React, { useState, useEffect } from 'react';
import 'react-clock/dist/Clock.css';
import Clock from 'react-clock';
import styles from "./DashBoardClock.module.scss"


const DashBoardClock = () => {

    const [value, setValue] = useState(new Date());
  
    useEffect(() => {
      const interval = setInterval(
        () => setValue(new Date()),
          1000
      );
    
      return () => {
        clearInterval(interval);
      }
    }, []);

  return (
    <Clock value={value} renderNumbers={true} size={350} className={styles['dashboard-clock']}/>
  )
}

export default DashBoardClock