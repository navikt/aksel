import { Metadata } from "next";
import { getStaticParamsSlugs } from "@/app/(routes)/(designsystemet)/slug";
import { sanityFetch } from "@/app/_sanity/live";
import { METADATA_BY_SLUG_QUERY } from "@/app/_sanity/queries";
import { urlForOpenGraphImage } from "@/app/_sanity/utils";
import { GrunnleggendePage } from "../_ui/GrunnleggendePage";

type Props = {
  params: Promise<{ category: string; page: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, page } = await params;

  const { data: pageData } = await sanityFetch({
    query: METADATA_BY_SLUG_QUERY,
    params: { slug: `grunnleggende/${category}/${page}` },
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
    type: "ds_artikkel",
    onlyTopLevelPages: false,
  });
}

export default async function Page({ params }: Props) {
  const { category, page } = await params;

  return <GrunnleggendePage slug={`grunnleggende/${category}/${page}`} />;
}
