import { allArticleDocuments } from "../sanity/config";

export const searchOptions: {
  [K in (typeof allArticleDocuments)[number]]: {
    display: string;
    index: number;
    hidden?: boolean;
  };
} = {
  komponent_artikkel: { display: "Komponenter", index: 0 },
  aksel_artikkel: { display: "God praksis", index: 1 },
  ds_artikkel: { display: "Grunnleggende", index: 2 },
  aksel_blogg: { display: "Blogg", index: 3 },
  aksel_prinsipp: { display: "Prinsipper", index: 5 },
  aksel_standalone: { display: "Unike sider", index: 6, hidden: true },
};

export type SearchResultsT = {
  groupedHits: GroupedHitsT;
  topResults: SearchHitT[];
  hits: Record<keyof typeof searchOptions, number>;
  totalHits: number;
};

interface PageItemT {
  _type: keyof typeof searchOptions;
  heading: string;
  ingress?: string;
  intro?: string;
  slug: string;
  status?: { bilde: any; tag: string };
  tema?: string[];
  content: string[];
  lvl2?: { text: string; id: string }[];
  lvl3?: { text: string; id: string }[];
  lvl4?: { text: string; id: string }[];
}

export type FuseItemT = PageItemT;

export type FuseHitsT = {
  item: FuseItemT;
  score: number;

  /* Inlined Fuse.FuseResultMatch */
  matches: {
    indices: readonly [number, number];
    key?: string;
    refIndex?: number;
    value?: string;
  }[];
};

export type SearchHitT = {
  item: FuseItemT;
  score: number;
  anchor?: string;
  description?: string;
};

export type GroupedHitsT = Partial<
  Record<keyof typeof searchOptions, SearchHitT[]>
>;

export type SearchLogT = {
  type: string;
  query: string;
  filter: string[];
  searchedFromUrl: string;
  index?: number;
  accuracy?: string;
  topResult?: boolean;
  url?: string;
  tag?: string;
};
