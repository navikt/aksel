import { BaseSEO } from "components/website-modules/seo/BaseSEO";
import useAmplitudeInit from "components/website-modules/utils/tracking/useAmplitude";
import { useScrollToHashOnPageLoad } from "components/website-modules/utils/util";
import { AppProps } from "next/app";
import { useEffect } from "react";
import { IdContext } from "../components/website-modules/utils/contexts/id-context";
import "../styles/index.css";

function App({ Component, pageProps, router }: AppProps) {
  useScrollToHashOnPageLoad();
  useAmplitudeInit();

  useEffect(() => {
    window.location.host === "design.nav.no" &&
      window.location.replace(`http://aksel.nav.no`);

    const initHotjar = async () => {
      const { hotjar } = await import("react-hotjar");
      hotjar.initialize(148751, 6);
    };
    initHotjar();
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
