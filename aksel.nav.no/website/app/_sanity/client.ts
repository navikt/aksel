import { createClient } from "next-sanity";
import { readWithDraftToken } from "@/app/_sanity/token";
import { SANITY_BASE_CONFIG } from "@/sanity/config-2";

export const client = createClient({
  ...SANITY_BASE_CONFIG,
  useCdn: true,
  token: readWithDraftToken,
  stega: { studioUrl: "/admin" },
});
