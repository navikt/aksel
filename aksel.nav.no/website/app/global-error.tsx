"use client";

import { type ReactElement, useEffect } from "react";
import { Page } from "@navikt/ds-react/Page";
import { logger } from "@navikt/next-logger";
import GenericErrorPage from "@/app/_ui/generic-error-page";
import "./globals.css";

/**
 * Replaces the root layout when it throws, so it must render its own <html> and <body>.
 * Avoids ThemeProvider/tracking providers, since those may be what failed.
 */
export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}): ReactElement {
  useEffect(() => {
    logger.error(error);
  }, [error]);

  return (
    <html lang="no">
      <body>
        <title>Noe gikk galt - Aksel.nav.no</title>

        <Page className="vk-error">
          <GenericErrorPage />
        </Page>
      </body>
    </html>
  );
}
