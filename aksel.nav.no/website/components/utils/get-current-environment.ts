"use client";

/**
 * Classifies the current traffic as either "organic" or "polluted"
 *
 * Organic traffic: Production traffic from real users on the main site
 * Polluted traffic: Traffic from preview environments, example pages, templates, admin pages, or non-production environments
 *
 * @returns {"organic" | "polluted"} Traffic classification
 */

export const classifyTraffic = () => {
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
};
