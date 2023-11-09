import imageUrlBuilder from "@sanity/image-url";
import { getClient, noCdnClient, sanityClient } from "./client.server";
import { allArticleDocuments } from "@/sanity/config";

const imageBuilder = imageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  return imageBuilder.image(source);
}

export const getAllPages = async (token?: string) => {
  const pages = await sitemapPages(token);
  return pages.map((x) => x.path);
};

export async function sitemapPages(
  token?: string
): Promise<{ path: string; lastmod: string }[]> {
  const client = token ? noCdnClient(token) : getClient();
  const artikler = await getDocuments("all", token);
  const temaer = await getAkselTema(token);

  const pages = await client.fetch(
    `{
      "frontpage": *[_type == "aksel_forside"][0]._updatedAt,
      "godpraksis": *[_type == "godpraksis_landingsside"][0]._updatedAt,
      "grunnleggende": *[_type == "grunnleggende_landingsside"][0]._updatedAt,
      "komponenter": *[_type == "komponenter_landingsside"][0]._updatedAt,
      "templates": *[_type == "templates_landingsside"][0]._updatedAt,
      "blogg": *[_type == "blogg_landingsside"][0]._updatedAt,
    }`
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

export async function getAkselTema(
  token?: string
): Promise<{ path: string; lastmod: string }[]> {
  const client = token ? noCdnClient(token) : getClient();
  const tags: { slug: { current: string }; _updatedAt: string }[] =
    await client.fetch(
      `*[_type == "aksel_tema" && count(*[references(^._id)]) > 0]{slug,_updatedAt}`
    );
  return tags.map((x) => ({
    path: x?.slug.current,
    lastmod: x?._updatedAt,
  }));
}

export async function getDocuments(
  source: (typeof allArticleDocuments)[number] | "all",
  token?: string
): Promise<{ slug: string; lastmod: string }[]> {
  const client = token ? noCdnClient(token) : getClient();
  const documents: any[] | null = await client.fetch(
    `*[_type in $types]{ _type, _id, 'slug': slug.current, _updatedAt }`,
    {
      types: source === "all" ? allArticleDocuments : [source],
    }
  );
  const paths = [];

  documents
    .filter((x) => !x._id.startsWith("drafts."))
    ?.forEach((page) => {
      page.slug && paths.push({ slug: page.slug, lastmod: page._updatedAt });
    });

  return paths;
}
