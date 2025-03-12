"use server";

import { defineLive } from "next-sanity";
import { client } from "./client";

// set your viewer token
const token = process.env.SANITY_READ;
if (!token) {
  throw new Error("Missing SANITY_READ");
}

export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: token,
  browserToken: token,
});
