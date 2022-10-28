import {
  AuthProvider,
  IdContext,
  initAmplitude,
  logPageView,
  PreviewBanner,
  useScrollToHashOnPageLoad,
} from "@/components";
import { Provider } from "@navikt/ds-react";
import Head from "next/head";
import React, { useEffect } from "react";
/* import { hotjar } from "react-hotjar"; */
import "../styles/index.css";

function App({
  Component,
  pageProps,
  router,
}: {
  Component: any;
  pageProps: any;
  router: any;
}): JSX.Element {
  useScrollToHashOnPageLoad();

  useEffect(() => {
    if (window.location.host === "design.nav.no") {
      window.location.replace(`http://aksel.nav.no`);
      return;
    }
    const t = (e) => logPageView(e);
    initAmplitude();
    router.events.on("routeChangeComplete", t);
    window.onload = () => logPageView(window.location.pathname, true);
    return () => {
      router.events.off("routeChangeComplete", t);
    };
  }, [router.events]);

  /* useEffect(() => {
    hotjar.initialize(148751, 6);
  }, []); */

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          property="og:url"
          content={`https://aksel.nav.no${router.asPath.split("?")[0]}`}
          key="ogurl"
        />
        <link rel="icon" href="/favicon.svg" sizes="any" type="image/svg+xml" />
        <link
          rel="shortcut icon"
          href="/favicon.svg"
          sizes="any"
          type="image/svg+xml"
        />
        <meta property="og:site_name" content="Aksel" key="ogsitename" />
      </Head>
      {pageProps?.preview && <PreviewBanner />}

      <Provider>
        <AuthProvider>
          <IdContext.Provider
            value={{ id: pageProps?.id ?? pageProps?.page?._id }}
          >
            <Component {...pageProps} />
          </IdContext.Provider>
        </AuthProvider>
      </Provider>
    </>
  );
}

export default App;
