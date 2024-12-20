import { AppProps } from "next/app";
import NextLink from "next/link";
import { useEffect } from "react";
import { Button, Link, Modal } from "@navikt/ds-react";
import { useCheckAuth } from "@/hooks/useCheckAuth";
import { useHashScroll } from "@/hooks/useHashScroll";
import { SanityDataContext } from "@/hooks/useSanityData";
import { useAmplitudeInit } from "@/logging";
import { BaseSEO } from "@/web/seo/BaseSEO";
import "../components/styles/index.css";

function App({ Component, pageProps, router }: AppProps) {
  useHashScroll();
  const { promptForConsent, allowCookies, rejectCookies } = useAmplitudeInit();

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
      <Modal
        header={{
          heading: "Informasjonskapsler",
          closeButton: false /* Consider */,
        }}
        onCancel={(event) => event.preventDefault()} // Consider
        size="small"
        open={
          promptForConsent && !router.asPath.endsWith("/personvernerklaering")
        }
        onClose={() => promptForConsent && rejectCookies()} // Consider
      >
        <Modal.Body>
          Kan vi få lov til å lagre informasjonskapsler (cookies) i din
          nettleser slik at vi kan samle inn informasjon om hvordan du bruker
          nettstedet?{" "}
          <Link as={NextLink} target="_blank" href="/side/personvernerklaering">
            Les mer om hvordan vi bruker informasjonskapsler.
          </Link>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={allowCookies}>Godta</Button>
          <Button onClick={rejectCookies}>Avvis</Button>
        </Modal.Footer>
      </Modal>
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
