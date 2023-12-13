export type GpArticleT = {
  _id: string;
  heading: string;
  ingress: string;
  undertema: string[];
  currentUndertema: string;
  slug: string;
  innholdstype: string | null;
  publishedAt: string | null;
};

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

export type GpChipsInnholdstypeRawT = {
  chipsInnholdstype: {
    title: string;
    slug: string;
    types: ChipsDataT;
  }[];
};

export type GpChipsInnholdstypeT = {
  chipsInnholdstype: ChipsDataT;
};

export type GpChipsUndertemaRawT = {
  chipsUndertema: {
    title: string;
    tema: string;
    count: number;
  }[];
};

export type GpChipsUndertemaT = {
  chipsUndertema: ChipsDataT;
};

export type ChipsDataT = {
  title: string;
  count: number;
}[];

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

export type GpEntryPageProps = HeroNavT & {
  tema: GpTemaT | null;
} & GpChipsInnholdstypeT &
  GpChipsUndertemaT & { initialArticles: GpGroupedArticlesT };
