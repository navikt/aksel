import { Metadata, Viewport } from "next";
import { VisualEditing } from "next-sanity";
import { draftMode } from "next/headers";
import "@navikt/ds-tokens/darkside-css";
import { SanityLive } from "@/app/_sanity/live";
import { ConsentBanner } from "@/app/_ui/consent-banner/ConsentBanner";
import { DisableDraftMode } from "@/app/_ui/disable-draft-mode/DisableDraftMode";
import { ThemeProvider } from "@/app/_ui/theming/ThemeProvider";
import { Umami } from "@/app/_ui/umami/Umami";
import "./globals.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: {
    template: "%s - Aksel.nav.no",
    default: "Aksel.nav.no",
  },
  icons: {
    icon: "/favicon.svg",
  },
  alternates: {
    types: {
      "application/rss+xml": "https://aksel.nav.no/rss/produktbloggen-rss.xml",
    },
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
  const { isEnabled } = await draftMode();

  return (
    <html lang="no" suppressHydrationWarning>
      <head>
        <link
          rel="preload"
          href="https://cdn.nav.no/aksel/fonts/SourceSans3-normal.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <Umami />
        <ThemeProvider>
          <ConsentBanner />
          {children}
        </ThemeProvider>
        <SanityLive />
        {isEnabled && (
          <>
            <DisableDraftMode />
            <VisualEditing />
          </>
        )}
      </body>
    </html>
  );
}
