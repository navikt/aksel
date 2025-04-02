import { Metadata, ResolvingMetadata } from "next";
import { PortableTextBlock } from "next-sanity";
import { notFound } from "next/navigation";
import type { Image } from "sanity";
import { sanityFetch } from "@/app/_sanity/live";
import {
  KOMPONENTOVERSIKT_QUERY,
  KOMPONENT_BY_SLUG_QUERY,
  METADATA_BY_SLUG_QUERY,
} from "@/app/_sanity/queries";
import { urlForOpenGraphImage } from "@/app/_sanity/utils";
import { CustomPortableText } from "@/app/_ui/portable-text/CustomPortableText";
import { DesignsystemetKomponentIntro } from "../_ui/Designsystemet.intro";
import {
  DesignsystemetPageHeader,
  DesignsystemetPageLayout,
} from "../_ui/DesignsystemetPage";

type Props = {
  params: Promise<{ slug: string[] }>;
};

/* export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = await params;

  const { data: page } = await sanityFetch({
    query: METADATA_BY_SLUG_QUERY,
    params: { slug: parseDesignsystemSlug(slug, "komponenter") },
    stega: false,
  });

  const ogImages = (await parent).openGraph?.images || [];
  const pageOgImage = urlForOpenGraphImage(page?.seo?.image as Image);

  pageOgImage && ogImages.unshift(pageOgImage);

  return {
    title: page?.heading,
    description: page?.seo?.meta,
    openGraph: {
      images: ogImages,
    },
  };
} */

/* https://nextjs.org/docs/app/api-reference/file-conventions/page#props */
export default async function Page() {
  const { data: components } = await sanityFetch({
    query: KOMPONENTOVERSIKT_QUERY,
  });

  if (!components || components.length === 0) {
    notFound();
  }

  return (
    <DesignsystemetPageLayout>
      {/* <DesignsystemetPageHeader data={page} /> */}

      <div>
        {components.map((component) => (
          <div key={component.heading}>{component.heading}</div>
        ))}
        PAGE
        {/* <DesignsystemetKomponentIntro data={page} />
        <CustomPortableText value={page.content as PortableTextBlock[]} /> */}
      </div>
    </DesignsystemetPageLayout>
  );
}
