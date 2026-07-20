import type { StructureBuilder } from "sanity/structure";
import { TasklistIcon, TokenIcon } from "@navikt/aksel-icons";
import { grunnleggendeKategorier } from "../schema/schema.config";
import {
  categoryPanes,
  landingssideItem,
  listDraftArticles,
  listOutdatedArticles,
} from "./article-lists";

export function grunnleggendeStructure(S: StructureBuilder) {
  return S.listItem()
    .title("Grunnleggende")
    .icon(TokenIcon)
    .child(
      S.list()
        .title("Grunnleggende")
        .items([
          landingssideItem(S, "grunnleggende_landingsside"),
          S.divider(),
          listDraftArticles(S, "ds_artikkel"),
          listOutdatedArticles(S, "ds_artikkel", 180),

          S.divider(),
          ...categoryPanes(S, "ds_artikkel", grunnleggendeKategorier),

          S.divider(),
          S.listItem()
            .title("Endringslogg")
            .icon(TasklistIcon)
            .child(
              S.documentTypeList("ds_endringslogg_artikkel").title(
                "Endringslogg",
              ),
            ),
        ]),
    );
}
