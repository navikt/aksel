import Head from "next/head";
import { useRouter } from "next/router";
import Sidebar from "../components/sidebar/Sidebar";
/* import "@navikt/ds-css/baseline/index.css"; */

const Website = ({ Component, pageProps }) => {
  const route = useRouter();
  return (
    <>
      <Head>
        <title>NAV Designsystem</title>
        <link rel="icon" href="/favicon-32x32.png" />
      </Head>
      <Sidebar route={route} />
      <Component {...pageProps} />
    </>
  );
};

export default Website;
