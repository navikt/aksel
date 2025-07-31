"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { useCookieConsent } from "@/app/_ui/cookie-consent/CookieConsent.Provider";

const trackingId = process.env.UMAMI_TRACKING_ID;

type UmamiTag = "organic" | "polluted";

function Umami({ isDraftMode = false }: { isDraftMode?: boolean }) {
  const [umamiTag, setUmamiTag] = useState<UmamiTag>();
  const context = useCookieConsent();

  /**
   * Classifies the current traffic as either "organic" or "polluted"
   *
   * Organic traffic: Production traffic from real users on the main site
   * Polluted traffic: Traffic from preview environments, example pages, templates, admin pages, or non-production environments
   */
  useEffect(() => {
    if (isDraftMode) {
      setUmamiTag("polluted");
      return;
    }

    const { host, pathname } = window.location;

    const isProdUrl = host === "aksel.nav.no";

    const pollutedPaths = [
      "/eksempel/",
      "/eksempler/",
      "/templates/",
      "/admin",
    ];
    const isPollutedPath = pollutedPaths.some((path) =>
      pathname.startsWith(path),
    );

    const isOrganic = isProdUrl && !isPollutedPath;

    setUmamiTag(isOrganic ? "organic" : "polluted");
  }, [isDraftMode]);

  /* We only track with umami if optional cookies are accepted */
  if (
    !context.consentState.loaded ||
    context.consentState.state !== "accepted"
  ) {
    return null;
  }

  if (!trackingId || !umamiTag) {
    return null;
  }

  return (
    <Script
      defer
      src="https://cdn.nav.no/team-researchops/sporing/sporing.js"
      data-host-url="https://umami.nav.no"
      data-website-id={trackingId}
      data-tag={umamiTag}
      data-exclude-search="true"
    />
  );
}

export { Umami };
