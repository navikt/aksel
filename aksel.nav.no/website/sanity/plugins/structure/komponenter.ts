import { StructureBuilder } from "sanity/structure";
import { ComponentIcon } from "@navikt/aksel-icons";
import { komponentKategorier } from "@/sanity/config";
import { Panes } from "./panes";
import { listDraftArticles, listOutdatedArticles } from "./structure.util";

export function komponenterStructure(S: StructureBuilder) {
  return S.listItem()
    .title("Komponenter")
    .icon(ComponentIcon)
    .child(
      S.list()
        .title("Komponenter")
        .items([
          S.documentListItem({
            displayOptions: { showIcon: false },
            id: "komponenter_landingpage",
            schemaType: "komponenter_landingsside",
          })
            .title(`Landingsside`)
            .schemaType(`komponenter_landingsside`)
            .id(`komponenter_landingsside_id1`),
          S.divider(),
          listDraftArticles(S, "komponent_artikkel"),
          listOutdatedArticles(S, "komponent_artikkel", 180),

          S.divider(),
          ...Panes("komponent_artikkel", [...komponentKategorier], S),
        ]),
    );
}
