import { createClient } from "next-sanity";
import { readWithDraftToken } from "@/app/_sanity/token";
import { clientConfig } from "@/sanity/config";

export const client = createClient({
  ...clientConfig,
  useCdn: true,
  token: readWithDraftToken,
  stega: { studioUrl: "/admin" },
});
