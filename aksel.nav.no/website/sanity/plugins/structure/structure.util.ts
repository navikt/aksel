import { StructureBuilder } from "sanity/structure";
import { SANITY_API_VERSION, allArticleDocuments } from "@/sanity/config";

export function listPublishedArticles(
  S: StructureBuilder,
  type: (typeof allArticleDocuments)[number],
) {
  return S.listItem({
    id: "my_gp_published",
    title: "Mine publiserte artikler",
    schemaType: type,
    child: (_, { structureContext }) => {
      const mail = structureContext.currentUser?.email;

      return S.documentTypeList(type)
        .title("Artikler")
        .filter(
          `_type == $type && !(_id in path("drafts.**")) && ($mail in contributors[]->email || $mail in contributors[]->alt_email)`,
        )
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
    id: "my_gp_drafts",
    title: "Mine drafts",
    schemaType: type,
    child: (_, { structureContext }) => {
      const mail = structureContext.currentUser?.email;

      return S.documentTypeList(type)
        .title("Artikler")
        .filter(
          `_type == $type && _id in path("drafts.**") && ($mail in contributors[]->email || $mail in contributors[]->alt_email)`,
        )
        .apiVersion(SANITY_API_VERSION)
        .params({ type, mail })
        .initialValueTemplates([]);
    },
  });
}
