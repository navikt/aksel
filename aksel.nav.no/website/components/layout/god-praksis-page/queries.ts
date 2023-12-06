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
