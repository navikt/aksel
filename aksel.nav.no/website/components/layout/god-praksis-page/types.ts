import { GpArticleT } from "@/layout/god-praksis-page/queries";

export type GpTemaT = {
  title: string;
  slug: string;
  description?: string;
  undertema: { title: string; description: string }[];
};

export type GpInnholdstypeT = {
  title: string;
  description?: string;
  hasRefs: boolean;
};

export type HeroNavT = {
  heroNav: {
    title: string;
    slug: string;
    hasRefs: boolean;
  }[];
};

export type GpGroupedArticlesT = {
  innholdstype: string | null;
  undertema: string | null;
  article: GpArticleT;
}[];

export type GpGroupedArticlesInputT = {
  initialInnholdstype?: {
    title: string;
    articles: GpArticleT[];
  }[];

  initialUndertema?: {
    title: string;
    articles: GpArticleT[];
  }[];
};

export type ChipsDataGroupedByTema = {
  [temaSlug: string]: ChipsData;
};

export type ChipsData = {
  "undertema-title": string;
  "innholdstype-title": string;
}[];

export type GpEntryPageProps = HeroNavT & {
  tema: GpTemaT | null;
} & {
  initialArticles: GpGroupedArticlesT;
} & { chipsData: ChipsData };
