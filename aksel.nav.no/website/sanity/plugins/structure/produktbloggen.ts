import { StructureBuilder } from "sanity/structure";
import { NewspaperIcon } from "@navikt/aksel-icons";
import { bloggKategorier } from "@/sanity/config";
import { Panes } from "./panes";
import { listDraftArticles, listPublishedArticles } from "./structure.util";

export function produktBloggenStructure(S: StructureBuilder) {
  return S.listItem()
    .title("Produktbloggen")
    .icon(NewspaperIcon)
    .child(
      S.list()
        .title("Produktbloggen")
        .items([
          S.documentListItem({
            displayOptions: { showIcon: false },
            id: "blogg_landingpage",
            schemaType: "blogg_landingsside",
          })
            .title(`Landingsside`)
            .schemaType(`blogg_landingsside`)
            .id(`blogg_landingsside_id1`),
          S.divider(),
          listPublishedArticles(S, "aksel_blogg"),
          listDraftArticles(S, "aksel_blogg"),
          S.divider(),
          ...Panes("aksel_blogg", [...bloggKategorier], S),
        ]),
    );
}
