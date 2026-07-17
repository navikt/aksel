import type { StructureBuilder } from "sanity/structure";
import { LightBulbIcon } from "@navikt/aksel-icons";
import { SANITY_API_VERSION, prinsippKategorier } from "@/sanity/config";
import { landingssideItem } from "./article-lists";

export function prinsipperStructure(S: StructureBuilder) {
  return S.listItem()
    .title("Prinsipper")
    .icon(LightBulbIcon)
    .child(
      S.list()
        .title("Prinsipper")
        .items([
          landingssideItem(S, "prinsipper_landingsside"),
          S.divider(),
          ...prinsippKategorier.map(({ value, title }) =>
            S.listItem()
              .title(title)
              .child(
                S.documentList()
                  .title(title)
                  .filter(
                    `_type == 'aksel_prinsipp' && $value == prinsipp.prinsippvalg`,
                  )
                  .params({ value })
                  .apiVersion(SANITY_API_VERSION),
              ),
          ),
          S.listItem()
            .title("Alle artikler")
            .child(S.documentTypeList("aksel_prinsipp")),
        ]),
    );
}
