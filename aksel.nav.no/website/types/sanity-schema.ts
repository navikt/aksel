import {
  bloggKategorier,
  grunnleggendeKategorier,
  komponentKategorier,
} from "../sanity/config";

export type ResolveSlugT<T> = Omit<T, "slug"> & {
  slug: string;
};

export type ResolveContributorsT<T> = Omit<T, "contributors"> & {
  contributors: { title: string }[];
};

export type ResolveContributorsSingleT<T> = Omit<T, "contributors"> & {
  contributor: { title: string };
};

export type ResolveTemaT<T> = Omit<T, "tema"> & {
  tema: string[];
};

export type ResolveRelatedArticlesT<T> = Omit<T, "relevante_artikler"> & {
  relevante_artikler?: Array<
    ResolveContributorsSingleT<
      ResolveSlugT<
        ResolveTemaT<
          | AkselBloggDocT
          | AkselGodPraksisDocT
          | AkselKomponentDocT
          | AkselGrunnleggendeDocT
        >
      >
    >
  >;
};

type DocumentT<T> = {
  _createdAt: string;
  _updatedAt: string;
  _id: string;
  _rev?: string;
  _type: T;
};

type ArrayObjectT<T> = T & {
  _key: string;
};

type ArticleT = {
  publishedAt?: string;
  heading: string;
  slug: {
    current: string;
  };
  contributors: {
    _ref: string;
  }[];
  ingress: string;
  content: any[];
  seo?: {
    meta?: string;
    image?: any;
  };
};

export interface AkselStandaloneDocT
  extends DocumentT<"aksel_standalone">,
    Omit<ArticleT, "ingress" | "contributors" | "seo"> {}

export interface AkselBloggFrontpageT extends DocumentT<"blogg_landingsside"> {
  intro: any[];
  seo?: ArticleT["seo"];
}

export interface AkselBloggDocT extends DocumentT<"aksel_blogg">, ArticleT {
  kategori: (typeof bloggKategorier)[number]["value"];
}

export interface AkselGodPraksisDocT
  extends DocumentT<"aksel_artikkel">,
    ArticleT {
  tema: { _ref: string }[];
  updateInfo?: {
    lastVerified?: string;
  };
  relevante_artikler?: { _ref: string }[];
}

export interface AkselPrinsippDocT
  extends DocumentT<"aksel_prinsipp">,
    ArticleT {
  hero_bilde: any;
  prinsipp: { prinsippvalg: string; hovedside: boolean };
}

export interface AkselKomponentDocT
  extends DocumentT<"komponent_artikkel">,
    ArticleT {
  kategori: (typeof komponentKategorier)[number]["value"];
  status: {
    tag?: "beta" | "new" | "ready" | "deprecated";
    unsafe?: boolean;
    internal?: boolean;
    bilde?: any;
  };
  intro: {
    body?: any[];
    brukes_til: string[];
    brukes_ikke_til?: string[];
  };
  content: any[];
  kodepakker?: string[];
  figma_link?: string;
  updateInfo?: {
    lastVerified?: string;
  };
}

export interface AkselGrunnleggendeDocT
  extends DocumentT<"ds_artikkel">,
    ArticleT {
  kategori: (typeof grunnleggendeKategorier)[number]["value"];
  status: {
    tag?: "beta" | "new" | "ready" | "deprecated";
    unsafe?: boolean;
    bilde?: any;
  };
  intro: {
    body?: any[];
    brukes_til: string[];
    brukes_ikke_til?: string[];
  };
  content: any[];
  updateInfo?: {
    lastVerified?: string;
  };
}

export type AkselSidebarT = Array<{
  heading: string;
  slug: string;
  kategori: (typeof komponentKategorier)[number]["value"];
  tag: "beta" | "new" | "ready" | "deprecated";
  sidebarindex: number | null;
}>;

