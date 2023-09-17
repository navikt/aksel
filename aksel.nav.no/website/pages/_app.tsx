import { AppProps } from "next/app";
import { BaseSEO } from "components/website-modules/seo/BaseSEO";
import {
  initAmplitude,
  usePageView,
} from "components/website-modules/utils/amplitude";
import { useScrollToHashOnPageLoad } from "components/website-modules/utils/util";
import { useEffect } from "react";
import { IdContext } from "../components/website-modules/utils/contexts/id-context";
import "../styles/index.css";

initAmplitude();

function App({ Component, pageProps, router }: AppProps) {
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
