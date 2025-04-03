import "server-only";

export const SANITY_READ_TOKEN = process.env.SANITY_READ;

if (!SANITY_READ_TOKEN) {
  throw new Error("Missing SANITY_READ token");
}
