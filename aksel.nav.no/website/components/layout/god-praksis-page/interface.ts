import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import type { SanityDocument } from "sanity";
import type { ArticleT } from "@/cms/frontpage-blocks/latest-articles/Card";

export type GpTemaT = {
  title: string;
  slug: string;
  description?: string;
  undertema: { title: string; description: string }[];
  image?: SanityImageSource;
};

/**
 * Page Hero
 */
export type HeroNavT = {
  heroNav: {
    title: string;
    slug: string;
    image?: SanityImageSource;
    imageInverted?: SanityImageSource;
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
    seo?: ArticleT["seo"];
    image: SanityImageSource;
  };
  heroNav: {
    title: string;
    slug: string;
    image: SanityImageSource;
    imageInverted: SanityImageSource;
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
