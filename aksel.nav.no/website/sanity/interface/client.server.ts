import { createClient } from "next-sanity";
import { SANITY_BASE_CONFIG } from "@/sanity/config-2";

// Set up the client for fetching data in the getProps page functions
export const sanityClient = createClient({
  ...SANITY_BASE_CONFIG,
  token: process.env.SANITY_READ_NO_DRAFTS,
  ignoreBrowserTokenWarning: process.env.NODE_ENV === "test",
  useCdn: true,
});

// Set up a preview client with serverless authentication for drafts
/* Should not be needed anymore after migration of preview solution */

export const noCdnClient = (token: string) =>
  createClient({
    ...SANITY_BASE_CONFIG,
    token,
  });

export const previewDraftsClient = () =>
  sanityClient.withConfig({
    useCdn: false,
    ignoreBrowserTokenWarning: true,
    perspective: "previewDrafts",
    withCredentials: true,
  });

// Helper function for easily switching between normal client and preview client
export const getClient = () => sanityClient;
