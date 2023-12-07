// This is imported to allow the Output File Tracing feature of Next.js to work correctly with the log patcher
import "next-logger";
import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="no">
      <Head>
        <meta name="theme-color" content="#00243A" />
        <link
          rel="preload"
          href="https://cdn.nav.no/aksel/fonts/SourceSans3-normal.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </Head>
      <body data-theme="light" className="aksel antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
