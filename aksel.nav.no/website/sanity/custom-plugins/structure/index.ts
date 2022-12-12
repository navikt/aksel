import { FileContent, Picture } from "@navikt/ds-icons";
import {
  AccessDeniedIcon,
  BookIcon,
  BulbOutlineIcon,
  JoystickIcon,
  OkHandIcon,
  TokenIcon,
} from "@sanity/icons";
import { Role } from "sanity";
import Iframe from "sanity-plugin-iframe-pane";
import { StructureBuilder } from "sanity/desk";
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
  "komponenter_landingsside",
  "media.tag",
  "editor",
  "aksel_forside",
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
  "skrivehjelp",
  "publication_flow",
];

export const structure = async (
  S: StructureBuilder,
  { currentUser, getClient, ...rest }
) => {
  const ids = await getClient({ apiVersion: "2021-06-07" })
    .fetch(`*[_type == "editor"]{
      _id,
      user_id
    }`);

  const editor = ids.find(({ user_id }) => user_id?.current === currentUser.id);
  const adminOrDev = currentUser.roles.find((x) =>
    ["developer", "administrator"].includes(x.name)
  );
  const hasBloggerRole = currentUser.roles.find((x) => x.name === "blogger");
  const hasGrunnleggendeRole = currentUser.roles.find(
    (x: Role) => x.name === "grunnleggende"
  );
  const hasKomponenterRole = currentUser.roles.find(
    (x: Role) => x.name === "komponenter"
  );
  const hasPrinsipperRole = currentUser.roles.find(
    (x: Role) => x.name === "prinsipper"
  );
  const hasGodPraksisForfatterRole = currentUser.roles.find(
    (x: Role) => x.name === "god_praksis_forfatter"
  );

  return S.list()
    .title("Innholdstyper")
    .items([
      ...(editor
        ? [
            S.documentListItem().schemaType(`editor`).id(editor._id),
            S.divider(),
          ]
        : []),
      ...(hasGodPraksisForfatterRole || adminOrDev
        ? [
            S.listItem()
              .title("God Praksis")
              .icon(OkHandIcon)
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
          ]
        : []),
      ...(hasPrinsipperRole || adminOrDev
        ? [
            S.listItem()
              .title("Prinsipper")
              .icon(BulbOutlineIcon)
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
          ]
        : []),
      ...(hasGrunnleggendeRole || adminOrDev
        ? [
            S.listItem()
              .title("Grunnleggende")
              .icon(TokenIcon)
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
          ]
        : []),
      ...(hasKomponenterRole || adminOrDev
        ? [
            S.listItem()
              .title("Komponenter")
              .icon(JoystickIcon)
              .child(
                S.list()
                  .title("Komponenter")
                  .items([
                    S.documentListItem()
                      .title(`Landingsside`)
                      .schemaType(`komponenter_landingsside`)
                      .id(`komponenter_landingsside_id1`),
                    S.divider(),
                    ...(await PanesWithCount(
                      "komponent_artikkel",
                      komponentKategorier,
                      getClient,
                      S
                    )),
                  ])
              ),
          ]
        : []),
      ...(hasBloggerRole || adminOrDev
        ? [
            S.listItem()
              .title("Produktbloggen")
              .icon(BookIcon)
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
          ]
        : []),
      ...(adminOrDev
        ? [
            S.divider(),
            S.listItem()
              .title("Admin")
              .icon(AccessDeniedIcon)
              .child(
                S.list()
                  .title("Admin")
                  .items([
                    S.documentListItem()
                      .title(`Forside`)
                      .schemaType(`aksel_forside`)
                      .icon(Picture)
                      .id(`aksel_forside_dokument`),
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
                        S.documentList()
                          .title("Props")
                          .filter(`_type == 'ds_props'`)
                      ),
                    S.documentListItem()
                      .title(`Skrivehjelp`)
                      .schemaType(`skrivehjelp`)
                      .icon(FileContent)
                      .id(`skrivehjelp`),
                    S.documentListItem()
                      .title(`Publiseringsflyt`)
                      .schemaType(`publication_flow`)
                      .icon(FileContent)
                      .id(`publication_flow`),
                  ])
              ),
          ]
        : []),

      S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem) => !filtered.includes(listItem.getId())
      ),
    ]);
};

const previews = [
  "aksel_artikkel",
  "komponent_artikkel",
  "ds_artikkel",
  "aksel_blogg",
  "aksel_prinsipp",
  "aksel_standalone",
];

const landingsider = [
  { name: "godpraksis_landingsside", url: "god-praksis" },
  { name: "blogg_landingsside", url: "produktbloggen" },
  { name: "grunnleggende_landingsside", url: "grunnleggende" },
  { name: "komponenter_landingsside", url: "komponenter" },
  { name: "prinsipper_landingsside", url: "prinsipper" },
];

export const resolveProductionUrl = (doc) => {
  const basePath = "https://aksel.nav.no";
  const devPath = "http://localhost:3000";

  if (previews.includes(doc._type)) {
    const slug = doc.slug?.current;
    const previewUrl = `/preview/${slug}`;
    if (!slug) {
      return "";
    }
    return process.env.NODE_ENV === "production"
      ? `${basePath}${previewUrl}`
      : `${devPath}${previewUrl}`;
  }
  if (landingsider.find((x) => x.name === doc._type)) {
    const slug = landingsider.find((x) => x.name === doc._type).url;
    const previewUrl = `/preview/${slug}`;
    if (!slug) {
      return "";
    }
    return process.env.NODE_ENV === "production"
      ? `${basePath}${previewUrl}`
      : `${devPath}${previewUrl}`;
  }

  if ("aksel_tema" === doc._type) {
    const slug = doc.slug?.current;
    const previewUrl = `/preview/god-praksis/${slug}`;
    if (!slug) {
      return "";
    }
    return process.env.NODE_ENV === "production"
      ? `${basePath}${previewUrl}`
      : `${devPath}${previewUrl}`;
  }
};

export const defaultDocumentNode = (S, { schemaType }) => {
  if (
    [...previews, "aksel_tema", ...landingsider.map((x) => x.name)].includes(
      schemaType
    )
  ) {
    return S.document().views([
      S.view.form(),
      S.view
        .component(Iframe)
        .options({
          url: (doc) => resolveProductionUrl(doc),
          reload: {
            button: true,
            revision: true,
          },
        })
        .title("Preview"),
    ]);
  }
  return S.document().views([S.view.form()]);
};
