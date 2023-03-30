import { allArticleDocuments } from "../../sanity/config";

export const searchOptions: {
  [K in typeof allArticleDocuments[number] | "icon" | "icon_page"]: {
    display: string;
    index: number;
    hidden?: boolean;
  };
} = {
  komponent_artikkel: { display: "Komponenter", index: 0 },
  aksel_artikkel: { display: "God praksis", index: 1 },
  ds_artikkel: { display: "Grunnleggende", index: 2 },
  aksel_blogg: { display: "Blogg", index: 3 },
  icon: { display: "Ikoner", index: 4 },
  aksel_prinsipp: { display: "Prinsipper", index: 5 },
  aksel_standalone: { display: "Unike sider", index: 6, hidden: true },
  icon_page: { display: "Ikonsøk", index: 7, hidden: true },
};

export type SearchResultsT = {
  groupedHits: GroupedHitsT;
  topResults: SearchHitT[];
  hits: Record<keyof typeof searchOptions, number>;
  totalHits: number;
};

interface PageItemT {
  _type: keyof Omit<keyof typeof searchOptions, "icon">;
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
  _updatedAt: string;
}

interface IconItemT {
  _type: "icon";
  name: string;
  category: string;
  sub_category: string;
  keywords: string;
  created_at: string;
}

export interface IconPageItemT {
  _type: "icon_page";
  heading: string;
  description: string;
  keywords: string[];
}

export type FuseItemT = PageItemT | IconItemT | IconPageItemT;

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

  highlight: {
    shouldHightlight: boolean;
    description: string;
  };
};

export type GroupedHitsT = Partial<
  Record<keyof typeof searchOptions, SearchHitT[]>
>;
