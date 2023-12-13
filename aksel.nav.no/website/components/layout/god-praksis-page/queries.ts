import { groq } from "next-sanity";

export const heroNavQuery = groq`
"heroNav": *[_type == "gp.tema"]{
  title,
  "slug": slug.current,
  "hasRefs": count(*[_type=="aksel_artikkel"
      && (^._id in undertema[]->tema._ref)]) > 0
}
`;
export type heroNavQueryResponse = {
  heroNav: {
    title: string;
    slug: string;
    hasRefs: boolean;
  }[];
};

export const chipsDataAllQuery = groq`
"chipsDataAll": *[_type == "aksel_artikkel" && defined(innholdstype) && defined(undertema)]{
  "innholdstype": innholdstype->title,
  "undertema": undertema[]->{title, "temaSlug": tema->slug.current}
}`;
export type chipsDataAllQueryResponse = {
  chipsDataAll: {
    innholdstype: string;
    undertema: { title: string; temaSlug: string }[];
  }[];
};

export const chipsUndertemaQuery = groq`
"chipsUndertema": *[_type == "gp.tema.undertema"]{
  title,
  "tema": tema->slug.current,
  "count": count(*[_type=="aksel_artikkel"
      && ^._id in undertema[]._ref])
}`;
export type chipsUndertemaQueryResponse = {
  chipsUndertema: {
    title: string;
    tema: string;
    count: number;
  }[];
};

export const chipsInnholdstypeQuery = groq`
"chipsInnholdstype": *[_type == "gp.tema.undertema"] {
  title,
  "slug": tema->slug.current,
  "types": *[_type== "gp.innholdstype"] {
    title,
    "count": count(*[_type == "aksel_artikkel"
      && (^._id == innholdstype._ref ) && (^.^._id in undertema[]._ref)])
  }
}`;
export type chipsInnholdstypeQueryResponse = {
  chipsInnholdstype: {
    title: string;
    slug: string;
    types: {
      title: string;
      count: number;
    }[];
  }[];
};

export const temaQuery = groq`
"tema": *[_type == "gp.tema" && slug.current == $slug][0]{
    ...,
    "slug": slug.current,
    "undertema": *[_type == "gp.tema.undertema"
        && tema->slug.current == $slug
        && count(*[_type == "aksel_artikkel" && references(^._id)]) > 0]{
      title,
      description
    }
  }`;
export type temaQueryResponse = {
  tema: {
    [key: string]: any;
    title: string;
    slug: string;
    description?: string;
    undertema: { title: string; description: string }[];
  };
};

export const baseGpArticleData = groq`{
  _id,
  heading,
  ingress,
  "undertema": undertema[]->title,
  "innholdstype": innholdstype->title,
  "slug": slug.current,
  publishedAt
}
`;
export type baseGpArticleDataResponse = {
  _id: string;
  heading: string;
  ingress: string;
  undertema: string[];
  innholdstype: string;
  slug: string;
  publishedAt: string;
};

export const initialGpMainPageArticles = groq`
  "initialInnholdstype": *[_type == "gp.innholdstype"]{
    title,
    "articles": *[_type == "aksel_artikkel" && innholdstype._ref == ^._id]| order(publishedAt desc)[0...9]${baseGpArticleData}
  }`;
export type initialGpMainPageArticlesResponse = {
  initialInnholdstype: {
    title: string;
    articles: baseGpArticleDataResponse[];
  }[];
};

export const initialTemaPageArticles = groq`
  "initialUndertema": *[_type == "gp.tema.undertema" && $slug == tema->slug.current]{
    title,
    "articles": *[_type == "aksel_artikkel" && ^._id in undertema[]._ref] | order(publishedAt desc)[0...9]${baseGpArticleData}
  },
  "initialInnholdstype": *[_type == "gp.innholdstype"]{
    title,
    "articles": *[_type == "aksel_artikkel" && innholdstype._ref == ^._id && $slug in undertema[]->tema->slug.current]| order(publishedAt desc)[0...9]${baseGpArticleData}
  }`;
export type initialTemaPageArticlesResponse = {
  initialUndertema: {
    title: string;
    articles: baseGpArticleDataResponse[];
  }[];
  initialInnholdstype: {
    title: string;
    articles: baseGpArticleDataResponse[];
  }[];
};
