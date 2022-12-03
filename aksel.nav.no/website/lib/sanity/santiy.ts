import imageUrlBuilder from "@sanity/image-url";
import { SanityT } from "..";
import { akselDocumentsByType, akselTemaNames, dsDocuments } from "./queries";
import { getClient, noCdnClient, sanityClient } from "./sanity.server";

const imageBuilder = imageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  return imageBuilder.image(source);
}

export const getAllPages = async (token?: string) => {
  const pages = await getDsPaths(token).then((paths) =>
    paths.map((slugs) => slugs.join("/"))
  );

  const artikler = await getAkselDocuments("all", token);
  const temaer = await getAkselTema(token);

  return [
    "",
    "designsystem",
    "tema",
    "blogg",
    ...pages,
    ...artikler,
    ...temaer.map((x) => `god-praksis/${x}`),
  ];
};

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
  const client = token ? noCdnClient(token) : getClient();
  const documents: any[] | null = await client.fetch(akselDocumentsByType, {
    types:
      source === "all"
        ? [
            "aksel_artikkel",
            "aksel_blogg",
            "aksel_prinsipp",
            "aksel_standalone",
          ]
        : [source],
  });
  const paths = [];

  const nonDrafts = documents.filter((x) => !x._id.startsWith("drafts."));

  nonDrafts?.forEach((page) => {
    page.slug && paths.push(page.slug);
  });

  return paths;
};

export const getDocumentsTmp = async (
  source: "komponent_artikkel"
): Promise<string[]> => {
  const documents: any[] | null = await getClient().fetch(
    `*[_type in $types]{ _type, _id, 'slug': slug_v2.current }`,
    {
      types: [source],
    }
  );
  const paths = [];

  documents
    .filter((x) => !x._id.startsWith("drafts."))
    ?.forEach((page) => {
      page.slug && paths.push(page.slug);
    });

  return paths;
};

export const getDsPaths = async (token?: string): Promise<string[][]> => {
  const client = token ? noCdnClient(token) : getClient();
  const documents: any[] | null = await client.fetch(dsDocuments);
  const paths = [];

  const nonDrafts = documents.filter((x) => !x._id.startsWith("drafts."));

  nonDrafts?.forEach((page) => {
    if (!page.slug) {
      return null;
    }
    const slug = page.slug.split("/");
    paths.push(slug);
  });
  return paths;
};

export const getAkselTema = async (token?: string): Promise<string[]> => {
  const client = token ? noCdnClient(token) : getClient();
  const tags: { current: string }[] = await client.fetch(akselTemaNames);
  return tags.map((x) => x?.current);
};
