import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import PaymentPage from '../../src/components/OrderingSystem/PaymentPage/PaymentPage.jsx';
import TitleBar from '../../../renderer/src/components/OrderingSystem/TitleBar/TitleBar.jsx';

function payment() {
  return (
    <React.Fragment>
      <Head>
        <title> Escobar Ordering System </title>
      </Head>
      <div>
        <TitleBar Page = "payout"/>
        <PaymentPage/>
      </div>
    </React.Fragment>
  );
};

export default payment;
