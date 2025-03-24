import { VisualEditing } from "next-sanity";
import { draftMode } from "next/headers";
import { Theme } from "@navikt/ds-react";
import "@navikt/ds-tokens/darkside-css";
import { SanityLive } from "@/app/_sanity/live";
import "./globals.css";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="no">
      {/* <head>
        <meta name="theme-color" content="#00243A" />
        <link
          rel="preload"
          href="https://cdn.nav.no/aksel/fonts/SourceSans3-normal.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head> */}
      <Theme asChild theme="light">
        <body className="aksel antialiased">
          {children}
          <SanityLive />
          {(await draftMode()).isEnabled && <VisualEditing />}
        </body>
      </Theme>
    </html>
  );
}
