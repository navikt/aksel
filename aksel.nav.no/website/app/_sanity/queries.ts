import { defineQuery } from "next-sanity";

const POST_QUERY = defineQuery(`*[_type == "komponent_artikkel"].heading`);

const DESIGNSYSTEM_SIDEBAR_QUERY =
  defineQuery(`*[_type == "komponent_artikkel" && defined(kategori)] {
  heading,
  "slug": slug.current,
  kategori,
  "tag": status.tag,
  "sidebarindex": sidebarindex,
}`);

export { POST_QUERY, DESIGNSYSTEM_SIDEBAR_QUERY };
