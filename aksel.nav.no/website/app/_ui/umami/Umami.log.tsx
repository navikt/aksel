"use client";

import { useEffect } from "react";
import { umamiTrack } from "@/app/_ui/umami/Umami.track";

/**
 * Sometimes we need to track that a spesific page was visited, but since Umami is client-side only, we can't use the `page.tsx` file to track it.
 */
function UmamiNotFoundPageLog() {
  useEffect(() => {
    umamiTrack("404", { url: window.location.pathname });
  }, []);

  return null;
}

export { UmamiNotFoundPageLog };
