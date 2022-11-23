import {
  Facilitet,
  FileContent,
  Findout,
  Folder,
  Picture,
  Place,
  Ruler,
  Task,
} from "@navikt/ds-icons";
import S from "@sanity/desk-tool/structure-builder";
import client from "part:@sanity/base/client";
import React from "react";
import { createSuperPane } from "sanity-super-pane";

export const dsPanel = async (roles) => {
  const role = roles.some(({ name }) => "aksel-editor" === name);

  if (role) {
    return null;
  } else {
    return S.listItem()
      .title("Designsystemet")
      .icon(() => <Facilitet />)
      .child(
        S.list()
          .title("Designsystem")
          .items([
            S.listItem()
              .title("Komponentsider")
              .icon(() => <Facilitet />)
              .child(createSuperPane("komponent_artikkel")),
            S.listItem()
              .title("Artikler")
              .icon(() => <FileContent />)
              .child(createSuperPane("ds_artikkel")),
            S.divider(),
            S.documentListItem()
              .title(`Navigasjon`)
              .schemaType(`ds_navigation`)
              .icon(() => <Place />)
              .id(`ds_navigationid`),

            S.listItem()
              .title("Publiserte sider ikke i navigasjon")
              .child(async (): Promise<any> => {
                const doc = await client.fetch(
                  `*[_id == 'ds_navigationid'][0]{
                          headings[]{
                            title,
                            menu
                          }
                        }`
                );
                if (!doc.headings) {
                  return [];
                }

                let allIds = "";
                try {
                  allIds = doc.headings
                    .map((heading) =>
                      heading.menu
                        .filter((item) => item._type === "item")
                        .map((item) => item.link._ref)
                        .map((x) => `"${x}"`)
                        .join(",")
                    )
                    .join(",");
                } catch (e) {
                  console.log(e);
                }

                return S.documentList()
                  .title("Sider ikke i navigasjon")
                  .filter(
                    `!(_id in [${allIds}]) && !(_id in path('drafts.**')) && _type in ["komponent_artikkel", "ds_artikkel"]`
                  );
              }),
            S.documentListItem()
              .title(`Forside`)
              .schemaType(`ds_frontpage`)
              .icon(() => <Picture />)
              .id(`frontpage_designsystem`),
            S.divider(),
            S.listItem()
              .title("Autogenerert data")
              .child(
                S.list()
                  .title("Autogenerert data")
                  .items([
                    S.listItem()
                      .title("Eksempler")
                      .icon(() => <span>{`EX`}</span>)
                      .child(S.documentTypeList("kode_eksempler_fil")),
                    S.listItem()
                      .title("Fargekategorier")
                      .icon(() => <Folder />)
                      .child(S.documentTypeList("ds_color_categories")),
                    S.listItem()
                      .title("Props")
                      .icon(() => <Folder />)
                      .child(S.documentTypeList("ds_props")),
                    S.listItem()
                      .title("Token-kategorier")
                      .icon(() => <Folder />)
                      .child(S.documentTypeList("token_kategori")),
                  ])
              ),
            S.divider(),
            S.documentListItem()
              .title(`Komponent-template`)
              .schemaType(`ds_component_template`)
              .icon(() => <Task />)
              .id(`ds_component_templateid`),
          ])
      );
  }
};
