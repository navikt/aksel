import { Metadata, Viewport } from "next";
import { VisualEditing } from "next-sanity";
import { draftMode } from "next/headers";
import "@navikt/ds-tokens/darkside-css";
import { SanityLive } from "@/app/_sanity/live";
import { DisableDraftMode } from "@/app/_ui/draft-mode/DraftMode.disable";
import { ThemeProvider } from "@/app/_ui/theming/ThemeProvider";
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
        <ThemeProvider>{children}</ThemeProvider>
        <SanityLive />
        {isDraftMode && (
          <>
            <DisableDraftMode />
            <VisualEditing />
          </>
        )}
      </body>
    </html>
  );
}
