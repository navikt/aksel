import { groq } from "next-sanity";

export const heroNavQuery = groq`"heroNav": *[_type == "gp.tema"]{
  title,
  "slug": slug.current,
  "refs": *[_type=="aksel_artikkel" && (^._id in undertema[]->tema._ref)]._id
}
`;

export const innholdstypeQuery = groq`"innholdstype": *[_type == "gp.innholdstype"]{
  ...,
  "refs": *[_type=="aksel_artikkel" && ^._id == innholdstype._ref]._id
}`;
