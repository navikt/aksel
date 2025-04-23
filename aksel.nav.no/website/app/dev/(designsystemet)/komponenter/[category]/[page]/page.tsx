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
import { SystemPanel } from "@/app/_ui/panels/SystemPanel";
import { CustomPortableText } from "@/app/_ui/portable-text/CustomPortableText";
import { TableOfContents } from "@/app/_ui/toc/TableOfContents";
import { DesignsystemetKomponentIntro } from "@/app/dev/(designsystemet)/_ui/Designsystemet.intro";
import {
  DesignsystemetPageHeader,
  DesignsystemetPageLayout,
} from "@/app/dev/(designsystemet)/_ui/DesignsystemetPage";
import {
  getStaticParamsSlugs,
  parseDesignsystemSlug,
} from "@/app/dev/(designsystemet)/slug";

type Props = {
  params: Promise<{ category: string; page: string }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { category, page } = await params;

  const { data: pageData } = await sanityFetch({
    query: METADATA_BY_SLUG_QUERY,
    params: { slug: parseDesignsystemSlug(category, page, "komponenter") },
    stega: false,
  });

  const ogImages = (await parent).openGraph?.images || [];
  const pageOgImage = urlForOpenGraphImage(pageData?.seo?.image as Image);

  pageOgImage && ogImages.unshift(pageOgImage);

  return {
    title: pageData?.heading,
    description: pageData?.seo?.meta,
    openGraph: {
      images: ogImages,
    },
  };
}

export async function generateStaticParams() {
  return await getStaticParamsSlugs("komponent_artikkel");
}

export default async function Page({ params }: Props) {
  const { category, page } = await params;

  const parsedSlug = parseDesignsystemSlug(category, page, "komponenter");

  const [{ data: pageData }, { data: toc = [] }] = await Promise.all([
    sanityFetch({
      query: KOMPONENT_BY_SLUG_QUERY,
      params: { slug: parsedSlug },
    }),
    sanityFetch({
      query: TOC_BY_SLUG_QUERY,
      params: { slug: parsedSlug },
    }),
  ]);

  if (!pageData?._id) {
    notFound();
  }

  return (
    <DesignsystemetPageLayout layout="with-toc">
      <DesignsystemetPageHeader data={pageData} />
      <TableOfContents
        feedback={{
          name: pageData.heading,
          text: "Send innspill",
        }}
        toc={toc}
      />
      <div>
        {["beta", "new"].includes(pageData.status?.tag ?? "") && (
          <SystemPanel
            variant={pageData.status?.tag as "beta" | "new"}
            unsafeBeta={pageData.status?.unsafe}
          />
        )}
        <DesignsystemetKomponentIntro data={pageData} />
        <CustomPortableText value={pageData.content as PortableTextBlock[]} />
      </div>
    </DesignsystemetPageLayout>
  );
}
