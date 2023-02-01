import { allArticleDocuments } from "../../sanity/config";

export const options: {
  [K in typeof allArticleDocuments[number]]: { display: string; index: number };
} = {
  komponent_artikkel: { display: "Komponenter", index: 0 },
  aksel_artikkel: { display: "God praksis", index: 1 },
  ds_artikkel: { display: "Grunnleggende", index: 2 },
  aksel_blogg: { display: "Blogg", index: 3 },
  aksel_prinsipp: { display: "Prinsipper", index: 4 },
};

export type SearchResults = {
  groupedHits: GroupedHits;
  topResults: SearchHit[];
  hits: Record<keyof typeof options, number>;
  totalHits: number;
};

export type SearchHit = {
  item: {
    content: string;
    heading: string;
    ingress?: string;
    intro?: string;
    publishedAt?: string;
    slug: string;
    status?: { bilde: any; tag: string };
    tema?: string[];
    updateInfo?: { lastVerified: string };
    _createdAt: string;
    _id: string;
    _type: string;
    _updatedAt: string;
  };
  score: number;

  /* Inlined Fuse.FuseResultMatch */
  matches: {
    indices: readonly [number, number];
    key?: string;
    refIndex?: number;
    value?: string;
  }[];
};

export type GroupedHits = Partial<Record<keyof typeof options, SearchHit[]>>;
