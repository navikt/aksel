import { sanityFetch } from "@/app/_sanity/live";
import {
  KOMPONENT_BY_SLUG_QUERY,
  TOC_BY_SLUG_QUERY,
} from "@/app/_sanity/queries";
import { TableOfContents } from "@/app/_ui/toc/TableOfContents";
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

  const [{ data: page }, { data: toc }] = await Promise.all([
    sanityFetch({
      query: KOMPONENT_BY_SLUG_QUERY,
      params: { slug: parsedSlug },
    }),
    sanityFetch({
      query: TOC_BY_SLUG_QUERY,
      params: { slug: parsedSlug },
    }),
  ]);

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
      <div
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
        style={{ background: "red", width: "100%", height: 50 }}
      ></div>
    </DesignsystemetPageLayout>
  );
}
