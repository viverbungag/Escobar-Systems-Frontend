import React from 'react';
import Head from 'next/head';
import LoginPage from './LoginPage/LoginPage.jsx';
import styles from './home.module.scss';

export default function Home() {
  return (
    <React.Fragment>
      <Head>
        <title>Employee Management System</title>
      </Head>
      <div className={styles.content}>
        <LoginPage />
      </div>
    </React.Fragment>
  );
};

