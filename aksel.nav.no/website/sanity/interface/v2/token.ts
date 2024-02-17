export const draftmodeToken = process.env.SANITY_PREVIEW_TOKEN;
export const viewerToken = process.env.SANITY_PRIVATE_NO_DRAFTS;

if (!draftmodeToken) {
  throw new Error("Missing SANITY_PREVIEW_TOKEN");
}

if (!viewerToken) {
  throw new Error("Missing SANITY_PRIVATE_NO_DRAFTS");
}

if (globalThis?.document?.body) {
  throw new Error(
    "Tried loading sanity tokens on client side. This is not allowed (and should not have been possible?!).",
  );
}
