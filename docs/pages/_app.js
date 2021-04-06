import { createContext } from "react";
import Head from "next/head";
import Layout from "../components/layout/Layout";
import "../styles/theme.css";
import "../styles/globals.css";
import "../styles/prismjs.css";
import "@navikt/ds-css";

export const PagePropsContext = createContext({});

const Website = ({ Component, pageProps }) => {
  return (
    <PagePropsContext.Provider value={pageProps}>
      <Head>
        <title>NAV Designsystem</title>
        <link rel="icon" href="/favicon-32x32.png" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Code+Pro&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Layout menu={pageProps.menu}>
        <Component {...pageProps} />
      </Layout>
    </PagePropsContext.Provider>
  );
};

export default Website;
