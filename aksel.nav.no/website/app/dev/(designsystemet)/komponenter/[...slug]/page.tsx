import { notFound } from "next/navigation";
import { sanityFetch } from "@/app/_sanity/live";
import {
  KOMPONENT_BY_SLUG_QUERY,
  TOC_BY_SLUG_QUERY,
} from "@/app/_sanity/queries";
import { TableOfContents } from "@/app/_ui/toc/TableOfContents";
import { DesignsystemetPage } from "../../_ui/DesignsystemetPage";
import { DesignsystemetPageLayout } from "../../_ui/DesignsystemetPageLayout";
import { validateDesignsystemSlug } from "../../slug";

/* https://nextjs.org/docs/app/api-reference/file-conventions/page#props */
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;

  const parsedSlug = validateDesignsystemSlug(slug, "komponenter");

  const [{ data: page }, { data: toc = [] }] = await Promise.all([
    sanityFetch({
      query: KOMPONENT_BY_SLUG_QUERY,
      params: { slug: parsedSlug },
    }),
    sanityFetch({
      query: TOC_BY_SLUG_QUERY,
      params: { slug: parsedSlug },
    }),
  ]);

  if (!page?._id) {
    notFound();
  }

  return (
    <DesignsystemetPageLayout layout="with-toc">
      <TableOfContents
        feedback={{
          name: page.heading,
          text: "Innspill til siden",
        }}
        showChangelogLink
        toc={toc}
      />
      <DesignsystemetPage data={page} />
    </DesignsystemetPageLayout>
  );
}
