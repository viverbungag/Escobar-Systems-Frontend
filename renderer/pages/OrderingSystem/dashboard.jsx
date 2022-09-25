import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
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
        <DashboardPage/>
      </div>
    </React.Fragment>
  );
};
console.log("yawa");

export default dashboard;
