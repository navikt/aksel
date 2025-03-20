import { notFound } from "next/navigation";
import { sanityFetch } from "@/app/_sanity/live";
import {
  KOMPONENT_BY_SLUG_QUERY,
  TOC_BY_SLUG_QUERY,
} from "@/app/_sanity/queries";
import { TableOfContents } from "@/app/_ui/toc/TableOfContents";
import {
  DesignsystemetPageHeader,
  DesignsystemetPageLayout,
} from "../../_ui/DesignsystemetPage";
import { getStaticParamsSlugs, parseDesignsystemSlug } from "../../slug";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateStaticParams() {
  return await getStaticParamsSlugs("komponent_artikkel");
}

/* https://nextjs.org/docs/app/api-reference/file-conventions/page#props */
export default async function Page({ params }: Props) {
  const { slug } = await params;

  const parsedSlug = parseDesignsystemSlug(slug, "komponenter");

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
      <DesignsystemetPageHeader data={page} />
      <TableOfContents
        feedback={{
          name: page.heading,
          text: "Innspill til siden",
        }}
        showChangelogLink
        toc={toc}
      />
    </DesignsystemetPageLayout>
  );
}
