import { defineQuery } from "next-sanity";

const POST_QUERY = defineQuery(`*[_type == "komponent_artikkel"].heading`);

export { POST_QUERY };
