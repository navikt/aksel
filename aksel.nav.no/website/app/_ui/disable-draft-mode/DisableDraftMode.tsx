"use client";

import { useDraftModeEnvironment } from "next-sanity/hooks";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
import styles from "./DisableDraftMode.module.css";
import { disableDraftModeAction } from "./actions";

function DisableDraftMode() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const environment = useDraftModeEnvironment();
  const pathname = usePathname();

  /**
   * Only show the disable draft mode button when outside of Presentation Tool
   * and no need to show it inside the admin panel.
   */
  if (
    (environment !== "live" &&
      environment !== "unknown" &&
      environment !== "presentation-window") ||
    pathname?.startsWith("/admin")
  ) {
    return null;
  }

  const disable = () =>
    startTransition(async () => {
      await disableDraftModeAction();
      router.refresh();
    });

  return (
    <button type="button" onClick={disable} className={styles.disableDraftMode}>
      {pending ? "Avslutter forhåndsvisning" : "Avslutt forhåndsvisning"}
    </button>
  );
}

export { DisableDraftMode };
