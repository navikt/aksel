import { AppProps } from "next/app";
import { useEffect } from "react";
import "@navikt/ds-tokens/darkside-css";
import { useCheckAuth } from "@/hooks/useCheckAuth";
import { useHashScroll } from "@/hooks/useHashScroll";
import { SanityDataContext } from "@/hooks/useSanityData";
import { BaseSEO } from "@/web/seo/BaseSEO";
import "../components/styles/index.css";

function App({ Component, pageProps, router }: AppProps) {
  useHashScroll();

  /* As of 01.01.25, removed until cookie compliance is implemented */
  /* useAmplitudeInit(); */

  useEffect(() => {
    window.location.host === "design.nav.no" &&
      window.location.replace(`http://aksel.nav.no`);

    /**
     * Midlertidig utkommentert for å unngå lasting av hotjar-bundle
     * Package.json: "react-hotjar": "^6.1.0",
     * Import: import { hotjar } from "react-hotjar";
     * Script: hotjar.initialize(148751, 6);
     */
  }, []);

  const useGlobalStyles =
    !router.pathname.startsWith("/templates/") &&
    !router.pathname.startsWith("/eksempler/");

  const validUser = useCheckAuth(!useGlobalStyles);

  return (
    <>
      <BaseSEO path={router.asPath} />
      <SanityDataContext.Provider
        value={{ id: pageProps?.id ?? pageProps?.page?._id, validUser }}
      >
        {useGlobalStyles ? (
          <div className="globalstyles">
            <Component {...pageProps} />
          </div>
        ) : (
          <Component {...pageProps} />
        )}
      </SanityDataContext.Provider>
    </>
  );
}

export default App;
