import { AppProps } from "next/app";
import { useEffect } from "react";
import { hotjar } from "react-hotjar";
import { useHashScroll } from "@/hooks/useHashScroll";
import { SanityDocIdContext } from "@/hooks/useSanityDocId";
import { useAmplitudeInit } from "@/logging";
import { BaseSEO } from "@/web/seo/BaseSEO";
import "../components/styles/index.css";

function App({ Component, pageProps, router }: AppProps) {
  useHashScroll();
  useAmplitudeInit();

  useEffect(() => {
    window.location.host === "design.nav.no" &&
      window.location.replace(`http://aksel.nav.no`);

    hotjar.initialize(148751, 6);
  }, []);

  const useGlobalStyles =
    !router.pathname.startsWith("/templates/") &&
    !router.pathname.startsWith("/eksempler/");

  return (
    <>
      <BaseSEO path={router.asPath} />
      <SanityDocIdContext.Provider
        value={{ id: pageProps?.id ?? pageProps?.page?._id }}
      >
        {useGlobalStyles ? (
          <div className="globalstyles">
            <Component {...pageProps} />
          </div>
        ) : (
          <Component {...pageProps} />
        )}
      </SanityDocIdContext.Provider>
    </>
  );
}

export default App;
