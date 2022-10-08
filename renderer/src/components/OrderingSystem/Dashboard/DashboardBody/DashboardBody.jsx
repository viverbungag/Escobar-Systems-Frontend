import React, { useEffect, useState } from 'react';
import styles from './DashboardBody.module.scss';
import Clock from 'react-clock';
import DashboardTable  from './DashBoardTable/DashboardTable.jsx';
import DashBoardClock from './DashBoardClock/DashBoardClock';

const DashboardBody = ({ unavailableMenu }) => {
    return (
        <div className={styles['DashboardBody']}>
          <div className={styles['Container']}> 
            <DashBoardClock />
              <div className={styles['Txt-Container']}>
                <DashboardTable unavailableMenu={unavailableMenu}/>
              </div>
          </div>
        </div>
  )
}


export default DashboardBody

