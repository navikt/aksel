"use client";

import { useDraftModeEnvironment } from "next-sanity/hooks";
import { Theme } from "@navikt/ds-react";
import styles from "./DisableDraftMode.module.css";

function DisableDraftMode() {
  const environment = useDraftModeEnvironment();

  // Only show the disable draft mode button when outside of Presentation Tool
  if (environment === "unknown") {
    return null;
  }

  return (
    <Theme asChild theme="dark">
      <a href="/api/draft-mode/disable" className={styles.disableDraftMode}>
        Avslutt forhåndsvisning
      </a>
    </Theme>
  );
}

export { DisableDraftMode };
