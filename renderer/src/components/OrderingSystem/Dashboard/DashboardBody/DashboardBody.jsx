import React, { useEffect, useState } from 'react';
import styles from './DashboardBody.module.scss';
import Clock from 'react-clock';
import 'react-clock/dist/Clock.css';
import DashboardTable  from './DashBoardTable/DashboardTable.jsx';

const DashboardBody = ({ unavailableMenu }) => {
  // console.log(unavailableMenu);
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
        <div className={styles['DashboardBody']}>
          <div className={styles['Container']}> 
            <Clock value={value} renderNumbers="true" size="350" className={styles['Clock--Container']}/>
              <div className={styles['Txt-Container']}>
                <DashboardTable unavailableMenu={unavailableMenu}/>
              </div>
          </div>
        </div>
  )
}


export default DashboardBody

