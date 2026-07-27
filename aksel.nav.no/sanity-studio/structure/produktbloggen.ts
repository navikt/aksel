import type { StructureBuilder } from "sanity/structure";
import { NewspaperIcon } from "@navikt/aksel-icons";
import { SchemaConfig } from "../schema/schema.config";
import {
  categoryPanes,
  landingssideItem,
  listDraftArticles,
  listPublishedArticles,
} from "./article-lists";

export function produktBloggenStructure(S: StructureBuilder) {
  return S.listItem()
    .title("Produktbloggen")
    .icon(NewspaperIcon)
    .child(
      S.list()
        .title("Produktbloggen")
        .items([
          landingssideItem(S, "blogg_landingsside"),
          S.divider(),
          listPublishedArticles(S, "aksel_blogg"),
          listDraftArticles(S, "aksel_blogg"),
          S.divider(),
          ...categoryPanes(S, "aksel_blogg", SchemaConfig.bloggKategorier),
        ]),
    );
}
