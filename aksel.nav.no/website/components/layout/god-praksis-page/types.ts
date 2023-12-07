export type HeroNavT = {
  heroNav: {
    title: string;
    slug: string;
    hasRefs: boolean;
  }[];
};

export type GpArticleListT = {
  articles: {
    _id: string;
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

export type GpEntryPageProps = HeroNavT &
  GpInnholdstypeT &
  GpArticleListT &
  GpTemaT &
  GpChipsInnholdstypeT &
  GpChipsUndertemaT;
