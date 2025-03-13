import Link from "next/link";
import { sanityFetch } from "@/app/_sanity/live";
import { POST_QUERY } from "./_sanity/queries";

export default async function Page() {
  const { data } = await sanityFetch({ query: POST_QUERY });

  return (
    <div>
      <Link href="/komponenter">test</Link>
      {data.map((post: string) => (
        <div key={post}>{post}</div>
      ))}
    </div>
  );
}
