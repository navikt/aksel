import { VisualEditing } from "@sanity/visual-editing/next-pages-router";
import { AppProps } from "next/app";
import { Suspense, lazy, useEffect } from "react";
import { useCheckAuth } from "@/hooks/useCheckAuth";
import { useHashScroll } from "@/hooks/useHashScroll";
import { SanityDataContext } from "@/hooks/useSanityData";
import { useAmplitudeInit } from "@/logging";
import { BaseSEO } from "@/web/seo/BaseSEO";
import "../components/styles/index.css";

const PreviewProvider = lazy(() => import("@/draftmode/PreviewProvider"));

export interface SharedPageProps {
  draftMode?: boolean;
  token?: string;
  id?: string;
  page?: any;
}

function App({ Component, pageProps, router }: AppProps<SharedPageProps>) {
  const { draftMode, token } = pageProps;

  useHashScroll();
  useAmplitudeInit();

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

  return draftMode ? (
    <SanityDataContext.Provider
      value={{ id: pageProps?.id ?? pageProps?.page?._id, validUser }}
    >
      <PreviewProvider token={token}>
        <div className="globalstyles">
          <Component {...pageProps} />
        </div>
        <Suspense>
          <VisualEditing />
        </Suspense>
      </PreviewProvider>
    </SanityDataContext.Provider>
  ) : (
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
