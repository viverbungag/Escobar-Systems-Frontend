import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import NewOrderPage  from '../../src/components/OrderingSystem/NewOrderPage/NewOrderPage.jsx';

function neworder() {
  return (
    <React.Fragment>
      <Head>
        <title> New Order </title>
      </Head>
      <div>
        <NewOrderPage/>
      </div>
    </React.Fragment>
  );
};


export default neworder;

