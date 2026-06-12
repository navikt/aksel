import Fuse, { type IFuseOptions } from "fuse.js";
import { fetchDsDocs, getDocsGeneration } from "./fetch-ds-docs.js";

type SearchDoc = NonNullable<Awaited<ReturnType<typeof fetchDsDocs>>>[number];

const fuseKeys: NonNullable<IFuseOptions<SearchDoc>["keys"]> = [
  { name: "heading", weight: 100 },
  { name: "lvl2", weight: 50 },
  { name: "lvl3", weight: 30 },
  { name: "lvl4", weight: 20 },
  { name: "intro", weight: 20 },
  { name: "kategori", weight: 15 },
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
  threshold: 0.2,
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

/**
 * The Fuse index is rebuilt only when fetchDsDocs reports a new generation,
 * i.e. when its cache has actually refreshed. This keeps the index in sync with
 * the docs cache (the single source of truth) instead of running a second TTL.
 */
let cachedFuse: { fuse: Fuse<SearchDoc>; generation: number } | null = null;

async function getFuse(): Promise<Fuse<SearchDoc> | null> {
  const docs = (await fetchDsDocs()) as SearchDoc[] | null;

  if (!docs || docs.length === 0) {
    return null;
  }

  if (cachedFuse && cachedFuse.generation === getDocsGeneration()) {
    return cachedFuse.fuse;
  }

  const index = Fuse.createIndex(fuseKeys, docs);
  const fuse = new Fuse(docs, fuseOptions, index);

  cachedFuse = { fuse, generation: getDocsGeneration() };
  return fuse;
}

async function searchDocs(
  query: string,
  limit = 8,
): Promise<
  {
    name: string;
    path: string;
    category: string;
    subcategory: string;
  }[]
> {
  const trimmedQuery = query.trim();

  if (trimmedQuery.length < minMatchCharLength) {
    return [];
  }

  const fuse = await getFuse();

  if (!fuse) {
    return [];
  }

  const searchResults = fuse
    .search(trimmedQuery, { limit })
    .filter((result) => result.score !== undefined && result.score <= maxScore);

  return searchResults.map(({ item }) => ({
    name: item.heading,
    path: `/${item.slug}`,
    category: getCategory(item),
    subcategory: item.kategori,
  }));
}

function getCategory(doc: SearchDoc) {
  if (doc._type === "komponent_artikkel") {
    return "Component";
  }
  if (doc._type === "ds_artikkel") {
    return "Foundations";
  }
  if (doc._type === "templates_artikkel") {
    return "Templates and Patterns";
  }

  return "";
}

export { searchDocs };
