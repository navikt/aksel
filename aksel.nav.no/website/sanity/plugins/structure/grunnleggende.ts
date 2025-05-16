import { StructureBuilder } from "sanity/structure";
import { HouseIcon, TasklistIcon, TokenIcon } from "@navikt/aksel-icons";
import { grunnleggendeKategorier } from "@/sanity/config";
import { Panes } from "./panes";
import { listDraftArticles, listOutdatedArticles } from "./structure.util";

export function grunnleggendeStructure(S: StructureBuilder) {
  return S.listItem()
    .title("Grunnleggende")
    .icon(TokenIcon)
    .child(
      S.list()
        .title("Grunnleggende")
        .items([
          S.documentListItem()
            .title("Landingsside")
            .icon(HouseIcon)
            .schemaType("grunnleggende_landingsside")
            .id("grunnleggende_landingsside_id1"),
          S.divider(),
          listDraftArticles(S, "ds_artikkel"),
          listOutdatedArticles(S, "ds_artikkel", 180),

          S.divider(),
          ...Panes("ds_artikkel", [...grunnleggendeKategorier], S),

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
