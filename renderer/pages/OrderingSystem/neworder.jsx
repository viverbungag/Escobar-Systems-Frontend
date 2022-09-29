import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import NewOrderPage  from '../../src/components/OrderingSystem/NewOrderPage/NewOrderPage.jsx';
import TitleBar from '../../../renderer/src/components/OrderingSystem/TitleBar/TitleBar.jsx';

function neworder() {
  return (
    <React.Fragment>
      <Head>
        <title> New Order </title>
      </Head>
      <div>
        <TitleBar Page = "neworder"/>
        <NewOrderPage/>
      </div>
    </React.Fragment>
  );
};


export default neworder;

