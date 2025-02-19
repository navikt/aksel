"use client";

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
