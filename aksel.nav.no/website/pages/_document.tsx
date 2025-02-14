// This is imported to allow the Output File Tracing feature of Next.js to work correctly with the log patcher
import "next-logger";
import { Head, Html, Main, NextScript } from "next/document";
import { useEffect, useState } from "react";

export default function Document() {
  const [umamiTag, setUmamiTag] = useState<string>();

  useEffect(() => {
    const isProdUrl = () => window.location.host === "aksel.nav.no";
    const isPreview = () => !!document.getElementById("exit-preview-id");

    setUmamiTag(
      isPreview() ? "preview" : isProdUrl() ? "production" : "development",
    );
  }, []);
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
        <script
          defer
          src="https://cdn.nav.no/team-researchops/sporing/sporing.js"
          data-host-url="https://umami.nav.no"
          data-website-id="7b9fb2cd-40f4-4a30-b208-5b4dba026b57"
          data-auto-track="false"
          data-tag={umamiTag}
        ></script>
      </Head>
      <body data-theme="light" className="aksel antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
