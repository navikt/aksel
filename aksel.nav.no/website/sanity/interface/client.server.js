import { createClient } from "next-sanity";
import { clientConfig } from "../../sanity/config";

// Set up the client for fetching data in the getProps page functions
export const sanityClient = createClient({
  ...clientConfig,
  token: process.env.SANITY_PRIVATE_NO_DRAFTS,
  ignoreBrowserTokenWarning: process.env.NODE_ENV === "test",
  useCdn: true,
});

// Set up a preview client with serverless authentication for drafts
/* Should not be needed anymore after migration of preview solution */

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const noCdnClient = (token) =>
  createClient({
    ...clientConfig,
    token,
  });

// Helper function for easily switching between normal client and preview client
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getClient = () => sanityClient;
