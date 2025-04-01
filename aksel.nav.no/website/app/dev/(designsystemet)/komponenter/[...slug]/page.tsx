import { Metadata, ResolvingMetadata } from "next";
import { PortableTextBlock } from "next-sanity";
import { notFound } from "next/navigation";
import type { Image } from "sanity";
import { sanityFetch } from "@/app/_sanity/live";
import {
  KOMPONENT_BY_SLUG_QUERY,
  METADATA_BY_SLUG_QUERY,
  TOC_BY_SLUG_QUERY,
} from "@/app/_sanity/queries";
import { urlForOpenGraphImage } from "@/app/_sanity/utils";
import { CustomPortableText } from "@/app/_ui/portable-text/CustomPortableText";
import { TableOfContents } from "@/app/_ui/toc/TableOfContents";
import { DesignsytemetKomponentIntro } from "../../_ui/Designsystemet.intro";
import {
  DesignsystemetPageHeader,
  DesignsystemetPageLayout,
} from "../../_ui/DesignsystemetPage";
import { getStaticParamsSlugs, parseDesignsystemSlug } from "../../slug";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = await params;

  const { data: page } = await sanityFetch({
    query: METADATA_BY_SLUG_QUERY,
    params: { slug: parseDesignsystemSlug(slug, "komponenter") },
    stega: false,
  });

  if (!page) {
    return {
      title: "Aksel.nav.no",
    };
  }

  const ogImages = (await parent).openGraph?.images || [];
  const pageOgImage = urlForOpenGraphImage(page?.seo?.image as Image);

  pageOgImage && ogImages.unshift(pageOgImage);

  return {
    title: `${page?.heading} - Aksel.nav.no`,
    description: page?.seo?.meta,
    openGraph: {
      images: ogImages,
    },
  };
}

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
          text: "Send innspill",
        }}
        toc={toc}
      />
      <div>
        <DesignsytemetKomponentIntro data={page} />
        <CustomPortableText value={page.content as PortableTextBlock[]} />
      </div>
    </DesignsystemetPageLayout>
  );
}
