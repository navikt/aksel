import { StructureBuilder } from "sanity/structure";
import { HouseIcon, RectangleSectionsIcon } from "@navikt/aksel-icons";
import { templatesKategorier } from "@/sanity/config";
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
          S.documentListItem()
            .title(`Landingsside`)
            .icon(HouseIcon)
            .schemaType(`templates_landingsside`)
            .id(`templates_landingsside_id1`),
          S.divider(),
          listDraftArticles(S, "templates_artikkel"),
          listOutdatedArticles(S, "templates_artikkel", 180),

          S.divider(),
          ...Panes("templates_artikkel", [...templatesKategorier], S),
        ]),
    );
}
