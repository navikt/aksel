import {
  initAmplitude,
  usePageView,
} from "components/website-modules/utils/amplitude";
import { useScrollToHashOnPageLoad } from "components/website-modules/utils/util";
import dynamic from "next/dynamic";
import Head from "next/head";
import { Router } from "next/router";
import { useEffect } from "react";
import { IdContext } from "../components/website-modules/utils/contexts/id-context";
import "../styles/index.css";

initAmplitude();

export const PreviewBanner = dynamic(
  () => import("components/website-modules/PreviewBanner"),
  {
    ssr: false,
  }
);

function App({
  Component,
  pageProps,
  router,
}: {
  Component: any;
  pageProps: any;
  router: Router;
}) {
  useScrollToHashOnPageLoad();
  usePageView(router, pageProps);

  useEffect(() => {
    window.location.host === "design.nav.no" &&
      window.location.replace(`http://aksel.nav.no`);
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          property="og:url"
          content={`https://aksel.nav.no${
            router.asPath.split("?")[0].split("#")[0]
          }`}
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

      <IdContext.Provider value={{ id: pageProps?.id ?? pageProps?.page?._id }}>
        <Component {...pageProps} />
      </IdContext.Provider>
    </>
  );
}

export default App;
