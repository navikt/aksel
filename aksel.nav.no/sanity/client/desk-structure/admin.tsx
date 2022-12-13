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
          S.listItem()
            .title("Standalone-sider")
            .child(S.documentTypeList("aksel_standalone")),
          S.listItem().title("Redirects").child(S.documentTypeList("redirect")),
        ])
    );
