import { AppProps } from "next/app";
import Head from "next/head";
import { useLayoutEffect, useState } from "react";
import "@navikt/ds-tokens/darkside-css";
import { useCheckAuth } from "@/hooks/useCheckAuth";
import { useHashScroll } from "@/hooks/useHashScroll";
import { SanityDataContext } from "@/hooks/useSanityData";
import { BaseSEO } from "@/web/seo/BaseSEO";
import "../components/styles/index.css";
import { ConsentBanner, getStorageAcceptedTracking } from "./ConsentBanner";

function App({ Component, pageProps, router }: AppProps) {
  useHashScroll();
  const [umamiTag, setUmamiTag] = useState<string>();
  const [clientAcceptsTracking, setClientAcceptsTracking] = useState(false);

  /* As of 01.01.25, removed until cookie compliance is implemented */
  /* useAmplitudeInit(); */

  useLayoutEffect(() => {
    window.location.host === "design.nav.no" &&
      window.location.replace(`http://aksel.nav.no`);

    /**
     * Midlertidig utkommentert for å unngå lasting av hotjar-bundle
     * Package.json: "react-hotjar": "^6.1.0",
     * Import: import { hotjar } from "react-hotjar";
     * Script: hotjar.initialize(148751, 6);
     */

    /**
     ** TODO: put umami tracking in a custom hook, useUmami
     */
    const isProdUrl = () => window.location.host === "aksel.nav.no";
    const isPreview = () => !!document.getElementById("exit-preview-id");

    setUmamiTag(
      isPreview() ? "preview" : isProdUrl() ? "production" : "development",
    );

    setClientAcceptsTracking(getStorageAcceptedTracking() === "accepted");
  }, []);

  const useGlobalStyles =
    !router.pathname.startsWith("/templates/") &&
    !router.pathname.startsWith("/eksempler/");

  const validUser = useCheckAuth(!useGlobalStyles);

  return (
    <>
      <Head>
        <script
          defer
          src="https://cdn.nav.no/team-researchops/sporing/sporing.js"
          data-host-url="https://umami.nav.no"
          data-website-id="7b9fb2cd-40f4-4a30-b208-5b4dba026b57"
          data-auto-track={clientAcceptsTracking ? "true" : "false"}
          data-tag={umamiTag}
        ></script>
      </Head>
      <h1 id="acceptTracking">
        clientAcceptsTracking: {clientAcceptsTracking ? "true" : "false"}
      </h1>
      <ConsentBanner />
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
