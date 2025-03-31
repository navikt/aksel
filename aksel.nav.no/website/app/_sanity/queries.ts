import { defineQuery, groq } from "next-sanity";
import { contributorsAll, destructureBlocks } from "@/sanity/queries";

const DESIGNSYSTEM_TYPES = `"komponent_artikkel", "ds_artikkel", "templates_artikkel"`;

const DESIGNSYSTEM_SIDEBAR_QUERY =
  defineQuery(`*[_type in [${DESIGNSYSTEM_TYPES}] && defined(kategori)] {
  _type,
  heading,
  "slug": slug.current,
  kategori,
  "tag": status.tag,
  "sidebarindex": sidebarindex,
}`);

const searchContent = groq`{
  heading,
  "slug": slug.current,
  "tema": undertema[]->tema->title,
  ingress,
  status,
  _type,
  "intro": pt::text(intro.body),
  content,
  publishedAt,
  seo
}`;

const GLOBAL_SEARCH_QUERY_ALL = defineQuery(
  `*[_type in ["komponent_artikkel",
  "ds_artikkel",
  "aksel_artikkel",
  "aksel_blogg",
  "aksel_prinsipp",
  "aksel_standalone",
  "templates_artikkel"]]${searchContent}`,
);

const KOMPONENT_BY_SLUG_QUERY =
  defineQuery(`*[_type == "komponent_artikkel" && slug.current == $slug][0]
  {
    ...,
    intro{
      ...,
      body[]{
        ...,
      ${destructureBlocks}
      }
    },
    content[]{
      ...,
      ${destructureBlocks}
    },
}`);

const GRUNNLEGGENDE_BY_SLUG_QUERY =
  defineQuery(`*[_type == "ds_artikkel" && slug.current == $slug][0]
  {
    ...,
    content[]{
      ...,
      ${destructureBlocks}
    },
}`);

const BLOGG_BY_SLUG_QUERY =
  defineQuery(`*[_type == "aksel_blogg" && slug.current == $slug][0]
{
  ...,
  "slug": slug.current,
  content[]{
    ...,
    ${destructureBlocks}
  },
  ${contributorsAll}
}`);

const TOC_BY_SLUG_QUERY =
  defineQuery(`*[slug.current == $slug][0].content[style match 'h2'][]{
  "id": _key,
  "title": pt::text(@)
}`);

const SLUG_BY_TYPE_QUERY = defineQuery(`
  *[_type == $type && defined(slug.current)].slug.current
`);

export {
  DESIGNSYSTEM_SIDEBAR_QUERY,
  GLOBAL_SEARCH_QUERY_ALL,
  KOMPONENT_BY_SLUG_QUERY,
  TOC_BY_SLUG_QUERY,
  SLUG_BY_TYPE_QUERY,
  GRUNNLEGGENDE_BY_SLUG_QUERY,
  BLOGG_BY_SLUG_QUERY,
};
