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
    slug: { current: string };
  }[];
};

export type GpTemaT = {
  tema: {
    title: string;
    slug: string;
    description?: string;
  };
};
