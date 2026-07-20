import type { StructureResolver } from "sanity/structure";
import { FilesIcon } from "@navikt/aksel-icons";
import { isAdminOrDev } from "./access";
import { adminStructure } from "./admin";
import { godPraksisStructure } from "./god-praksis";
import { grunnleggendeStructure } from "./grunnleggende";
import { komponenterStructure } from "./komponenter";
import { monsterStructure } from "./monster";
import { prinsipperStructure } from "./prinsipper";
import { produktBloggenStructure } from "./produktbloggen";

export { defaultDocumentNode } from "./document-node";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Innhold")
    .items([
      godPraksisStructure(S),
      grunnleggendeStructure(S),
      komponenterStructure(S),
      monsterStructure(S),
      produktBloggenStructure(S),
      prinsipperStructure(S),
      S.divider(),
      adminStructure(S),
      /**
       * Admin-only catch-all with every document type, so admins can reach any
       * document without maintaining an exclusion list.
       */
      ...(isAdminOrDev(S)
        ? [
            S.listItem()
              .title("Alle dokumenttyper")
              .icon(FilesIcon)
              .child(
                S.list()
                  .title("Alle dokumenttyper")
                  .items(S.documentTypeListItems()),
              ),
          ]
        : []),
    ]);
