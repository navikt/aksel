export type HeroNavT = {
  heroNav: {
    title: string;
    slug: string;
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
  };
};

export type GpInnholdstypeT = {
  innholdstype: {
    title: string;
    description?: string;
  }[];
};

export type GpArticleViews = {
  views: ({
    title: string;
  } & GpArticleListT)[];
};

export type GpFrontPageProps = HeroNavT & GpInnholdstypeT & GpArticleViews;

export type GpTemaPageProps = HeroNavT &
  GpTemaT &
  GpInnholdstypeT &
  GpArticleViews;
