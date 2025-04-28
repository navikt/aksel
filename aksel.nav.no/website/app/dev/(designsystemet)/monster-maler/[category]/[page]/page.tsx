import { Metadata, ResolvingMetadata } from "next";
import type { Image } from "sanity";
import { sanityFetch } from "@/app/_sanity/live";
import { METADATA_BY_SLUG_QUERY } from "@/app/_sanity/queries";
import { urlForOpenGraphImage } from "@/app/_sanity/utils";
import {
  getStaticParamsSlugs,
  parseDesignsystemSlug,
} from "@/app/dev/(designsystemet)/slug";
import { MonsterMalerPage } from "../_ui/MonsterMalerPage";

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
    params: { slug: parseDesignsystemSlug(category, page, "monster-maler") },
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
  return await getStaticParamsSlugs("templates_artikkel");
}

export default async function Page({ params }: Props) {
  const { category, page } = await params;

  return <MonsterMalerPage slug={`monster-maler/${category}/${page}`} />;
}
