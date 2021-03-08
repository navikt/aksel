import { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Sidebar from "../components/sidebar/Sidebar";
/* import "@navikt/ds-css/baseline/index.css"; */

const Website = ({ Component, pageProps }) => {
  const route = useRouter();
  /* console.log(route); */

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    console.log(jssStyles);
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
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
