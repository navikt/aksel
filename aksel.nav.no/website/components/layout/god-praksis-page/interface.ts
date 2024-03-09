import { SanityDocument } from "sanity";

export type GpTemaT = {
  title: string;
  slug: string;
  description?: string;
  undertema: { title: string; description: string }[];
};

/**
 * Page Hero
 */
export type HeroNavT = {
  heroNav: {
    title: string;
    slug: string;
    image: any;
  }[];
};

/**
 * Tema-pages
 */
export type GpSlugQueryResponse = {
  tema: SanityDocument & {
    title: string;
    slug: string;
    description?: string;
    undertema: { title: string; description: string }[];
  };
  heroNav: {
    title: string;
    slug: string;
    image: any;
  }[];
  articles: {
    _id: string;
    heading: string;
    publishedAt: string;
    description: string;
    undertema: { title: string; temaTitle: string }[];
    innholdstype: string;
    slug: string;
  }[];
};

export type ParsedGPArticle = Omit<
  GpSlugQueryResponse["articles"][0],
  "undertema"
> & {
  undertema: string;
};
