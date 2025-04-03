"use client";

import { useDraftModeEnvironment } from "next-sanity/hooks";
import styles from "./DraftMode.module.css";

export function DisableDraftMode() {
  const environment = useDraftModeEnvironment();

  // Only show the disable draft mode button when outside of Presentation Tool
  if (environment !== "live" && environment !== "unknown") {
    return null;
  }

  return (
    <a
      href="/api/draft-mode/disable"
      className={"dark " + styles.draftModeDisable}
    >
      Disable Draft Mode
    </a>
  );
}
