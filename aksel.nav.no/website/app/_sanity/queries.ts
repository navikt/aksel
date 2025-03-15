import { defineQuery, groq } from "next-sanity";
import { allArticleDocuments } from "@/sanity/config";

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

const GLOBAL_SEARCH_QUERY_RECENT = defineQuery(
  `*[_type in [${allArticleDocuments.map(
    (x) => `"${x}"`,
  )}]]| order(publishedAt desc)[0..20]${searchContent}`,
);

const GLOBAL_SEARCH_QUERY_ALL = defineQuery(
  `*[_type in [${allArticleDocuments.map((x) => `"${x}"`)}]]${searchContent}`,
);

export {
  POST_QUERY,
  DESIGNSYSTEM_SIDEBAR_QUERY,
  GLOBAL_SEARCH_QUERY_ALL,
  GLOBAL_SEARCH_QUERY_RECENT,
};
