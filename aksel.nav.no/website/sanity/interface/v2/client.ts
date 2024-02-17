// ./sanity/lib/client.ts
import { createClient } from "@sanity/client";
import type { SanityClient } from "next-sanity";
import {
  SANITY_API_VERSION,
  SANITY_DATASET,
  SANITY_PROJECT_ID,
} from "@/sanity/config";

/**
 * Based on https://www.sanity.io/guides/nextjs-live-preview
 */
export function getClient({
  draftMode,
  token,
}: {
  draftMode: boolean;
  token: string;
}): SanityClient {
  return createClient({
    projectId: SANITY_PROJECT_ID,
    dataset: SANITY_DATASET,
    apiVersion: SANITY_API_VERSION,
    useCdn: !draftMode,
    perspective: draftMode ? "previewDrafts" : "published",
    stega: {
      enabled: draftMode ? true : false,
      studioUrl: "/admin",
    },
    token,
  });
}
