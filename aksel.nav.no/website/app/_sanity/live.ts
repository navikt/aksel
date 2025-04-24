import { defineLive } from "next-sanity";
import "server-only";
import { client } from "./client";

const token = process.env.SANITY_READ;

if (!token) {
  throw new Error("Missing SANITY_READ");
}

export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: token,
  /* Only add after draftmode is put behind auth */
  browserToken: "invalid token",
  /* browserToken: token, */
  stega: false,
});
