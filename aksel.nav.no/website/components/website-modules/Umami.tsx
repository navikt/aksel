"use client";

import getConfig from "next/config";
import Script from "next/script";
import { useEffect, useState } from "react";
import { useCookies } from "./CookieProvider";

export const Umami = () => {
  const trackingId = getConfig().publicRuntimeConfig.UMAMI_TRACKING_ID;
  const [umamiTag, setUmamiTag] = useState<string | undefined>();
  const { consent } = useCookies();

  useEffect(() => {
    setUmamiTag(classifyTraffic());
  }, []);

  /* We only track with umami if optional cookies are accepted */
  if (consent !== "accepted" || !trackingId || !umamiTag) {
    return null;
  }

  return (
    <Script
      defer
      src="https://cdn.nav.no/team-researchops/sporing/sporing.js"
      data-host-url="https://umami.nav.no"
      data-website-id={trackingId}
      data-tag={umamiTag}
    />
  );
};

/**
 * Classifies the current traffic as either "organic" or "polluted"
 *
 * Organic traffic: Production traffic from real users on the main site
 * Polluted traffic: Traffic from preview environments, example pages, templates, admin pages, or non-production environments
 */
function classifyTraffic() {
  const isProdUrl = () => window.location.host === "aksel.nav.no";
  const isPreview = () => !!document.getElementById("exit-preview-id");
  const isExample = () => window.location.pathname.startsWith("/eksempler/");
  const isTemplate = () => window.location.pathname.startsWith("/templates/");
  const isAdmin = () => window.location.pathname.startsWith("/admin/");

  if (
    isProdUrl() &&
    !isPreview() &&
    !isExample() &&
    !isTemplate() &&
    !isAdmin()
  ) {
    return "organic";
  }
  return "polluted";
}
