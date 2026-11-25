import { useClient } from "sanity";
import useSWR from "swr";
import { SANITY_API_VERSION } from "../../sanity.env";
import {
  NEWSLETTER_ENTRIES_QUERY,
  type NewsletterEntriesT,
  newsletterQueryParams,
} from "./newsletter-query";

export type QueryDateRangeT = { from: Date; to: Date };

/**
 * Fetches published newsletter entries for the date range.
 *
 * Uses SWR since it's already a Studio dependency; it handles loading/error state, stale responses and caching.
 * If SWR is removed, this can be rewritten to `useEffect`
 */
export const useBuildNewsletterEntries = (
  dateRange: QueryDateRangeT | undefined,
) => {
  const client = useClient({ apiVersion: SANITY_API_VERSION });

  const params = dateRange
    ? newsletterQueryParams(dateRange.from, dateRange.to)
    : null;

  const { data, error } = useSWR(
    params && [NEWSLETTER_ENTRIES_QUERY, params],
    ([query, queryParams]) =>
      client.fetch<NewsletterEntriesT>(query, queryParams, {
        perspective: "published", // default with our api version. Maybe worth keeping in case we downgrade or it changes in future versions
      }),
    /* do not refetch on focus. it would replace the text the user is editing */
    { revalidateOnFocus: false, revalidateOnReconnect: false },
  );

  if (error) {
    return { status: "error", entries: undefined };
  }
  if (!data) {
    return { status: "loading", entries: undefined };
  }
  return { status: "ready", entries: data };
};
