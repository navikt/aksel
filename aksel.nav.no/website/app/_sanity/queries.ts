import { defineQuery, groq } from "next-sanity";

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

export { POST_QUERY, DESIGNSYSTEM_SIDEBAR_QUERY };
