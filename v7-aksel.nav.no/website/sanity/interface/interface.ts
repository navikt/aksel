import imageUrlBuilder from "@sanity/image-url";
import { allArticleDocuments } from "../config";
import { getClient, noCdnClient, sanityClient } from "./client.server";

export function urlFor(source: any) {
  // Ensure that source image contains a valid reference
  if (!source?.asset?._ref) {
    return undefined;
  }
  return imageUrlBuilder(sanityClient).image(source);
}

export async function sitemapPages(
  token?: string,
): Promise<{ path: string; lastmod: string }[]> {
  let client = token ? noCdnClient(token) : getClient();
  client = client.config({ perspective: "published" });
  const artikler = await getDocuments("all", token);
  const temaer = await getGpTema(token);

  const pages = await client.fetch(
    `{
      "frontpage": *[_type == "aksel_forside"][0]._updatedAt,
      "godpraksis": *[_type == "godpraksis_landingsside"][0]._updatedAt,
      "grunnleggende": *[_type == "grunnleggende_landingsside"][0]._updatedAt,
      "komponenter": *[_type == "komponenter_landingsside"][0]._updatedAt,
      "templates": *[_type == "templates_landingsside"][0]._updatedAt,
      "blogg": *[_type == "blogg_landingsside"][0]._updatedAt,
    }`,
  );

  return [
    { path: "", lastmod: pages.frontpage },
    { path: "god-praksis", lastmod: pages.godpraksis },
    { path: "ikoner", lastmod: undefined },
    { path: "grunnleggende", lastmod: pages.grunnleggende },
    { path: "komponenter", lastmod: pages.komponenter },
    { path: "monster-maler", lastmod: pages.templates },
    { path: "produktbloggen", lastmod: pages.blogg },
    ...temaer.map((x) => ({
      path: `god-praksis/${x.path}`,
      lastmod: x.lastmod,
    })),
    ...artikler.map((x) => ({ ...x, path: x.slug })),
  ];
}

export async function getGpTema(
  token?: string,
): Promise<{ path: string; lastmod: string }[]> {
  const client = token ? noCdnClient(token) : getClient();
  const temaList: {
    slug: string;
    _updatedAt: string;
    lastUpdate: string;
    refCount: number;
  }[] = await client.fetch(
    `*[_type == "gp.tema"]{
        _updatedAt,
        "slug": slug.current,
        "refCount": count(*[_type=="aksel_artikkel" && (^._id in undertema[]->tema._ref)]),
        "lastUpdate": *[_type=="aksel_artikkel" && (^._id in undertema[]->tema._ref)] | order(publishedAt desc)[0].publishedAt
      }`,
  );

  return temaList
    .filter((tema) => tema.refCount > 0)
    .map((tema) => ({
      path: tema.slug,
      lastmod: tema.lastUpdate ?? tema._updatedAt,
    }));
}

export async function getDocuments(
  source: (typeof allArticleDocuments)[number] | "all",
  token?: string,
): Promise<{ slug: string; lastmod: string }[]> {
  const client = token ? noCdnClient(token) : getClient();
  const documents: any[] | null = await client.fetch(
    `*[_type in $types]{ _type, _id, 'slug': slug.current, _updatedAt }`,
    {
      types: source === "all" ? allArticleDocuments : [source],
    },
  );
  const paths: { slug: string; lastmod: string }[] = [];

  documents
    ?.filter((x) => !x._id.startsWith("drafts."))
    ?.forEach((page) => {
      page.slug && paths.push({ slug: page.slug, lastmod: page._updatedAt });
    });

  return paths;
}
