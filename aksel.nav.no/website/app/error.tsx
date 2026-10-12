"use client";

import { type ReactElement, useEffect } from "react";
import { Page } from "@navikt/ds-react/Page";
import { logger } from "@navikt/next-logger";
import GenericErrorPage from "@/app/_ui/generic-error-page";
import { SiteTracking } from "@/app/_ui/umami/SiteTracking";
import { umamiTrackWhenReady } from "@/app/_ui/umami/Umami.track";

export default function ErrorPage({
  error,
}: {
  error: Error & { digest?: string };
}): ReactElement {
  useEffect(() => {
    logger.error(error);
  }, [error]);

  useEffect(
    () =>
      umamiTrackWhenReady("client-error", { url: window.location.pathname }),
    [],
  );

  return (
    <SiteTracking>
      <Page className="vk-error">
        <GenericErrorPage />
      </Page>
    </SiteTracking>
  );
}
