import { groq } from "next-sanity";

export const heroNavQuery = groq`"heroNav": *[_type == "gp.tema"]{
  title,
  "slug": slug.current,
  "hasRefs": count(*[_type=="aksel_artikkel" && (^._id in undertema[]->tema._ref)]) > 0
}
`;

export const innholdstypeQuery = groq`"innholdstype": *[_type == "gp.innholdstype"]{
  ...,
  "hasRefs": count(*[_type=="aksel_artikkel" && ^._id == innholdstype._ref]) > 0
}`;

export const chipDataQuery = groq`
"chipData": *[_type == "gp.tema.undertema"] {
  title,
  "types": *[_type== "gp.innholdstype"] {
    title,
    "count": count(*[_type == "aksel_artikkel" && (^._id == innholdstype._ref ) && (^.^._id in undertema[]._ref)])
  }
}`;

export const chipDataFrontpageQuery = groq`
 "chipData": *[_type== "gp.innholdstype"] {
    title,
    "count": count(*[_type == "aksel_artikkel" && (^._id == innholdstype._ref )])
  }`;

export const articlesQuery = groq`
"articles": *[_type == "aksel_artikkel" && defined(undertema)][0...9] | order(publishedAt desc){
  heading,
  ingress ,
  "undertema": undertema[]->title,
  "innholdstype": innholdstype->title,
  "slug": slug.current
}`;
