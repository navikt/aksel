import { sanityFetch } from "@/app/_sanity/live";
import {
  /* KOMPONENT_BY_SLUG_QUERY, */
  TOC_BY_SLUG_QUERY,
} from "@/app/_sanity/queries";
import { DesignsystemetPageLayout } from "../../PageLayout";
import { validateDesignsystemSlug } from "../../slug";

/* https://nextjs.org/docs/app/api-reference/file-conventions/page#props */
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;

  const parsedSlug = validateDesignsystemSlug(slug, "komponenter");

  const [/* { data: page }, */ { data: toc }] = await Promise.all([
    /* sanityFetch({
      query: KOMPONENT_BY_SLUG_QUERY,
      params: { slug: parsedSlug },
    }), */
    sanityFetch({
      query: TOC_BY_SLUG_QUERY,
      params: { slug: parsedSlug },
    }),
  ]);

  return (
    <DesignsystemetPageLayout>
      <div style={{ background: "red", width: "100%", height: 50 }}></div>
      <div style={{ background: "blue", width: "240px", height: 50 }}>
        {JSON.stringify(toc)}
      </div>
    </DesignsystemetPageLayout>
  );
}
