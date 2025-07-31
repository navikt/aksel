import { defineLive } from "next-sanity";
import "server-only";
import { readWithDraftToken } from "@/app/_sanity/token";
import { client } from "./client";

export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: readWithDraftToken,
  browserToken: readWithDraftToken,
});
