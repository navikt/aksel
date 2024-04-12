import { StructureBuilder } from "sanity/structure";
import { RectangleSectionsIcon } from "@navikt/aksel-icons";
import { komponentKategorier } from "@/sanity/config";
import { Panes } from "./panes";
import { listDraftArticles, listOutdatedArticles } from "./structure.util";

export function monsterStructure(S: StructureBuilder) {
  return S.listItem()
    .title("Mønster og Maler")
    .icon(RectangleSectionsIcon)
    .child(
      S.list()
        .title("Mønster og Maler")
        .items([
          S.documentListItem({
            displayOptions: { showIcon: false },
            id: "templates_landingpage",
            schemaType: "templates_landingsside",
          })
            .title(`Landingsside`)
            .schemaType(`templates_landingsside`)
            .id(`templates_landingsside_id1`),
          S.divider(),
          listDraftArticles(S, "templates_artikkel"),
          listOutdatedArticles(S, "templates_artikkel", 180),

          S.divider(),
          ...Panes("templates_artikkel", [...komponentKategorier], S),
        ]),
    );
}
