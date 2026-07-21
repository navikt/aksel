import type { ComponentType } from "react";
import type { StructureBuilder } from "sanity/structure";
import { FileXMarkIcon, HouseIcon } from "@navikt/aksel-icons";
import { SANITY_API_VERSION } from "../sanity.env";
import type { AllArticleDocumentsT } from "../schema/schema.config";

type ArticleDocumentType = AllArticleDocumentsT;

type Category = { title: string; value: string };

export function listPublishedArticles(
  S: StructureBuilder,
  type: ArticleDocumentType,
) {
  return S.listItem({
    id: `my_${type}_published`,
    title: "Publiserte artikler",
    schemaType: type,
    child: () =>
      S.documentTypeList(type)
        .title("Artikler")
        .filter(`_type == $type && !(_id in path("drafts.**"))`)
        .apiVersion(SANITY_API_VERSION)
        .params({ type })
        .initialValueTemplates([]),
  });
}

export function listDraftArticles(
  S: StructureBuilder,
  type: ArticleDocumentType,
) {
  return S.listItem({
    id: `${type}_drafts`,
    title: "Utkast",
    schemaType: type,
    child: () =>
      S.documentTypeList(type)
        .title("Artikler")
        .filter(`_type == $type && _id in path("drafts.**")`)
        .apiVersion(SANITY_API_VERSION)
        .params({ type })
        .initialValueTemplates([]),
  });
}

export function listOutdatedArticles(
  S: StructureBuilder,
  type: ArticleDocumentType,
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

/**
 * One list item per category plus buckets for articles without a category and
 * articles referencing categories that no longer exist.
 */
export function categoryPanes(
  S: StructureBuilder,
  docType: ArticleDocumentType,
  categories: readonly Category[],
) {
  return [
    ...categories.map(({ value, title }) =>
      S.listItem()
        .title(title)
        .child(
          S.documentList()
            .title(title)
            .schemaType(docType)
            .filter(`_type == $docType && $kat == kategori`)
            .params({ kat: value, docType })
            .apiVersion(SANITY_API_VERSION),
        ),
    ),
    S.divider(),
    S.listItem()
      .title("Uten kategori")
      .icon(FileXMarkIcon)
      .child(
        S.documentList()
          .title("Uten kategori")
          .schemaType(docType)
          .filter(`_type == $docType && !defined(kategori)`)
          .params({ docType })
          .apiVersion(SANITY_API_VERSION),
      ),
    S.listItem()
      .title("Artikler med gamle kategorier")
      .icon(FileXMarkIcon)
      .child(
        S.documentList()
          .title("Artikler med gamle kategorier")
          .schemaType(docType)
          .filter(
            `_type == $docType && defined(kategori) && !(kategori in $kat)`,
          )
          .params({ docType, kat: categories.map((x) => x.value) })
          .apiVersion(SANITY_API_VERSION),
      ),
  ];
}

/**
 * Landingsside entry for a content vertical. The document id is derived from the
 * schema type (`<schemaType>_id1`) to keep the singleton document stable.
 */
export function landingssideItem(
  S: StructureBuilder,
  schemaType: string,
  icon: ComponentType = HouseIcon,
) {
  return S.documentListItem()
    .title("Landingsside")
    .icon(icon)
    .schemaType(schemaType)
    .id(`${schemaType}_id1`);
}
