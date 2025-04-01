import { notFound } from "next/navigation";
import { sanityFetch } from "@/app/_sanity/live";
import { BLOGG_BY_SLUG_QUERY } from "@/app/_sanity/queries";
import { parseDesignsystemSlug } from "../../(designsystemet)/slug";

type Props = {
  params: Promise<{ slug: string[] }>;
};

/* https://nextjs.org/docs/app/api-reference/file-conventions/page#props */
export default async function Page({ params }: Props) {
  const { slug } = await params;

  const parsedSlug = parseDesignsystemSlug(slug, "produktbloggen");

  console.log({ parsedSlug });

  const { data: page } = await sanityFetch({
    query: BLOGG_BY_SLUG_QUERY,
    params: { slug: parsedSlug },
    stega: false,
    perspective: "published",
  });

  console.log({ page });

  if (!page?._id) {
    notFound();
  }

  return <div>page for {parsedSlug}</div>;
}
