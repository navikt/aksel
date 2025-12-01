import {
  bloggKategorier,
  grunnleggendeKategorier,
  komponentKategorier,
} from "@/sanity/config";

export type ResolveSlugT<T> = Omit<T, "slug"> & {
  slug: string;
};

export type ResolveRelatedArticlesT<T> = Omit<T, "relevante_artikler"> & {
  relevante_artikler?: {
    heading: string;
    ingress: string;
    slug: string;
    innholdstype: string;
  }[];
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
  ingress: string;
  content: any[];
  seo?: {
    meta?: string;
    image?: any;
  };
};

export interface AkselStandaloneDocT
  extends DocumentT<"aksel_standalone">,
    Omit<ArticleT, "ingress" | "seo"> {}

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
  hide_feedback?: boolean;
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

export type SidebarInputNodeT = {
  _type: string;
  heading: string;
  slug: string;
  kategori: string;
  tag: "beta" | "new" | "ready" | "deprecated";
  sidebarindex: number | null;
};

export type SidebarPageT = Pick<SidebarInputNodeT, "heading" | "slug" | "tag">;

export type SidebarGroupedPagesT = {
  title: string;
  value: string;
  pages: SidebarPageT[];
};

export type DesignsystemSidebarSectionT = (
  | SidebarPageT
  | SidebarGroupedPagesT
)[];

export type ArticleListT = {
  _id: string;
  heading: string;
  slug: { current: string };
  kategori:
    | (typeof komponentKategorier)[number]["value"]
    | (typeof grunnleggendeKategorier)[number]["value"];
  status: {
    tag?: "beta" | "new" | "ready" | "deprecated";
    unsafe?: boolean;
    bilde?: any;
  };
  sidebarindex?: number;
}[];

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

export interface AccordionT {
  list: ArrayObjectT<{
    title: string;
    content: any[];
  }>[];
}

export interface AlertT {
  variant: "success" | "info" | "warning" | "error";
  heading?: string;
  heading_level?: "h2" | "h3" | "h4";
  body: any[];
}

export interface DoDontT {
  blokker: ArrayObjectT<{
    fullwidth: boolean;
    picture: any;
    alt: string;
    description?: string;
    variant: "do" | "dont" | "warning";
  }>[];
}

export interface CodeSnippetT {
  title?: string;
  code: {
    language: string;
    code: string;
  };
}

export interface TableT {
  rows?: ArrayObjectT<{ cells: string[] }>[];
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
  border?: boolean;
  background?: {
    rgb: { a: number; b: number; g: number; r: number };
    alpha: number;
  };
}

export interface RelatertInnholdT {
  title?: string;
  lenker: ArrayObjectT<{
    title: string;
    intern: boolean;
    intern_lenke?: string;
    ekstern_link?: string;
    ekstern_domene?: boolean;
  }>[];
}

export type CodeExampleSchemaT = {
  _id: string;
  _type: string;
  title: string;
  variant: "eksempler" | "templates";
  filer: {
    title: string;
    innhold: string;
    kompaktInnhold?: string | null;
    navn: string;
    index: number;
    description?: string;
    sandboxEnabled?: boolean;
    sandboxBase64: string;
  }[];
  metadata?: {
    version: number;
    changelog: { description: string; version: number; date: string }[];
  };
};

export interface CodeExamplesT {
  title: string;
  dir: {
    title: string;
    filer: ArrayObjectT<CodeExampleSchemaT["filer"][0]>[];
    metadata?: CodeExampleSchemaT["metadata"];
    variant: CodeExampleSchemaT["variant"];
  };
  compact?: boolean;
}

export type PropTableT = ArrayObjectT<{
  title?: string;
  overridable?: boolean;
  propref?: {
    title?: string;
    displayname?: string;
    filepath?: string;
    proplist?: ArrayObjectT<{
      _type: "prop";
      name?: string;
      defaultValue?: string;
      description?: string;
      required?: boolean;
      type?: string;
      ref?: boolean;
      deprecated?: string;
    }>[];
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
  track?: string;
  transkripsjon?: string;
  caption?: string;
}>;
