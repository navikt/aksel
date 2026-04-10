import { type DefinedSanityFetchType, defineLive } from "next-sanity/live";
import "server-only";
import { readWithDraftToken } from "@/app/_sanity/token";
import { client } from "./client";

const { sanityFetch: _sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: readWithDraftToken,
  browserToken: readWithDraftToken,
});

const sanityFetch: DefinedSanityFetchType = async (options) => {
  const result = await _sanityFetch(options);

  /**
   * sanity:s1:aHJRvA is the tag added to 'catch all' queries in sanitylive.
   * If we detect this tag, it means that every query will revalidate.
   * This could lead to performance issues.
   */
  if (result.tags.includes("sanity:s1:aHJRvA")) {
    console.error(
      "[sanityFetch] Detected 'catch all' query, causing revalidation of all queries.\nThis is a serious performance issue. Please fix the query to be more specific.",
    );
  }

  return result;
};

const sanityMarkdownFetch: DefinedSanityFetchType = async (options) => {
  return await sanityFetch({
    ...options,
    stega: false,
    perspective: "published",
  });
};

export { sanityFetch, sanityMarkdownFetch, SanityLive };
