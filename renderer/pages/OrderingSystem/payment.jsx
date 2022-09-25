import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import PaymentPage from '../../src/components/OrderingSystem/PaymentPage/PaymentPage.jsx';

function Home() {
  return (
    <React.Fragment>
      <Head>
        <title> Escobar Ordering System </title>
      </Head>
      <div>
        <PaymentPage/>
      </div>
    </React.Fragment>
  );
};

export default Home;
