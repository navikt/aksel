export type HeroNavT = {
  heroNav: {
    title: string;
    slug: string;
    hasRefs: boolean;
  }[];
};

export type GpArticleListT = {
  articles: {
    heading: string;
    ingress: string;
    undertema: string[];
    innholdstype: string | null;
    slug: string;
  }[];
};

export type GpTemaT = {
  tema: {
    title: string;
    slug: string;
    description?: string;
    undertema: { title: string; description: string }[];
  } | null;
};

export type GpInnholdstypeT = {
  innholdstype: {
    title: string;
    description?: string;
    hasRefs: boolean;
  }[];
};

export type GpChipDataT = {
  chipData: {
    title: string;
    count: number;
  }[];
};

export type GpEntryPageProps = HeroNavT &
  GpInnholdstypeT &
  GpArticleListT &
  GpTemaT &
  GpChipDataT;
