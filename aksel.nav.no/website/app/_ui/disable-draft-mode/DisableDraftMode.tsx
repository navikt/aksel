"use client";

import { useDraftModeEnvironment } from "next-sanity/hooks";
import { usePathname } from "next/navigation";
import styles from "./DisableDraftMode.module.css";

function DisableDraftMode() {
  const environment = useDraftModeEnvironment();
  const pathname = usePathname();

  /**
   * Only show the disable draft mode button when outside of Presentation Tool
   * and no need to show it inside the admin panel.
   */
  if (
    (environment !== "live" && environment !== "unknown") ||
    pathname?.startsWith("/admin")
  ) {
    return null;
  }

  return (
    <a href="/api/draft-mode/disable" className={styles.disableDraftMode}>
      Avslutt forhåndsvisning
    </a>
  );
}

export { DisableDraftMode };
