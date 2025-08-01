import { Metadata } from "next";
import { getStaticParamsSlugs } from "@/app/(routes)/(designsystemet)/slug";
import { sanityFetch } from "@/app/_sanity/live";
import { METADATA_BY_SLUG_QUERY } from "@/app/_sanity/queries";
import { urlForOpenGraphImage } from "@/app/_sanity/utils";
import { MonsterMalerPage } from "../_ui/MonsterMalerPage";

type Props = {
  params: Promise<{ category: string; page: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, page } = await params;

  const { data: pageData } = await sanityFetch({
    query: METADATA_BY_SLUG_QUERY,
    params: { slug: `monster-maler/${category}/${page}` },
    stega: false,
  });

  return {
    title: pageData?.heading,
    description: pageData?.seo?.meta,
    openGraph: {
      images: urlForOpenGraphImage(pageData?.seo?.image),
    },
  };
}

export async function generateStaticParams() {
  return await getStaticParamsSlugs({
    type: "templates_artikkel",
    onlyTopLevelPages: false,
  });
}

export default async function Page({ params }: Props) {
  const { category, page } = await params;

  return <MonsterMalerPage slug={`monster-maler/${category}/${page}`} />;
}
