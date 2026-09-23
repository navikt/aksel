import type { SchemaConfig } from "aksel-sanity-studio/schema";

const globalSearchConfig: {
  [K in (typeof SchemaConfig.allArticleDocuments)[number]]: {
    display: string;
    index: number;
    hidden?: boolean;
  };
} = {
  komponent_artikkel: { display: "Komponenter", index: 0 },
  aksel_artikkel: { display: "God praksis", index: 1 },
  ds_artikkel: { display: "Grunnleggende", index: 2 },
  templates_artikkel: { display: "Mønster og Maler", index: 3 },
  aksel_blogg: { display: "Blogg", index: 4 },
  aksel_prinsipp: { display: "Prinsipper", index: 5 },
  aksel_standalone: { display: "Annet", index: 6, hidden: true },
};

interface SearchPageT {
  _type: keyof typeof globalSearchConfig;
  heading: string;
  ingress: string | null;
  intro: string;
  slug: string;
  status: { bilde: any; tag: string } | null;
  tema: string[] | null;
  content: string[] | { text: string; id: string }[];
  lvl2: { text: string; id: string }[];
  lvl3: { text: string; id: string }[];
  lvl4: { text: string; id: string }[];
  seo?: { meta?: string };
  overrideString?: string;
}

type SearchResultPageTypesT = keyof typeof globalSearchConfig;

/* Sent to the client for every hit, keep it lean. */
type SearchHitT = {
  heading: string;
  slug: string;
  type: SearchResultPageTypesT;
  description: string;
  anchor?: string;
  sectionHeading?: string;
  statusTag?: string;
  thumbnail?: string;
};

type SearchHitGroupT = {
  type: SearchResultPageTypesT;
  /* Hits before the per-type cap. */
  total: number;
  hits: SearchHitT[];
};

type GlobalSearchResultT = {
  query: string;
  result: {
    totalHits: number;
    topResults: SearchHitT[];
    groupedHits: SearchHitGroupT[];
  };
};

const GLOBAL_SEARCH_MAX_QUERY_LENGTH = 100;

export { GLOBAL_SEARCH_MAX_QUERY_LENGTH, globalSearchConfig };
export type {
  GlobalSearchResultT,
  SearchHitGroupT,
  SearchHitT,
  SearchPageT,
  SearchResultPageTypesT,
};
