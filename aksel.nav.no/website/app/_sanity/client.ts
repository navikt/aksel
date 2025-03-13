import { createClient } from "next-sanity";
import { SANITY_API_VERSION, SANITY_PROJECT_ID } from "@/sanity/config";

export const client = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: "development",
  apiVersion: SANITY_API_VERSION,
  useCdn: true,
  perspective: "published",
  token: process.env.SANITY_READ,
});
