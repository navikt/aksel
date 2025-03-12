import { defineQuery } from "next-sanity";
import Link from "next/link";
import { sanityFetch } from "./_test/live";
import { Toggle } from "./_test/toggle";

const POST_QUERY = defineQuery(`*[_type == "komponent_artikkel"].heading`);

export default async function Page() {
  const { data } = await sanityFetch({ query: POST_QUERY });

  return (
    <div>
      <Link href="/komponenter">test</Link>
      <Toggle />
      {data.map((post: string) => (
        <div key={post}>{post}</div>
      ))}
    </div>
  );
}
