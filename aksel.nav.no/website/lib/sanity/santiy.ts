import imageUrlBuilder from "@sanity/image-url";
import { getClient, noCdnClient, sanityClient } from "./sanity.server";

const imageBuilder = imageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  return imageBuilder.image(source);
}

export const getAllPages = async (token?: string) => {
  const pages = await sitemapPages();
  return pages.map((x) => x.path);
};

export async function sitemapPages(): Promise<
  { path: string; lastmod: string }[]
> {
  const client = getClient();
  const artikler = await getDocuments("all");
  const temaer = await getAkselTema();

  const pages = await client.fetch(
    `{
      "frontpage": *[_type == "aksel_forside"][0]._updatedAt,
      "godpraksis": *[_type == "godpraksis_landingsside"][0]._updatedAt,
      "grunnleggende": *[_type == "grunnleggende_landingsside"][0]._updatedAt,
      "komponenter": *[_type == "komponenter_landingsside"][0]._updatedAt,
      "blogg": *[_type == "blogg_landingsside"][0]._updatedAt,
    }`
  );
  return [
    { path: "", lastmod: pages.frontpage._updatedAt },
    { path: "god-praksis", lastmod: pages.godpraksis._updatedAt },
    { path: "grunnleggende", lastmod: pages.grunnleggende._updatedAt },
    { path: "komponenter", lastmod: pages.komponenter._updatedAt },
    { path: "produktbloggen", lastmod: pages.blogg._updatedAt },
    ...temaer.map((x) => ({
      path: `god-praksis/${x.path}`,
      lastmod: x.lastmod,
    })),
    ...artikler.map((x) => ({ ...x, path: x.slug })),
  ];
}

export const getAkselDocuments = async (
  source:
    | "aksel_artikkel"
    | "aksel_blogg"
    | "aksel_prinsipp"
    | "aksel_standalone"
    | "komponent_artikkel"
    | "all",
  token?: string
): Promise<string[]> => {
  if (!source) return [];
  const docs = await getDocuments(source, token);

  return docs.map((x) => x.slug);
};

export const getDocumentsTmp = async (
  source: "komponent_artikkel" | "ds_artikkel",
  token?: string
): Promise<string[]> => {
  const docs = await getDocuments(source, token);

  return docs.map((x) => x.slug);
};

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

async function getDocuments(
  source:
    | "komponent_artikkel"
    | "ds_artikkel"
    | "aksel_artikkel"
    | "aksel_blogg"
    | "aksel_prinsipp"
    | "aksel_standalone"
    | "all",
  token?: string
): Promise<{ slug: string; lastmod: string }[]> {
  const client = token ? noCdnClient(token) : getClient();
  const documents: any[] | null = await client.fetch(
    `*[_type in $types]{ _type, _id, 'slug': slug.current, _updatedAt }`,
    {
      types:
        source === "all"
          ? [
              "komponent_artikkel",
              "ds_artikkel",
              "aksel_artikkel",
              "aksel_blogg",
              "aksel_prinsipp",
              "aksel_standalone",
            ]
          : [source],
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
