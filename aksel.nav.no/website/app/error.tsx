"use client";

import { ReactElement, useEffect } from "react";
import { Page } from "@navikt/ds-react/Page";
import { logger } from "@navikt/next-logger";
import GenericErrorPage from "@/app/_ui/generic-error-page";
import { umamiTrack } from "@/app/_ui/umami/Umami.track";

export default function ErrorPage({
  error,
}: {
  error: Error & { digest?: string };
}): ReactElement {
  useEffect(() => {
    logger.error(error);
  }, [error]);

  useEffect(() => {
    umamiTrack("client-error", { url: window.location.pathname });
  }, []);

  return (
    <Page className="vk-error">
      <GenericErrorPage />
    </Page>
  );
}
