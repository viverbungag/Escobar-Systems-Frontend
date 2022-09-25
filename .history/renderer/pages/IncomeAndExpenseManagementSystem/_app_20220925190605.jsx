import React from "react";
import Head from "next/head";
import '../styles/globals.css';
import TitleBar from "../../src/components/IncomeAndExpenseManagementSystem/Shared/TitleBar/TitleBar";
import styles from './_app.module.scss';
import { UserProvider } from "../../src/components/contexts/UserContext";
import Toast from '../../src/components/IncomeAndExpenseManagementSystem/Shared/Toast/Toast';

export default function (props) {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <UserProvider>
        <div className={styles.container}>
          <div className={styles.title_bar}>
            <TitleBar />
          </div>
          <div className={styles.content}>
            <Toast />
            <Component {...pageProps} />
          </div>
        </div>
      </UserProvider>
    </React.Fragment>
  );
}
