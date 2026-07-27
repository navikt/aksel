import { SchemaConfig } from "aksel-sanity-studio/schema";
import type { Metadata } from "next";
import { stegaClean } from "next-sanity";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { DesignsystemetOverviewPage } from "@/app/(routes)/(designsystemet)/_ui/overview/DesignsystemetOverview";
import { getStaticParamsSlugs } from "@/app/(routes)/(designsystemet)/slug";
import {
  type DynamicFetchOptions,
  getDynamicFetchOptions,
  sanityFetch,
  sanityFetchMetadata,
  sanityFetchStaticParams,
} from "@/app/_sanity/live";
import {
  DESIGNSYSTEM_KOMPONENTER_LANDINGPAGE_QUERY,
  DESIGNSYSTEM_OVERVIEW_BY_CATEGORY_QUERY,
  METADATA_BY_SLUG_QUERY,
} from "@/app/_sanity/queries";
import { urlForOpenGraphImage } from "@/app/_sanity/utils";
import { KomponenterPage } from "./_ui/KomponenterPage";

type Props = {
  params: Promise<{ category: string }>;
};

const categoryConfig = SchemaConfig.categoryLookup("komponenter");

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const [{ category }, { perspective }] = await Promise.all([
    params,
    getDynamicFetchOptions(),
  ]);

  if (!SchemaConfig.komponentKategorier.find((cat) => cat.value === category)) {
    const { data: pageData } = await sanityFetchMetadata({
      query: METADATA_BY_SLUG_QUERY,
      params: { slug: `komponenter/${category}` },
      perspective,
    });

    return {
      title: pageData?.heading,
      description: pageData?.seo?.meta,
      openGraph: {
        images: urlForOpenGraphImage(pageData?.seo?.image),
      },
    };
  }

  const { data: page } = await sanityFetchMetadata({
    query: DESIGNSYSTEM_KOMPONENTER_LANDINGPAGE_QUERY,
    perspective,
  });

  const currentCategory = categoryConfig.find((cat) => cat.value === category);

  return {
    title: currentCategory?.title,
    description: page?.seo?.meta,
    openGraph: {
      images: urlForOpenGraphImage(page?.seo?.image),
    },
  };
}

export async function generateStaticParams() {
  const [{ data: page }, topLevelPages] = await Promise.all([
    sanityFetchStaticParams({
      query: DESIGNSYSTEM_KOMPONENTER_LANDINGPAGE_QUERY,
    }),
    getStaticParamsSlugs({
      type: "komponent_artikkel",
      onlyTopLevelPages: true,
    }),
  ]);

  const pages = topLevelPages;
  page?.overview_pages?.forEach((overviewPage) => {
    pages.push({ category: overviewPage });
  });

  return pages;
}

export default async function Page({ params }: Props) {
  const { category } = await params;

  /**
   * Overview-pages can only match the categories in config. If we get a category outside of the config,
   * we can assume its a "top-level" page, and we should not show the overview page.
   */
  if (!SchemaConfig.komponentKategorier.find((cat) => cat.value === category)) {
    return <KomponenterPage slug={`komponenter/${category}`} />;
  }

  return <CategoryOverview category={category} />;
}

async function CategoryOverview({ category }: { category: string }) {
  const { isEnabled: isDraftMode } = await draftMode();

  if (!isDraftMode) {
    return (
      <CachedCategoryOverview
        category={category}
        perspective="published"
        stega={false}
      />
    );
  }

  return (
    <Suspense fallback={null}>
      <DynamicCategoryOverview category={category} />
    </Suspense>
  );
}

async function DynamicCategoryOverview({ category }: { category: string }) {
  const { perspective, stega } = await getDynamicFetchOptions();
  return (
    <CachedCategoryOverview
      category={category}
      perspective={perspective}
      stega={stega}
    />
  );
}

async function CachedCategoryOverview({
  category,
  perspective,
  stega,
}: { category: string } & DynamicFetchOptions) {
  "use cache";

  const [{ data: categoryPages }, { data: landingPage }] = await Promise.all([
    sanityFetch({
      query: DESIGNSYSTEM_OVERVIEW_BY_CATEGORY_QUERY,
      params: { category, docType: "komponent_artikkel" },
      perspective,
      stega,
    }),
    sanityFetch({
      query: DESIGNSYSTEM_KOMPONENTER_LANDINGPAGE_QUERY,
      perspective,
      stega,
    }),
  ]);

  const currentCategory = categoryConfig.find((cat) => cat.value === category);

  if (!currentCategory) {
    notFound();
  }

  if (
    !landingPage?.overview_pages?.some(
      (itemValue) => stegaClean(itemValue) === category,
    )
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
    />
  );
}
