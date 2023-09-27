import Head from "next/head";

export function BaseSEO({ path }: { path: string }) {
  return (
    <Head>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta
        property="og:url"
        content={`https://aksel.nav.no${path.split("?")[0].split("#")[0]}`}
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
  );
}
