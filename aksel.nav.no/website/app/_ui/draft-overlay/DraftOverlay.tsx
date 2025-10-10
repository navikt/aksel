"use client";

import {
  useDraftModeEnvironment,
  useIsPresentationTool,
} from "next-sanity/hooks";
import { VisualEditing } from "next-sanity/visual-editing";
import { usePathname, useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Button, Switch } from "@navikt/ds-react";
import styles from "./DraftOverlay.module.css";
import { disableDraftModeAction } from "./actions";

function DraftOverlay() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const environment = useDraftModeEnvironment();
  const pathname = usePathname();
  const isPresentation = useIsPresentationTool();
  const isIFrame = typeof window !== "undefined" && window.self !== window.top;

  const [enableVisualEditing, setEnableVisualEditing] = useState(false);

  /**
   * Only show the disable draft mode panel when outside of Presentation Tool
   * - If in Iframe (e.g. embedded preview in Sanity Studio) we hide it
   * - If in /admin path (e.g. Sanity Studio) we hide it
   * - If not in live environment, something is loading or an error occurred, so we hide it
   */
  if (
    (environment !== "live" && environment !== "unknown") ||
    pathname?.startsWith("/admin") ||
    isIFrame ||
    isPresentation
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

export { DraftOverlay };
