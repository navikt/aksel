import "server-only";

export const writeToken = process.env.SANITY_WRITE;
export const readWithDraftToken = process.env.SANITY_READ;
export const readToken = process.env.SANITY_READ_NO_DRAFTS;

if (!readToken) {
  throw new Error("Missing SANITY_READ token");
}

if (!readWithDraftToken) {
  throw new Error("Missing SANITY_READ_NO_DRAFTS token");
}

if (!writeToken) {
  console.warn(
    "Warning: Missing SANITY_WRITE token. This is not a problem if you are only using the read token.",
  );
}
