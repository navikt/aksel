import createImageUrlBuilder from "@sanity/image-url";
import type { Image } from "sanity";
import { sanityFetch } from "@/app/_sanity/live";
import {
  GOD_PRAKSIS_ALL_TEMA_QUERY,
  SITEMAP_ARTICLES_BY_TYPE_QUERY,
  SITEMAP_LANDINGPAGES_QUERY,
} from "@/app/_sanity/queries";
import {
  SANITY_DATASET,
  SANITY_PROJECT_ID,
  allArticleDocuments,
} from "@/sanity/config";

const imageBuilder = createImageUrlBuilder({
  projectId: SANITY_PROJECT_ID || "",
  dataset: SANITY_DATASET || "",
});

const urlForImage = (source: Image | null | undefined) => {
  // Ensure that source image contains a valid reference
  if (!source?.asset?._ref) {
    return undefined;
  }

  return imageBuilder?.image(source).auto("format").fit("max");
};

function urlForOpenGraphImage(image: Image | null | undefined) {
  return urlForImage(image)?.width(1200).height(627).fit("crop").url();
}

async function fetchAllSanityPages(): Promise<
  {
    slug: string;
    lastMod: string;
  }[]
> {
  const [
    { data: landingPageData },
    { data: articleListData },
    { data: temaListData },
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
  ]);

  /* { path: "ikoner", lastmod: undefined }, */
  const paths = [
    { slug: "", lastMod: landingPageData.frontpage },
    { slug: "/god-praksis", lastmod: landingPageData.godpraksis },
    { slug: "/produktbloggen", lastmod: landingPageData.blogg },
    { slug: "/designsystemet", lastmod: new Date().toISOString() },
    ...articleListData.map((page) => {
      return { slug: `/${page.slug}`, lastMod: page._updatedAt };
    }),
    ...temaListData
      .filter((tema) => tema.articles.length > 0)
      .map((page) => {
        return { slug: `/god-praksis/${page.slug}`, lastMod: page._updatedAt };
      }),
  ];

  return paths
    .filter((path) => !!path.lastMod && !!path.slug)
    .map((path) => ({
      slug: path.slug as string,
      lastMod: path.lastMod as string,
    }));
}

export { urlForImage, urlForOpenGraphImage, fetchAllSanityPages };
