import type { QueryParams } from "next-sanity";
import {
  type DefinedFetchType,
  type LivePerspective,
  defineLive,
  resolvePerspectiveFromCookies,
} from "next-sanity/live";
import { cookies, draftMode } from "next/headers";
import "server-only";
import { readWithDraftToken } from "@/app/_sanity/token";
import { client } from "./client";

const { sanityFetch: _sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: readWithDraftToken,
  browserToken: readWithDraftToken,
});

const sanityFetch: DefinedFetchType = async (options) => {
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

const sanityMarkdownFetch: DefinedFetchType = async (options) => {
  return await sanityFetch({
    ...options,
    stega: false,
    perspective: "published",
  });
};

export interface DynamicFetchOptions {
  perspective: LivePerspective;
  stega: boolean;
}

/**
 * Resolves `perspective` and `stega` outside a `'use cache'` boundary so they
 * can be forwarded as plain props to a cached fetch. Reads `draftMode()` and
 * `cookies()`, so it must be called inside a `<Suspense>` boundary (or a route
 * with a sibling `loading.tsx`) to avoid blocking the static shell.
 */
export async function getDynamicFetchOptions(): Promise<DynamicFetchOptions> {
  const { isEnabled: isDraftMode } = await draftMode();
  if (!isDraftMode) {
    return { perspective: "published", stega: false };
  }

  const jar = await cookies();
  const perspective = await resolvePerspectiveFromCookies({ cookies: jar });
  return { perspective: perspective ?? "drafts", stega: true };
}

/**
 * For fetching data inside `generateMetadata`, `generateViewport`, `sitemap.ts`,
 * `opengraph-image.tsx`, etc. Wraps `sanityFetch` in `'use cache'` and never
 * uses stega (unwanted in these contexts). Resolve `perspective` via
 * `getDynamicFetchOptions` so content-release previews still work.
 */
export async function sanityFetchMetadata<const QueryString extends string>({
  query,
  params = {},
  perspective,
}: {
  query: QueryString;
  params?: QueryParams;
  perspective: LivePerspective;
}) {
  "use cache";
  const { data } = await sanityFetch({
    query,
    params,
    perspective,
    stega: false,
  });
  return { data };
}

/**
 * For fetching route params inside `generateStaticParams` only. `stega` is never
 * wanted (data feeds route params) and `perspective` cookies aren't available at
 * build time, so both are hardcoded.
 */
export async function sanityFetchStaticParams<
  const QueryString extends string,
>({ query, params = {} }: { query: QueryString; params?: QueryParams }) {
  "use cache";
  const { data } = await sanityFetch({
    query,
    params,
    perspective: "published",
    stega: false,
  });
  return { data };
}

export { sanityFetch, sanityMarkdownFetch, SanityLive };
