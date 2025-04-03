import { defineLive } from "next-sanity";
import "server-only";
import { SANITY_READ_TOKEN } from "@/app/_sanity/tokens";
import { client } from "./client";

export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: SANITY_READ_TOKEN,
  browserToken: SANITY_READ_TOKEN,
});
