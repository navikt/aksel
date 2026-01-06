import { Metadata } from "next";
import { stegaClean } from "next-sanity";
import { notFound } from "next/navigation";
import { DesignsystemetOverviewPage } from "@/app/(routes)/(designsystemet)/_ui/overview/DesignsystemetOverview";
import { getStaticParamsSlugs } from "@/app/(routes)/(designsystemet)/slug";
import { sanityFetch } from "@/app/_sanity/live";
import {
  DESIGNSYSTEM_OVERVIEW_BY_CATEGORY_QUERY,
  DESIGNSYSTEM_TEMPLATES_LANDINGPAGE_QUERY,
  METADATA_BY_SLUG_QUERY,
} from "@/app/_sanity/queries";
import { urlForOpenGraphImage } from "@/app/_sanity/utils";
import { sanityCategoryLookup, templatesKategorier } from "@/sanity/config";
import { MonsterMalerPage } from "./_ui/MonsterMalerPage";

type Props = {
  params: Promise<{ category: string }>;
};

const categoryConfig = sanityCategoryLookup("templates");

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;

  if (!templatesKategorier.find((cat) => cat.value === category)) {
    const { data: pageData } = await sanityFetch({
      query: METADATA_BY_SLUG_QUERY,
      params: { slug: `monster-maler/${category}` },
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

  const { data: page } = await sanityFetch({
    query: DESIGNSYSTEM_TEMPLATES_LANDINGPAGE_QUERY,
    stega: false,
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
    sanityFetch({
      query: DESIGNSYSTEM_TEMPLATES_LANDINGPAGE_QUERY,
      stega: false,
      perspective: "published",
    }),
    getStaticParamsSlugs({
      type: "templates_artikkel",
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
  if (!templatesKategorier.find((cat) => cat.value === category)) {
    return <MonsterMalerPage slug={`monster-maler/${category}`} />;
  }

  const [{ data: categoryPages }, { data: landingPage }] = await Promise.all([
    sanityFetch({
      query: DESIGNSYSTEM_OVERVIEW_BY_CATEGORY_QUERY,
      params: { category, docType: "templates_artikkel" },
    }),
    sanityFetch({
      query: DESIGNSYSTEM_TEMPLATES_LANDINGPAGE_QUERY,
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
