import { bloggKategorier } from "../../sanity/config";

export type ResolveSlugT<T> = Omit<T, "slug"> & {
  slug: string;
};

export type ResolveContributorsT<T> = Omit<T, "contributors"> & {
  contributors: { title: string }[];
};

type DocumentT<T> = {
  _createdAt: string;
  _updatedAt: string;
  _id: string;
  _rev?: string;
  _type: T;
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
  kategori: typeof bloggKategorier[number]["value"];
}
