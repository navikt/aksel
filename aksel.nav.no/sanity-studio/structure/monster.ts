import type { StructureBuilder } from "sanity/structure";
import { RectangleSectionsIcon } from "@navikt/aksel-icons";
import { SchemaConfig } from "../schema/schema.config";
import {
  categoryPanes,
  landingssideItem,
  listDraftArticles,
  listOutdatedArticles,
} from "./article-lists";

export function monsterStructure(S: StructureBuilder) {
  return S.listItem()
    .title("Mønster og Maler")
    .icon(RectangleSectionsIcon)
    .child(
      S.list()
        .title("Mønster og Maler")
        .items([
          landingssideItem(S, "templates_landingsside"),
          S.divider(),
          listDraftArticles(S, "templates_artikkel"),
          listOutdatedArticles(S, "templates_artikkel", 180),

          S.divider(),
          ...categoryPanes(
            S,
            "templates_artikkel",
            SchemaConfig.templatesKategorier,
          ),
        ]),
    );
}
