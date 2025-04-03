import { createClient } from "next-sanity";
import "server-only";
import { SANITY_READ_TOKEN } from "@/app/_sanity/tokens";
import { SANITY_API_VERSION, SANITY_PROJECT_ID } from "@/sanity/config";

export const client = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: "development",
  apiVersion: SANITY_API_VERSION,
  useCdn: true,
  perspective: "published",
  token: SANITY_READ_TOKEN,
  stega: { studioUrl: "/admin" },
});
