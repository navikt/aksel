import { StructureBuilder } from "sanity/structure";
import { SANITY_API_VERSION, allArticleDocuments } from "@/sanity/config";

export function listPublishedArticles(
  S: StructureBuilder,
  type: (typeof allArticleDocuments)[number],
) {
  return S.listItem({
    id: `my_${type}_published`,
    title: "Mine publiserte artikler",
    schemaType: type,
    child: (_, { structureContext }) => {
      const mail = structureContext.currentUser?.email;

      return S.documentTypeList(type)
        .title("Artikler")
        .filter(`_type == $type && !(_id in path("drafts.**"))`)
        .apiVersion(SANITY_API_VERSION)
        .params({ type, mail })
        .initialValueTemplates([]);
    },
  });
}

export function listMyDraftArticles(
  S: StructureBuilder,
  type: (typeof allArticleDocuments)[number],
) {
  return S.listItem({
    id: `my_${type}_drafts`,
    title: "Mine utkast",
    schemaType: type,
    child: (_, { structureContext }) => {
      const mail = structureContext.currentUser?.email;

      return S.documentTypeList(type)
        .title("Artikler")
        .filter(`_type == $type && _id in path("drafts.**")`)
        .apiVersion(SANITY_API_VERSION)
        .params({ type, mail })
        .initialValueTemplates([]);
    },
  });
}

export function listDraftArticles(
  S: StructureBuilder,
  type: (typeof allArticleDocuments)[number],
) {
  return S.listItem({
    id: `${type}_drafts`,
    title: "Utkast",
    schemaType: type,
    child: () => {
      return S.documentTypeList(type)
        .title("Artikler")
        .filter(`_type == $type && _id in path("drafts.**")`)
        .apiVersion(SANITY_API_VERSION)
        .params({ type })
        .initialValueTemplates([]);
    },
  });
}

export function listOutdatedArticles(
  S: StructureBuilder,
  type: (typeof allArticleDocuments)[number],
  threshold: number = 365,
) {
  return S.listItem({
    id: `article_${type}_outdated`,
    title: "Trenger oppdatering",
    schemaType: type,
    child: () =>
      S.documentTypeList(type)
        .title("Artikler")
        .filter(
          `_type == $type && (dateTime(updateInfo.lastVerified + "T00:00:00Z") < dateTime(now()) - 60*60*24*$threshold) && !(_id in path("drafts.**"))`,
        )
        .apiVersion(SANITY_API_VERSION)
        .params({ type, threshold })
        .initialValueTemplates([])
        .defaultOrdering([
          { field: "updateInfo.lastVerified", direction: "asc" },
        ]),
  });
}
