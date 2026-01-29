"use client";

import {
  useDraftModeEnvironment,
  useIsPresentationTool,
} from "next-sanity/hooks";
import { VisualEditing } from "next-sanity/visual-editing";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
import { Button, Switch } from "@navikt/ds-react";
import styles from "./DraftOverlay.module.css";

function DraftOverlay() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const environment = useDraftModeEnvironment();
  const pathname = usePathname();
  const isPresentation = useIsPresentationTool();
  const isIFrame = typeof window !== "undefined" && window.self !== window.top;

  const [enableVisualEditing, setEnableVisualEditing] = useState(false);

  const channelRef = useRef<BroadcastChannel | null>(null);

  useEffect(() => {
    channelRef.current = new BroadcastChannel("aksel-draft-mode-channel");

    const handleMessage = () => {
      router.refresh();
    };

    channelRef.current.addEventListener("message", handleMessage);

    return () => {
      channelRef.current?.removeEventListener("message", handleMessage);
      channelRef.current?.close();
    };
  }, [router]);

  if (isPresentation) {
    return <VisualEditing />;
  }

  /**
   * Only show the disable draft mode panel when outside of Presentation Tool
   * - If in Iframe (e.g. embedded preview in Sanity Studio) we hide it
   * - If in /admin path (e.g. Sanity Studio) we hide it
   * - If not in live environment, something is loading or an error occurred, so we hide it
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
      await fetch("/api/draft-mode/disable").finally(() => {
        channelRef.current?.postMessage("draft-mode-disabled");
        router.refresh();
      });
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
