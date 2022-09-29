import React from 'react';
import Head from 'next/head';
import TitleBar from '../../../renderer/src/components/OrderingSystem/TitleBar/TitleBar.jsx';
import DashboardPage from '../../src/components/OrderingSystem/Dashboard/DashboardPage.jsx';
// import useUser  from "../../src/components/contexts/UserContext";

function dashboard() {
  // const { employeeName } = useUser();
  return (
    <React.Fragment>
      <Head>
        <title> Home Page </title>
      </Head>
      <div>
        <TitleBar Page = "dashboard"/>
        <DashboardPage/>
      </div>
    </React.Fragment>
  );
};

export default dashboard;
