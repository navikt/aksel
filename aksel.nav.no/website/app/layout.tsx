import { Metadata, Viewport } from "next";
import "@navikt/ds-tokens/darkside-css";
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
  metadataBase: new URL("https://aksel.nav.no/"),

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
      </body>
    </html>
  );
}
