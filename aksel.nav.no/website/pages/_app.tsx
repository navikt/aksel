import { AppProps } from "next/app";
import { useEffect } from "react";
import "@navikt/ds-tokens/darkside-css";
import { useCheckAuth } from "@/hooks/useCheckAuth";
import { useHashScroll } from "@/hooks/useHashScroll";
import { SanityDataContext } from "@/hooks/useSanityData";
import { ConsentBanner } from "@/web/ConsentBanner";
import { CookieProvider } from "@/web/CookieProvider";
import { Umami } from "@/web/Umami";
import { BaseSEO } from "@/web/seo/BaseSEO";
import "../components/styles/index.css";

function App({ Component, pageProps, router }: AppProps) {
  useHashScroll();

  useEffect(() => {
    window.location.host === "design.nav.no" &&
      window.location.replace(`http://aksel.nav.no`);
  }, []);

  const useGlobalStyles =
    !router.pathname.startsWith("/templates/") &&
    !router.pathname.startsWith("/eksempler/");

  const validUser = useCheckAuth(!useGlobalStyles);

  return (
    <CookieProvider>
      <SanityDataContext.Provider
        value={{ id: pageProps?.id ?? pageProps?.page?._id, validUser }}
      >
        <BaseSEO path={router.asPath} />
        <Umami />
        <ConsentBanner
          hide={!useGlobalStyles}
          defaultShow={pageProps.showCookieBanner}
        />
        {useGlobalStyles ? (
          <div className="globalstyles">
            <Component {...pageProps} />
          </div>
        ) : (
          <Component {...pageProps} />
        )}
      </SanityDataContext.Provider>
    </CookieProvider>
  );
}

export default App;
