import { createClient } from "next-sanity";
import { readWithDraftToken } from "@/app/_sanity/token";
import { clientConfig } from "@/sanity/config";

export const client = createClient({
  ...clientConfig,
  useCdn: false,
  token: readWithDraftToken,
  stega: { studioUrl: "/admin" },
  /* TODO: Remove before v8 release!! */
  /* perspective: ["rEGM2JqQ3"], */
});
