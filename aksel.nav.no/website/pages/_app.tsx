import { AppProps } from "next/app";
import Head from "next/head";
import "@navikt/ds-tokens/darkside-css";
import { ExampleTheming } from "@/web/examples/withDsExample.theme";
import "./global.css";

function App({ Component, pageProps, router }: AppProps) {
  return (
    <ExampleTheming>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          property="og:url"
          content={`https://aksel.nav.no${
            router.asPath.split("?")[0].split("#")[0]
          }`}
          key="ogurl"
        />
        <link rel="icon" href="/favicon.svg" sizes="any" type="image/svg+xml" />
        <link
          rel="shortcut icon"
          href="/favicon.svg"
          sizes="any"
          type="image/svg+xml"
        />
        <meta property="og:site_name" content="Aksel" key="ogsitename" />
      </Head>
      <Component {...pageProps} />
    </ExampleTheming>
  );
}

export default App;
