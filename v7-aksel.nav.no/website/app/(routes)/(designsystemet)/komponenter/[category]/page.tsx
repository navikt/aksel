import { Metadata } from "next";
import { stegaClean } from "next-sanity";
import { notFound } from "next/navigation";
import { DesignsystemetOverviewPage } from "@/app/(routes)/(designsystemet)/_ui/overview/DesignsystemetOverview";
import { getStaticParamsSlugs } from "@/app/(routes)/(designsystemet)/slug";
import { sanityLocalFetch } from "@/app/_sanity/live";
import {
  DESIGNSYSTEM_KOMPONENTER_LANDINGPAGE_QUERY,
  DESIGNSYSTEM_OVERVIEW_BY_CATEGORY_QUERY,
  METADATA_BY_SLUG_QUERY,
} from "@/app/_sanity/queries";
import { komponentKategorier, sanityCategoryLookup } from "@/sanity/config";
import { KomponenterPage } from "./_ui/KomponenterPage";

type Props = {
  params: Promise<{ category: string }>;
};

const categoryConfig = sanityCategoryLookup("komponenter");

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;

  if (!komponentKategorier.find((cat) => cat.value === category)) {
    const { data: pageData } = await sanityLocalFetch({
      query: METADATA_BY_SLUG_QUERY,
      params: { slug: `komponenter/${category}` },
    });

    return {
      title: pageData?.heading,
    };
  }

  const currentCategory = categoryConfig.find((cat) => cat.value === category);

  return {
    title: currentCategory?.title,
  };
}

export async function generateStaticParams() {
  const [{ data: page }, topLevelPages] = await Promise.all([
    sanityLocalFetch({
      query: DESIGNSYSTEM_KOMPONENTER_LANDINGPAGE_QUERY,
    }),
    getStaticParamsSlugs({
      type: "komponent_artikkel",
      onlyTopLevelPages: true,
    }),
  ]);

  const pages = topLevelPages;
  page?.overview_pages?.forEach((overviewPage) =>
    pages.push({ category: overviewPage }),
  );

  return pages;
}

export default async function Page({ params }: Props) {
  const { category } = await params;

  /**
   * Overview-pages can only match the categories in config. If we get a category outside of the config,
   * we can assume its a "top-level" page, and we should not show the overview page.
   */
  if (!komponentKategorier.find((cat) => cat.value === category)) {
    return <KomponenterPage slug={`komponenter/${category}`} />;
  }

  const [{ data: categoryPages }, { data: landingPage }] = await Promise.all([
    sanityLocalFetch({
      query: DESIGNSYSTEM_OVERVIEW_BY_CATEGORY_QUERY,
      params: { category, docType: "komponent_artikkel" },
    }),
    sanityLocalFetch({
      query: DESIGNSYSTEM_KOMPONENTER_LANDINGPAGE_QUERY,
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
