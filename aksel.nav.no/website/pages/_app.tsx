import {
  initAmplitude,
  usePageView,
} from "components/website-modules/utils/amplitude";
import { useScrollToHashOnPageLoad } from "components/website-modules/utils/util";
import { Router } from "next/router";
import { useEffect } from "react";
import { IdContext } from "../components/website-modules/utils/contexts/id-context";
import "../styles/index.css";
import { BaseSEO } from "components/website-modules/SEO";

initAmplitude();

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
      <BaseSEO path={router.asPath} />

      <IdContext.Provider value={{ id: pageProps?.id ?? pageProps?.page?._id }}>
        <Component {...pageProps} />
      </IdContext.Provider>
    </>
  );
}

export default App;
