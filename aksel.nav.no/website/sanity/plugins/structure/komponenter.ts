import type { StructureBuilder } from "sanity/structure";
import { ComponentIcon } from "@navikt/aksel-icons";
import { komponentKategorier } from "@/sanity/config";
import {
  categoryPanes,
  landingssideItem,
  listDraftArticles,
  listOutdatedArticles,
} from "./article-lists";

export function komponenterStructure(S: StructureBuilder) {
  return S.listItem()
    .title("Komponenter")
    .icon(ComponentIcon)
    .child(
      S.list()
        .title("Komponenter")
        .items([
          landingssideItem(S, "komponenter_landingsside"),
          S.divider(),
          listDraftArticles(S, "komponent_artikkel"),
          listOutdatedArticles(S, "komponent_artikkel", 180),

          S.divider(),
          ...categoryPanes(S, "komponent_artikkel", komponentKategorier),
        ]),
    );
}
