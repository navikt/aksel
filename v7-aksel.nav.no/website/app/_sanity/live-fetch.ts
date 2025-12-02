import "server-only";
import { PAGE_ROUTES } from "@/app/(routes)/routing-config";
import { sanityLocalFetch } from "@/app/_sanity/live";
import {
  DESIGNSYSTEM_GRUNNLEGGENDE_LANDINGPAGE_QUERY,
  DESIGNSYSTEM_KOMPONENTER_LANDINGPAGE_QUERY,
  SITEMAP_ARTICLES_BY_TYPE_QUERY,
  SITEMAP_LANDINGPAGES_QUERY,
} from "@/app/_sanity/queries";
import { allArticleDocuments } from "@/sanity/config";

async function fetchAllSanityPages(): Promise<
  {
    slug: string;
    lastMod: string | null;
  }[]
> {
  const [
    { data: landingPageData },
    { data: articleListData },
    { data: dsKomponenterData },
    { data: dsGrunnleggendeData },
  ] = await Promise.all([
    sanityLocalFetch({
      query: SITEMAP_LANDINGPAGES_QUERY,
    }),
    sanityLocalFetch({
      query: SITEMAP_ARTICLES_BY_TYPE_QUERY,
      params: {
        doctypes: allArticleDocuments,
      },
    }),
    sanityLocalFetch({
      query: DESIGNSYSTEM_KOMPONENTER_LANDINGPAGE_QUERY,
    }),
    sanityLocalFetch({
      query: DESIGNSYSTEM_GRUNNLEGGENDE_LANDINGPAGE_QUERY,
    }),
  ]);

  const paths = [
    { slug: "", lastMod: landingPageData.frontpage },
    { slug: "/designsystemet", lastMod: new Date().toISOString() },
    ...articleListData.map((page) => {
      return { slug: `/${page.slug}`, lastMod: page._updatedAt };
    }),
  ];

  dsKomponenterData?.overview_pages?.forEach((overviewPage) => {
    paths.push({ slug: `/komponenter/${overviewPage}`, lastMod: null });
  });

  dsGrunnleggendeData?.overview_pages?.forEach((overviewPage) => {
    paths.push({ slug: `/grunnleggende/${overviewPage}`, lastMod: null });
  });

  paths.push({ slug: `/monster-maler`, lastMod: null });

  Object.values(PAGE_ROUTES).forEach((category) => {
    category.root.forEach((page) =>
      paths.push({ slug: `/${page.slug}`, lastMod: null }),
    );

    if (category?.nested) {
      Object.values(category.nested).forEach((nestedCategory) => {
        nestedCategory.forEach((page) =>
          paths.push({ slug: `/${page.slug}`, lastMod: null }),
        );
      });
    }
  });

  return paths;
}

export { fetchAllSanityPages };
