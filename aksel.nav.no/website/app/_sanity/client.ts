import { createClient } from "next-sanity";
import { readWithDraftToken } from "@/app/_sanity/token";
import { SANITY_API_VERSION, SANITY_PROJECT_ID } from "@/sanity/config";

export const client = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: "production",
  apiVersion: SANITY_API_VERSION,
  useCdn: true,
  token: readWithDraftToken,
  stega: { studioUrl: "/admin" },
});
