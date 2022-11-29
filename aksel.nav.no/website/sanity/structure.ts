import { EyeScreened, Facilitet, Picture, System } from "@navikt/ds-icons";
import { grunnleggendeKategorier, komponentKategorier } from "./config";
/* import { WebPreview, JsonView } from './previews' */

const filtered = [
  "ds_artikkel",
  "komponent_artikkel",
  "grunnleggende_landingsside",
  "komponent_landingsside",
  "media.tag",
  "editor",
  "vk_frontpage",
  "redirect",
  "token_kategori",
  "kode_eksempler_fil",
  "ds_props",
  "aksel_standalone",
];

export const structure = (S, context) => {
  console.log(context);
  return S.list()
    .title("Innholdstyper")
    .items([
      S.listItem()
        .title("Grunnleggende")
        .icon(System)
        .child(
          S.list()
            .title("Grunnleggende")
            .items([
              S.documentListItem()
                .title(`Landingsside`)
                .schemaType(`grunnleggende_landingsside`)
                .id(`grunnleggende_landingsside_id1`),
              S.divider(),
              ...grunnleggendeKategorier.map((kat) => {
                return S.listItem()
                  .title(kat[0].toUpperCase() + kat.slice(1))
                  .child(
                    S.documentList()
                      .title(kat)
                      .filter(`_type == 'ds_artikkel' && $kat == kategori`)
                      .params({ kat })
                  );
              }),
              S.listItem()
                .title("Uten kategori")
                .child(
                  S.documentList()
                    .title("Uten kategori")
                    .filter(`_type == 'ds_artikkel' && !defined(kategori)`)
                ),
            ])
        ),
      S.listItem()
        .title("Komponenter")
        .icon(Facilitet)
        .child(
          S.list()
            .title("Komponenter")
            .items([
              S.documentListItem()
                .title(`Landingsside`)
                .schemaType(`komponent_landingsside`)
                .id(`komponent_landingsside_id1`),
              S.divider(),
              ...komponentKategorier.map((kat) => {
                return S.listItem()
                  .title(kat[0].toUpperCase() + kat.slice(1))
                  .child(
                    S.documentList()
                      .title(kat)
                      .filter(
                        `_type == 'komponent_artikkel' && $kat == kategori`
                      )
                      .params({ kat })
                  );
              }),
              S.listItem()
                .title("Uten kategori")
                .child(
                  S.documentList()
                    .title("Uten kategori")
                    .filter(
                      `_type == 'komponent_artikkel' && !defined(kategori)`
                    )
                ),
            ])
        ),
      S.divider(),
      S.listItem()
        .title("Admin")
        .icon(EyeScreened)
        .child(
          S.list()
            .title("Admin")
            .items([
              S.documentListItem()
                .title(`Forside`)
                .schemaType(`vk_frontpage`)
                .icon(Picture)
                .id(`frontpage_vk_praksis`),
              S.listItem()
                .title("Standalone-sider")
                .child(
                  S.documentList()
                    .title("Sider")
                    .filter(`_type == 'aksel_standalone'`)
                ),
              S.listItem()
                .title("Forfattere")
                .child(
                  S.documentList()
                    .title("Forfattere")
                    .filter(`_type == 'editor'`)
                ),
              S.listItem()
                .title("Redirects")
                .child(
                  S.documentList()
                    .title("Redirects")
                    .filter(`_type == 'redirect'`)
                ),
              S.listItem()
                .title("Komponent-eksempler Designsystemet")
                .child(
                  S.documentList()
                    .title("Eksempler")
                    .filter(`_type == 'kode_eksempler_fil'`)
                ),
              S.listItem()
                .title("Token-grupper Designsystemet")
                .child(
                  S.documentList()
                    .title("Grupper")
                    .filter(`_type == 'token_kategori'`)
                ),
              S.listItem()
                .title("Props Designsystemet")
                .child(
                  S.documentList().title("Props").filter(`_type == 'ds_props'`)
                ),
            ])
        ),

      ...S.documentTypeListItems().filter(
        (listItem) => !filtered.includes(listItem.getId())
      ),
    ]);
};

/* export const defaultDocumentNode = (S, { schemaType }) => {
  if (schemaType === "post") {
    return S.document().views([
      S.view.form(),
      S.view.component(WebPreview).title("Web"),
    ]);
  }

  return S.document().views([
    S.view.form(),
    S.view.component(JsonView).title("JSON"),
  ]);
}; */
