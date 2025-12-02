import { allArticleDocuments } from "@/sanity/config";

const globalSearchConfig: {
  [K in (typeof allArticleDocuments)[number]]: {
    display: string;
    index: number;
    hidden?: boolean;
  };
} = {
  komponent_artikkel: { display: "Komponenter", index: 0 },
  ds_artikkel: { display: "Grunnleggende", index: 2 },
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

type SearchHitT = {
  item: Omit<SearchPageT, "intro" | "ingress">;
  description: string;
  score?: number;
  anchor?: string;
};

type SearchResultPageTypesT = keyof typeof globalSearchConfig;

export { globalSearchConfig };
export type { SearchHitT, SearchPageT, SearchResultPageTypesT };
