/* eslint-disable no-undef */
// lib/sanity.server.js
import { createClient } from "next-sanity";
import { config } from "./config";

// Set up the client for fetching data in the getProps page functions
export const sanityClient = createClient({
  ...config,
  token: process.env.SANITY_PRIVATE_NO_DRAFTS,
  ignoreBrowserTokenWarning: process.env.NODE_ENV === "test",
});

// Set up a preview client with serverless authentication for drafts
/* Should not be needed anymore after migration of preview solution */
export const previewClient = createClient({
  ...config,
  token: process.env.SANITY_PREVIEW_TOKEN,
  ignoreBrowserTokenWarning: process.env.NODE_ENV === "test",
});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const noCdnClient = (token) =>
  createClient({
    ...config,
    token,
  });

// Helper function for easily switching between normal client and preview client
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getClient = () => sanityClient;
