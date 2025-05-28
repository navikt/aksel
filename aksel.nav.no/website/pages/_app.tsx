import { AppProps } from "next/app";
import { useEffect } from "react";
import "@navikt/ds-tokens/darkside-css";
import { useHashScroll } from "@/hooks/useHashScroll";
import { ConsentBanner } from "@/web/ConsentBanner";
import { CookieProvider } from "@/web/CookieProvider";
import { SanityDataProvider } from "@/web/SanityDataProvider";
import { Umami } from "@/web/Umami";
import { ExampleTheming } from "@/web/examples/withDsExample.theme";
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

  return (
    <ExampleTheming>
      <CookieProvider>
        <BaseSEO path={router.asPath} />
        <Umami />
        <ConsentBanner
          hide={!useGlobalStyles}
          defaultShow={pageProps.showCookieBanner}
        />
        {useGlobalStyles ? (
          <SanityDataProvider id={pageProps?.id ?? pageProps?.page?._id}>
            <div className="globalstyles">
              <Component {...pageProps} />
            </div>
          </SanityDataProvider>
        ) : (
          <Component {...pageProps} />
        )}
      </CookieProvider>
    </ExampleTheming>
  );
}

export default App;
