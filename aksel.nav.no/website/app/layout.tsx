import { Metadata, Viewport } from "next";
import { VisualEditing } from "next-sanity";
import { draftMode } from "next/headers";
import { Theme } from "@navikt/ds-react";
import "@navikt/ds-tokens/darkside-css";
import { SanityLive } from "@/app/_sanity/live";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s - Aksel.nav.no",
    default: "Aksel.nav.no",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#00243A",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isDraftMode = (await draftMode()).isEnabled;

  return (
    <html lang="no">
      <head>
        <link
          rel="preload"
          href="https://cdn.nav.no/aksel/fonts/SourceSans3-normal.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <Theme asChild theme="light">
        <body className="aksel antialiased">
          {children}
          <SanityLive />
          {isDraftMode && <VisualEditing />}
        </body>
      </Theme>
    </html>
  );
}
