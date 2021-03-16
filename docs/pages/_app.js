import Head from "next/head";
import { useRouter } from "next/router";
import Layout from "../components/layout/Layout";
import "../styles/theme.css";
import "../styles/globals.css";
import "../styles/prismjs.css";
import "@navikt/ds-css";

const Website = ({ Component, pageProps }) => {
  const route = useRouter();
  return (
    <>
      <Head>
        <title>NAV Designsystem</title>
        <link rel="icon" href="/favicon-32x32.png" />
      </Head>
      <Layout route={route}>
        <Component {...pageProps} />
      </Layout>
    </>
  );
};

export default Website;
