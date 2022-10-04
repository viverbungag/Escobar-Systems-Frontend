import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import TitleBar from '../../../renderer/src/components/OrderingSystem/TitleBar/TitleBar.jsx';
import UnpaidPage from '../../src/components/OrderingSystem/UnpaidPage/UnpaidPage.jsx';

function unpaid() {
  return (
    <React.Fragment>
      <Head>
        <title> Escobar Ordering System </title>
      </Head>
      <div>
        <TitleBar Page = "payout"/>
        <UnpaidPage/>
      </div>
    </React.Fragment>
  );
};

export default unpaid;
