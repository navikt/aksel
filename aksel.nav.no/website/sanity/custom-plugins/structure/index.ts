import {
  Baggage,
  EyeScreened,
  Facilitet,
  LightBulb,
  Picture,
  SignLanguage,
  System,
} from "@navikt/ds-icons";
import {
  bloggKategorier,
  grunnleggendeKategorier,
  komponentKategorier,
  prinsippKategorier,
} from "../../config";

import { GodPraksisPanes } from "./god-praksis";
import { PanesWithCount } from "./with-count";

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
  "aksel_blogg",
  "blogg_landingsside",
  "prinsipper_landingsside",
  "aksel_prinsipp",
  "aksel_tema",
  "godpraksis_landingsside",
  "aksel_artikkel",
];

export const structure = async (S, { currentUser, getClient, ...rest }) => {
  const ids = await getClient({ apiVersion: "2021-06-07" })
    .fetch(`*[_type == "editor"]{
      _id,
      user_id
    }`);

  const editor = ids.find(({ user_id }) => user_id?.current === currentUser.id);

  /* let tema = await getClient({ apiVersion: "2021-06-07" }).fetch(
    `*[_type == "aksel_tema" && defined(seksjoner)]{title,seksjoner}`
  );
  tema = tema.filter((x) => x?.seksjoner?.length > 0);
  tema = tema.map((x) => ({
    title: x.title,
    sider: x.seksjoner.reduce((b, n) => [...b, ...(n?.sider ?? [])], []),
  })); */

  return S.list()
    .title("Innholdstyper")
    .items([
      ...(editor
        ? [
            S.documentListItem().schemaType(`editor`).id(editor._id),
            S.divider(),
          ]
        : []),
      S.listItem()
        .title("God Praksis")
        .icon(SignLanguage)
        .child(
          S.list()
            .title("God Praksis")
            .items([
              S.documentListItem()
                .title(`Landingsside`)
                .schemaType(`godpraksis_landingsside`)
                .id(`godpraksis_landingsside_id1`),
              S.divider(),
              ...(await GodPraksisPanes(getClient, S)),
            ])
        ),
      S.listItem()
        .title("Prinsipper")
        .icon(LightBulb)
        .child(
          S.list()
            .title("Prinsipper")
            .items([
              S.documentListItem()
                .title(`Landingsside`)
                .schemaType(`prinsipper_landingsside`)
                .id(`prinsipper_landingsside_id1`),
              S.divider(),
              ...prinsippKategorier.map(({ value, title }) =>
                S.listItem()
                  .title(title)
                  .child(
                    S.documentList()
                      .title(title)
                      .filter(
                        `_type == 'aksel_prinsipp' && $value == prinsipp.prinsippvalg`
                      )
                      .params({ value })
                  )
              ),
              S.listItem()
                .title("Alle artikler")
                .child(S.documentTypeList("aksel_prinsipp")),
            ])
        ),
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
              ...(await PanesWithCount(
                "ds_artikkel",
                grunnleggendeKategorier,
                getClient,
                S
              )),
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
              ...(await PanesWithCount(
                "komponent_artikkel",
                komponentKategorier,
                getClient,
                S
              )),
            ])
        ),
      S.listItem()
        .title("Produktbloggen")
        .icon(Baggage)
        .child(
          S.list()
            .title("Produktbloggen")
            .items([
              S.documentListItem()
                .title(`Landingsside`)
                .schemaType(`blogg_landingsside`)
                .id(`blogg_landingsside_id1`),
              S.divider(),
              ...(await PanesWithCount(
                "aksel_blogg",
                bloggKategorier,
                getClient,
                S
              )),
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

      S.divider(),
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
    S.view.component((p) => <Test {...p} form={S.view.form()} />).title("JSON"),
  ]);
}; */
