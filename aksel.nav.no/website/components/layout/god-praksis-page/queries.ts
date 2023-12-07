import { groq } from "next-sanity";

export const heroNavQuery = groq`
"heroNav": *[_type == "gp.tema"]{
  title,
  "slug": slug.current,
  "hasRefs": count(*[_type=="aksel_artikkel"
      && (^._id in undertema[]->tema._ref)]) > 0
}
`;

export const innholdstypeQuery = groq`
"innholdstype": *[_type == "gp.innholdstype"]{
  ...,
  "hasRefs": count(*[_type=="aksel_artikkel"
      && ^._id == innholdstype._ref]) > 0
}`;

export const chipsUndertemaQuery = groq`
"chipsUndertema": *[_type == "gp.tema.undertema"]{
  title,
  "tema": tema->slug.current,
  "count": count(*[_type=="aksel_artikkel"
      && ^._id in undertema[]._ref])
}`;

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

export const articlesQuery = groq`
"articles": *[_type == "aksel_artikkel"
    && defined(undertema)]
    | order(publishedAt desc)[0...9]{
  heading,
  ingress ,
  "undertema": undertema[]->title,
  "innholdstype": innholdstype->title,
  "slug": slug.current
}`;

export const firstArticlesQuery = groq`
  "articles": *[_type == "aksel_artikkel"
      && $slug in undertema[]->tema->slug.current][0...9]
      | order(publishedAt desc) {
    heading,
    ingress ,
    "undertema": undertema[]->title,
    "innholdstype": innholdstype->title,
    "slug": slug.current
  }`;

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

const baseArticleData = groq`{
  _id,
  heading,
  ingress,
  "undertema": undertema[]->title,
  "innholdstype": innholdstype->title,
  "slug": slug.current,
  publishedAt
}
`;

export const initialGpMainPageArticles = groq`
  "initialInnholdstype": *[_type == "gp.innholdstype"]{
    title,
    "articles": *[_type == "aksel_artikkel" && innholdstype._ref == ^._id]| order(publishedAt desc)[0...9]${baseArticleData}
  }`;

export const initialTemaPageArticles = groq`
  "initialUndertema": *[_type == "gp.tema.undertema" && $slug == tema->slug.current]{
    title,
    "articles": *[_type == "aksel_artikkel" && ^._id in undertema[]._ref] | order(publishedAt desc)[0...9]${baseArticleData}
  },
  "initialInnholdstype": *[_type == "gp.innholdstype"]{
    title,
    "articles": *[_type == "aksel_artikkel" && innholdstype._ref == ^._id && $slug in undertema[]->tema->slug.current]| order(publishedAt desc)[0...9]${baseArticleData}
  }`;
