import { createClient } from "next-sanity";
import { clientConfig } from "../config";

// Set up the client for fetching data in the getProps page functions
export const sanityClient = createClient({
  ...clientConfig,
  token: process.env.SANITY_READ_NO_DRAFTS,
  ignoreBrowserTokenWarning: process.env.NODE_ENV === "test",
  useCdn: true,
});
