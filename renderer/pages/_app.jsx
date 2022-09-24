import React from "react";
import Head from "next/head";
import "../src/styles/global.scss";
import { UserProvider } from '../src/components/contexts/UserContext';

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
        <Component {...pageProps} />
      </UserProvider>
    </React.Fragment>
  );
}
