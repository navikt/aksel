import { defineQuery, groq } from "next-sanity";
import { allArticleDocuments } from "@/sanity/config";
import { destructureBlocks } from "@/sanity/queries";

const POST_QUERY = defineQuery(`*[_type == "komponent_artikkel"].heading`);

const DESIGNSYSTEM_TYPES = groq`"komponent_artikkel", "ds_artikkel", "templates_artikkel"`;

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
  `*[_type in [${allArticleDocuments.map((x) => `"${x}"`)}]]${searchContent}`,
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

const TOC_BY_SLUG_QUERY =
  defineQuery(`*[slug.current == $slug][0].content[style match 'h2'][]{
  "id": _key,
  "title": pt::text(@)
}`);

export {
  POST_QUERY,
  DESIGNSYSTEM_SIDEBAR_QUERY,
  GLOBAL_SEARCH_QUERY_ALL,
  KOMPONENT_BY_SLUG_QUERY,
  TOC_BY_SLUG_QUERY,
};
