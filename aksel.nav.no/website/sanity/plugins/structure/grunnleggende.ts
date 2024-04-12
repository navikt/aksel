import { StructureBuilder } from "sanity/structure";
import { TokenIcon } from "@navikt/aksel-icons";
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
          S.documentListItem({
            displayOptions: { showIcon: false },
            id: "grunnleggende_landingpage",
            schemaType: "grunnleggende_landingsside",
          })
            .title(`Landingsside`)
            .schemaType(`grunnleggende_landingsside`)
            .id(`grunnleggende_landingsside_id1`),
          S.divider(),
          listDraftArticles(S, "ds_artikkel"),
          listOutdatedArticles(S, "ds_artikkel", 180),

          S.divider(),
          ...Panes("ds_artikkel", [...grunnleggendeKategorier], S),
        ]),
    );
}
