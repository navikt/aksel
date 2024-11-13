import React, { useEffect } from "react";

function Header() {
  return <div id="decorator-header" />;
}

function Footer() {
  return <div id="decorator-footer" />;
}

function Content({ children }: { children: React.ReactNode }) {
  return (
    <div className="decorator-content">
      <style>
        {`.decorator-content {
          width: 100%;
          padding-block: 5rem;
          padding-inline: 2rem;
          height: 100%;
          background: repeating-linear-gradient(
            45deg,
            #eee,
            #eee 10px,
            #fff 10px,
            #fff 20px
          );`}
      </style>
      {children}
    </div>
  );
}

const MILJO_URL = "https://www.nav.no/dekoratoren";

function Env() {
  return (
    <div
      id="decorator-env"
      data-src={`${MILJO_URL}/env?context=privatperson&simple=true`}
    />
  );
}

/**
 * OBS: Dette er ikke anbefalt metode for å laste dekoratør!
 * Se `nav-dekoratoren`-dokumentasjon for riktig implementasjon
 * @see https://github.com/navikt/nav-dekoratoren
 */
function useDekorator() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `${MILJO_URL}/client.js`;
    script.async = true;
    document.body.appendChild(script);

    const styles = document.createElement("link");
    styles.href = `${MILJO_URL}/css/client.css`;
    styles.rel = "stylesheet";
    document.head.appendChild(styles);

    return () => {
      document.body.removeChild(script);
      document.head.removeChild(styles);
    };
  }, []);
}

export { Header, Content, Footer, Env, useDekorator };
