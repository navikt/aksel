import "server-only";
import { PAGE_ROUTES } from "@/app/(routes)/routing-config";
import { sanityFetch } from "@/app/_sanity/live";
import {
  DESIGNSYSTEM_GRUNNLEGGENDE_LANDINGPAGE_QUERY,
  DESIGNSYSTEM_KOMPONENTER_LANDINGPAGE_QUERY,
  DESIGNSYSTEM_TEMPLATES_LANDINGPAGE_QUERY,
  GOD_PRAKSIS_ALL_TEMA_QUERY,
  GOD_PRAKSIS_ARTICLES_COUNT_BY_UNDERTEMA_ID_QUERY,
  GOD_PRAKSIS_TEMA_UNDERTEMA_QUERY,
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
    { data: temaListData },
    { data: dsKomponenterData },
    { data: dsGrunnleggendeData },
    { data: dsTemplatesData },
  ] = await Promise.all([
    sanityFetch({
      query: SITEMAP_LANDINGPAGES_QUERY,
      stega: false,
      perspective: "published",
    }),
    sanityFetch({
      query: SITEMAP_ARTICLES_BY_TYPE_QUERY,
      params: {
        doctypes: allArticleDocuments,
      },
      stega: false,
      perspective: "published",
    }),
    sanityFetch({
      query: GOD_PRAKSIS_ALL_TEMA_QUERY,
      stega: false,
      perspective: "published",
    }),
    sanityFetch({
      query: DESIGNSYSTEM_KOMPONENTER_LANDINGPAGE_QUERY,
      stega: false,
      perspective: "published",
    }),
    sanityFetch({
      query: DESIGNSYSTEM_GRUNNLEGGENDE_LANDINGPAGE_QUERY,
      stega: false,
      perspective: "published",
    }),
    sanityFetch({
      query: DESIGNSYSTEM_TEMPLATES_LANDINGPAGE_QUERY,
      stega: false,
      perspective: "published",
    }),
  ]);

  const filteredTema: typeof temaListData = [];

  for (const tema of temaListData) {
    const { data: undertema } = await sanityFetch({
      query: GOD_PRAKSIS_TEMA_UNDERTEMA_QUERY,
      params: { temaId: tema._id },
    });

    if (undertema.length === 0) {
      continue;
    }

    const { data: articleCount } = await sanityFetch({
      query: GOD_PRAKSIS_ARTICLES_COUNT_BY_UNDERTEMA_ID_QUERY,
      params: { undertemaIds: undertema },
    });

    if (articleCount === 0) {
      continue;
    }

    filteredTema.push(tema);
  }

  const paths = [
    { slug: "", lastMod: landingPageData.frontpage },
    { slug: "/god-praksis", lastMod: landingPageData.godpraksis },
    { slug: "/produktbloggen", lastMod: landingPageData.blogg },
    { slug: "/designsystemet", lastMod: new Date().toISOString() },
    ...articleListData.map((page) => {
      return { slug: `/${page.slug}`, lastMod: page._updatedAt };
    }),
    ...filteredTema.map((page) => {
      return { slug: `/god-praksis/${page.slug}`, lastMod: page._updatedAt };
    }),
  ];

  dsKomponenterData?.overview_pages?.forEach((overviewPage) => {
    paths.push({ slug: `/komponenter/${overviewPage}`, lastMod: null });
  });

  dsGrunnleggendeData?.overview_pages?.forEach((overviewPage) => {
    paths.push({ slug: `/grunnleggende/${overviewPage}`, lastMod: null });
  });

  dsTemplatesData?.overview_pages?.forEach((overviewPage) => {
    paths.push({ slug: `/monster-maler/${overviewPage}`, lastMod: null });
  });

  paths.push({ slug: `/monster-maler`, lastMod: null });

  Object.values(PAGE_ROUTES).forEach((category) => {
    category.root.forEach((page) => {
      paths.push({ slug: `/${page.slug}`, lastMod: null });
    });

    if (category?.nested) {
      Object.values(category.nested).forEach((nestedCategory) => {
        nestedCategory.forEach((page) => {
          paths.push({ slug: `/${page.slug}`, lastMod: null });
        });
      });
    }
  });

  return paths;
}

export { fetchAllSanityPages };
