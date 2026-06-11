import Fuse, { type FuseResult, type IFuseOptions } from "fuse.js";
import { fetchDsDocs } from "./fetch-ds-docs.js";
import { oneHourSeconds } from "./node-cache.js";

type SearchDoc = NonNullable<Awaited<ReturnType<typeof fetchDsDocs>>>[number];

const fuseKeys: NonNullable<IFuseOptions<SearchDoc>["keys"]> = [
  { name: "heading", weight: 100 },
  { name: "lvl2", weight: 50 },
  { name: "lvl3", weight: 30 },
  { name: "lvl4", weight: 20 },
  { name: "intro", weight: 20 },
  { name: "content", weight: 10 },
  { name: "status.tag", weight: 10 },
];

const minMatchCharLength = 3;

const fuseOptions: IFuseOptions<SearchDoc> = {
  keys: fuseKeys,
  includeScore: true,
  shouldSort: true,
  minMatchCharLength,
  ignoreLocation: true,
  includeMatches: true,
  threshold: 0.4,
  distance: 50,
  useTokenSearch: true,
  ignoreDiacritics: true,
};

/**
 * Fuse scores range from 0 (perfect match) to 1 (no match). `threshold` is used
 * for candidate generation; this stricter cutoff drops weak matches from the
 * returned set.
 */
const maxScore = 0.3;

const fuseTtlMs = oneHourSeconds * 4;
let cachedFuse: { fuse: Fuse<SearchDoc>; expiresAt: number } | null = null;

async function getFuse(): Promise<Fuse<SearchDoc> | null> {
  if (cachedFuse && cachedFuse.expiresAt > Date.now()) {
    return cachedFuse.fuse;
  }

  const docs = (await fetchDsDocs()) as SearchDoc[] | null;

  if (!docs || docs.length === 0) {
    return null;
  }

  const index = Fuse.createIndex(fuseKeys, docs);
  const fuse = new Fuse(docs, fuseOptions, index);

  cachedFuse = { fuse, expiresAt: Date.now() + fuseTtlMs };
  return fuse;
}

async function searchDocs(
  query: string,
  limit = 8,
): Promise<FuseResult<SearchDoc>[]> {
  const trimmedQuery = query.trim();

  if (trimmedQuery.length < minMatchCharLength) {
    return [];
  }

  const fuse = await getFuse();

  if (!fuse) {
    return [];
  }

  return fuse
    .search(trimmedQuery, { limit })
    .filter((result) => result.score !== undefined && result.score <= maxScore);
}

export { searchDocs };
