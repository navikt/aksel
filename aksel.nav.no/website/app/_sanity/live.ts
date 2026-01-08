import { type DefinedSanityFetchType, defineLive } from "next-sanity/live";
import "server-only";
import { readWithDraftToken } from "@/app/_sanity/token";
import { client } from "./client";

export const { sanityFetch: _sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: readWithDraftToken,
  browserToken: readWithDraftToken,
});

/**
 * TODO: Remove before v8 release!!
 * We only unwrap it to override perspecitive for testing
 */
export const sanityFetch: DefinedSanityFetchType = (args) =>
  _sanityFetch({ ...args, perspective: ["rMeiw8Pi2"] });
