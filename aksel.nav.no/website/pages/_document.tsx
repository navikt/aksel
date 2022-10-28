import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="no">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <meta name="theme-color" content="#00243A" />
      </Head>
      <body data-theme="light" className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
