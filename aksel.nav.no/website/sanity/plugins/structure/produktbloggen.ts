import { StructureBuilder } from "sanity/structure";
import { HouseIcon, NewspaperIcon } from "@navikt/aksel-icons";
import { bloggKategorier } from "@/sanity/config";
import { Panes } from "./panes";
import { listMyDraftArticles, listPublishedArticles } from "./structure.util";

export function produktBloggenStructure(S: StructureBuilder) {
  return S.listItem()
    .title("Produktbloggen")
    .icon(NewspaperIcon)
    .child(
      S.list()
        .title("Produktbloggen")
        .items([
          S.documentListItem()
            .title(`Landingsside`)
            .icon(HouseIcon)
            .schemaType(`blogg_landingsside`)
            .id(`blogg_landingsside_id1`),
          S.divider(),
          listPublishedArticles(S, "aksel_blogg"),
          listMyDraftArticles(S, "aksel_blogg"),
          S.divider(),
          ...Panes("aksel_blogg", [...bloggKategorier], S),
        ]),
    );
}