export type ArticleListT = Array<{
  _id: string;
  heading: string;
  slug: { current: string };
  kategori: (typeof komponentKategorier)[number]["value"];
  status: {
    tag?: "beta" | "new" | "ready" | "deprecated";
    unsafe?: boolean;
    bilde?: any;
  };
}>;

export type LandingPageTypeT<T extends string> = `${T}_landingsside`;
export type IngressT<T extends string> = `${T}_ingress`;

export interface AkselLandingPageDocT
  extends DocumentT<LandingPageTypeT<"komponenter">> {
  intro: any[];
  seo?: ArticleT["seo"];
}

export interface AkselGodPraksisLandingPageDocT
  extends DocumentT<"godpraksis_landingsside"> {
  intro: any[];
  seo?: ArticleT["seo"];
}

export interface AkselTemaT extends DocumentT<"aksel_tema"> {
  title: string;
  oppsummering?: string;
  beskrivelse?: any;
  refCount?: number;
  slug: { current: string };
  ansvarlig?: { _ref: string };
  seksjoner: Array<
    ArrayObjectT<{
      title: string;
      beskrivelse: any;
      sider: Array<
        ResolveContributorsSingleT<
          ResolveTemaT<ResolveSlugT<AkselGodPraksisDocT>>
        >
      >;
    }>
  >;
  pictogram: any;
  seo?: ArticleT["seo"];
}

export interface AccordionT {
  list: Array<
    ArrayObjectT<{
      title: string;
      content: any[];
    }>
  >;
}

export interface AlertT {
  variant: "success" | "info" | "warning" | "error";
  heading?: string;
  heading_level?: "h2" | "h3" | "h4";
  body: any[];
}

export interface DoDontT {
  blokker: Array<
    ArrayObjectT<{
      fullwidth: boolean;
      picture: any;
      alt: string;
      description?: string;
      variant: "do" | "dont" | "warning";
    }>
  >;
}

export interface CodeSnippetT {
  title?: string;
  code: {
    language: string;
    code: string;
  };
}

export interface TableT {
  rows?: Array<ArrayObjectT<{ cells: Array<string> }>>;
}

export interface UUTableT {
  tastatur?: Array<ArrayObjectT<{ key: string; action: string }>>;
}

export interface TokenTableT {
  title: string;
  kategori: string;
}

export interface BildeT {
  asset: any;
  alt: string;
  caption?: string;
  small: boolean;
  kilde?: {
    har_kilde?: boolean;
    prefix?: "FOTO" | "Kilde";
    tekst?: string;
    link?: string;
  };
  dekorativt?: boolean;
  background?: {
    rgb: { a: number; b: number; g: number; r: number };
    alpha: number;
  };
}

export type InnholdsKortPrinsipperT = ArrayObjectT<{
  title: string;
  lenke: string;
  body: any[];
}>;

export interface RelatertInnholdT {
  lenker: Array<
    ArrayObjectT<{
      title: string;
      intern: boolean;
      intern_lenke?: string;
      ekstern_link?: string;
      ekstern_domene?: boolean;
    }>
  >;
}

export interface CodeExamplesT {
  title: string;
  dir: {
    title: string;
    filer: Array<
      ArrayObjectT<{ navn: string; innhold: string; description?: string }>
    >;
  };
}

export type PropTableT = ArrayObjectT<{
  title?: string;
  overridable?: boolean;
  propref?: {
    title?: string;
    displayname?: string;
    filepath?: string;
    proplist?: Array<
      ArrayObjectT<{
        _type: "prop";
        name?: string;
        defaultValue?: string;
        description?: string;
        required?: boolean;
        type?: string;
        ref?: boolean;
      }>
    >;
  };
}>;

export type TipsT = ArrayObjectT<{
  eksperiment?: boolean;
  body: any[];
}>;

export type VideoT = ArrayObjectT<{
  alt: string;
  webm: { extension: string; url: string } | null;
  fallback?: { extension: string; url: string } | null;
  transkripsjon?: string;
  caption?: string;
}>;
