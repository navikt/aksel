export type HeroNavT = {
  heroNav: {
    title: string;
    slug: string;
    refs: string[];
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
    refs: string[];
  }[];
};

export type GpArticleViews = {
  views: ({
    title: string;
  } & GpArticleListT)[];
};

export type GpEntryPageProps = HeroNavT &
  GpInnholdstypeT &
  GpArticleViews &
  GpTemaT;
