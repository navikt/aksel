import Head from "next/head";
import { useRouter } from "next/router";
import "@navikt/ds-css/baseline/index.css";
import Sidebar from "../components/sidebar/Sidebar";

const Website = ({ Component, pageProps }) => {
  const route = useRouter();
  console.log(route);
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
