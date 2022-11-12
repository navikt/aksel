import { Picture } from "@navikt/ds-icons";
import S from "@sanity/desk-tool/structure-builder";

import React from "react";

export const adminPanel = async (roles) =>
  roles.find((x) => x.name === "administrator") &&
  S.listItem()
    .title("Admin")
    .child(
      S.list()
        .title("Admin")
        .items([
          S.documentListItem()
            .title(`Forside Aksel`)
            .schemaType(`vk_frontpage`)
            .icon(() => <Picture />)
            .id(`frontpage_vk_praksis`),
          S.listItem()
            .title("Standalone-sider")
            .child(S.documentTypeList("aksel_standalone")),
          S.listItem().title("Redirects").child(S.documentTypeList("redirect")),
        ])
    );
