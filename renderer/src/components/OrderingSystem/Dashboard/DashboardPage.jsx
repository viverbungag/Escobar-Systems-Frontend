import React, { useState, useEffect } from 'react';
import styles from './DashboardPage.module.scss'
import Sidebar  from '../Sidebar/Sidebar.jsx';
import DashboardBody from './DashboardBody/DashboardBody.jsx';
import Rest from '../../../rest/Rest.tsx';
import WindowControlBar from '../../Shared/WindowControlBar/WindowControlBar';
import { useRouter } from "next/router";

const INITIAL_URL = process.env.NEXT_PUBLIC_INITIAL_URL;

const DashboardPage = () => {

  const rest = new Rest();

  const router = useRouter();

  const handleBackButtonOnClick = () => {
    localStorage.getItem("isAdmin") === "true"
      ? router.push("/main-admin-dashboard")
      : router.push("/main-employee-dashboard");
  };

  const [unavailableMenu, setUnavailableMenu] = useState([])

  const handleUnavialableMenuOnLoad = (data) =>{
    setUnavailableMenu(data);
  }

  useEffect(() =>{
    rest.get(
      `${INITIAL_URL}/menu/unavailable`, handleUnavialableMenuOnLoad
    );
  },[])

  return (
        <div className={styles['Dashboard']}>
          <WindowControlBar handleBackButtonOnClick={handleBackButtonOnClick} />
          <div className={styles['Component']}>
              <Sidebar page = "dashboard"/>
          </div>

          <div className={styles['Component']}>
            <DashboardBody unavailableMenu={unavailableMenu}/>
          </div>


        </div>

  )
}

export default DashboardPage

