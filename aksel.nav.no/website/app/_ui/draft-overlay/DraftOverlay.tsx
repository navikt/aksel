"use client";

import {
  useDraftModeEnvironment,
  useIsPresentationTool,
} from "next-sanity/hooks";
import { VisualEditing } from "next-sanity/visual-editing";
import { usePathname, useRouter } from "next/navigation";
import { useState, useSyncExternalStore, useTransition } from "react";
import { Button, Switch } from "@navikt/ds-react";
import styles from "./DraftOverlay.module.css";
import { disableDraftModeAction } from "./actions";

function DraftOverlay() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const environment = useDraftModeEnvironment();
  const pathname = usePathname();
  const isPresentation = useIsPresentationTool();
  const isIFrame = useIsInIframe();

  const [enableVisualEditing, setEnableVisualEditing] = useState(false);

  if (isPresentation) {
    return null;
  }

  /**
   * Only show the disable draft mode button when outside of Presentation Tool
   * and no need to show it inside the admin panel.
   */
  if (
    (environment !== "live" && environment !== "unknown") ||
    pathname?.startsWith("/admin") ||
    isIFrame
  ) {
    return null;
  }

  const disable = () =>
    startTransition(async () => {
      await disableDraftModeAction();
      router.refresh();
    });

  return (
    <>
      <div className={styles.draftOverlay} data-color="neutral">
        <Button
          variant="tertiary-neutral"
          data-color="neutral"
          type="button"
          onClick={disable}
        >
          {pending ? "Avslutter forhåndsvisning" : "Avslutt forhåndsvisning"}
        </Button>
        <Switch
          checked={enableVisualEditing}
          onChange={(event) => setEnableVisualEditing(event.target.checked)}
        >
          Rediger innhold
        </Switch>
      </div>
      {enableVisualEditing && <VisualEditing />}
    </>
  );
}

export const useIsInIframe = () => {
  const isIframe = useSyncExternalStore(
    () => {
      return () => {};
    },
    () => {
      return typeof window !== "undefined" && window.self !== window.top;
    },
    () => false,
  );

  return isIframe;
};

export { DraftOverlay };
