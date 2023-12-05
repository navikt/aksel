import { groq } from "next-sanity";

export const heroNavQuery = groq`"heroNav": *[_type == "gp.tema" && count(*[_type=="aksel_artikkel" && (^._id in undertema[]->tema._ref)]) > 0]{
  title,
  "slug": slug.current,
}`;
