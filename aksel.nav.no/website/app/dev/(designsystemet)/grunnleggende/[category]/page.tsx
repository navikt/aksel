import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import type { Image } from "sanity";
import { sanityFetch } from "@/app/_sanity/live";
import {
  DESIGNSYSTEM_GRUNNLEGGENDE_LANDINGPAGE_QUERY,
  DESIGNSYSTEM_OVERVIEW_BY_CATEGORY_QUERY,
} from "@/app/_sanity/queries";
import { urlForOpenGraphImage } from "@/app/_sanity/utils";
import { DesignsystemetOverviewPage } from "@/app/dev/(designsystemet)/_ui/overview/DesignsystemetOverview";
import { grunnleggendeKategorier, sanityCategoryLookup } from "@/sanity/config";
import { GrunnleggendePage } from "./_ui/GrunnleggendePage";

type Props = {
  params: Promise<{ category: string }>;
};

const categoryConfig = sanityCategoryLookup("grunnleggende");

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { category } = await params;

  const { data: page } = await sanityFetch({
    query: DESIGNSYSTEM_GRUNNLEGGENDE_LANDINGPAGE_QUERY,
    stega: false,
  });

  const ogImages = (await parent).openGraph?.images || [];
  const pageOgImage = urlForOpenGraphImage(page?.seo?.image as Image);

  pageOgImage && ogImages.unshift(pageOgImage);

  const currentCategory = categoryConfig.find((cat) => cat.value === category);

  return {
    title: currentCategory?.title,
    description: page?.seo?.meta,
    openGraph: {
      images: ogImages,
    },
  };
}

export async function generateStaticParams() {
  const { data: page } = await sanityFetch({
    query: DESIGNSYSTEM_GRUNNLEGGENDE_LANDINGPAGE_QUERY,
    stega: false,
    perspective: "published",
  });

  return (
    page?.overview_pages?.map((overviewPage) => ({ category: overviewPage })) ??
    []
  );
}

export default async function Page({ params }: Props) {
  const { category } = await params;

  /**
   * Overview-pages can only match the categories in config. If we get a category outside of the config,
   * we can assume its a "top-level" page, and we should not show the overview page.
   */
  if (!grunnleggendeKategorier.find((cat) => cat.value === category)) {
    return <GrunnleggendePage slug={`grunnleggende/${category}`} />;
  }

  const [{ data: categoryPages }, { data: landingPage }] = await Promise.all([
    sanityFetch({
      query: DESIGNSYSTEM_OVERVIEW_BY_CATEGORY_QUERY,
      params: { category, docType: "ds_artikkel" },
    }),
    sanityFetch({
      query: DESIGNSYSTEM_GRUNNLEGGENDE_LANDINGPAGE_QUERY,
    }),
  ]);

  const currentCategory = categoryConfig.find((cat) => cat.value === category);

  if (!currentCategory) {
    notFound();
  }

  if (
    !landingPage?.overview_pages?.some((itemValue) => itemValue === category)
  ) {
    notFound();
  }

  if (!categoryPages || categoryPages.length === 0) {
    notFound();
  }

  return (
    <DesignsystemetOverviewPage
      title={currentCategory.title}
      ingress={landingPage?.[`ingress_${currentCategory.value}`]}
      links={categoryPages}
      type="ds_artikkel"
    />
  );
}
