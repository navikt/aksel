import { StructureResolver } from "sanity/structure";
import {
  CircleSlashIcon,
  ComponentIcon,
  EyeIcon,
  FileTextIcon,
  ImageIcon,
  LightBulbIcon,
  NewspaperIcon,
  PencilBoardIcon,
  RectangleSectionsIcon,
  TokenIcon,
} from "@navikt/aksel-icons";
import {
  SANITY_API_VERSION,
  bloggKategorier,
  grunnleggendeKategorier,
  komponentKategorier,
  landingsider,
  previews,
  prinsippKategorier,
  templatesKategorier,
} from "../../config";
import { Iframe } from "./IFrame";
import { GodPraksisPanes } from "./god-praksis";
import { GodPraksisPanesOld } from "./god-praksis.old";
import { Panes } from "./panes";

/**
 * List of document-types added to structure.
 * If not added to `filtered`, they will be shown as an entry on main studio view
 */
const filtered = [
  "ds_artikkel",
  "komponent_artikkel",
  "grunnleggende_landingsside",
  "templates_landingsside",
  "templates_artikkel",
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
  "aksel_feedback",
  "article_views",
  "gp.tema",
  "gp.tema.undertema",
  "gp.innholdstype",
];

export const structure: StructureResolver = async (
  S,
  { currentUser, getClient },
) => {
  const editors = await getClient({ apiVersion: SANITY_API_VERSION })
    .fetch(`*[_type == "editor"]{
      _id,
      email,
      alt_email
    }`);

  const editor = editors.find(
    ({ email, alt_email }) =>
      email === currentUser?.email || alt_email === currentUser?.email,
  );
  const adminOrDev = currentUser?.roles.find((x) =>
    ["developer", "administrator"].includes(x.name),
  );
  const developer = currentUser?.roles.find((x) =>
    ["developer"].includes(x.name),
  );

  return S.list()
    .title("Innholdstyper")
    .items([
      ...(editor
        ? [S.documentListItem().schemaType(`editor`).id(editor._id)]
        : []),

      ...(editor ? [S.divider()] : []),
      S.listItem()
        .title("God Praksis (ny)")
        .icon(PencilBoardIcon)
        .child(
          S.list()
            .title("God Praksis")
            .items([
              S.documentListItem()
                .title(`Landingsside`)
                .schemaType(`godpraksis_landingsside`)
                .id(`godpraksis_landingsside_id1`),
              S.divider(),
              ...GodPraksisPanes(S),
            ]),
        ),
      S.listItem()
        .title("God Praksis")
        .icon(PencilBoardIcon)
        .child(
          S.list()
            .title("God Praksis")
            .items([
              S.documentListItem()
                .title(`Landingsside`)
                .schemaType(`godpraksis_landingsside`)
                .id(`godpraksis_landingsside_id1`),
              S.divider(),
              ...(await GodPraksisPanesOld(getClient, S)),
            ]),
        ),
      S.listItem()
        .title("Prinsipper")
        .icon(LightBulbIcon)
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
                S.listItem().title(title).child(
                  S.documentList()
                    .title(title)
                    .filter(
                      `_type == 'aksel_prinsipp' && $value == prinsipp.prinsippvalg`,
                    )
                    .params({ value })
                    .apiVersion(SANITY_API_VERSION),
                  /* .menuItems([
                        ...S.documentTypeList("aksel_prinsipp").getMenuItems(),
                      ]) */
                ),
              ),
              S.listItem()
                .title("Alle artikler")
                .child(S.documentTypeList("aksel_prinsipp")),
            ]),
        ),
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
              ...Panes("ds_artikkel", grunnleggendeKategorier, S),
            ]),
        ),
      S.listItem()
        .title("Mønster og Maler")
        .icon(RectangleSectionsIcon)
        .child(
          S.list()
            .title("Mønster og Maler")
            .items([
              S.documentListItem()
                .title(`Landingsside`)
                .schemaType(`templates_landingsside`)
                .id(`templates_landingsside_id1`),
              S.divider(),
              ...Panes("templates_artikkel", templatesKategorier, S),
            ]),
        ),
      S.listItem()
        .title("Komponenter")
        .icon(ComponentIcon)
        .child(
          S.list()
            .title("Komponenter")
            .items([
              S.documentListItem()
                .title(`Landingsside`)
                .schemaType(`komponenter_landingsside`)
                .id(`komponenter_landingsside_id1`),
              S.divider(),
              ...Panes("komponent_artikkel", komponentKategorier, S),
            ]),
        ),
      S.listItem()
        .title("Produktbloggen")
        .icon(NewspaperIcon)
        .child(
          S.list()
            .title("Produktbloggen")
            .items([
              S.documentListItem()
                .title(`Landingsside`)
                .schemaType(`blogg_landingsside`)
                .id(`blogg_landingsside_id1`),
              S.divider(),
              ...Panes("aksel_blogg", [...bloggKategorier], S),
            ]),
        ),
      S.divider(),
      S.listItem()
        .title("Forfattere")
        .child(
          S.documentList()
            .title("Forfattere")
            .filter(`_type == 'editor'`)
            .apiVersion(SANITY_API_VERSION),
        ),
      ...(adminOrDev
        ? [
            S.divider(),
            S.listItem()
              .title("Admin")
              .icon(CircleSlashIcon)
              .child(
                S.list()
                  .title("Admin")
                  .items([
                    S.documentListItem()
                      .title(`Forside`)
                      .schemaType(`aksel_forside`)
                      .icon(ImageIcon)
                      .id(`aksel_forside_dokument`),

                    S.listItem().title("Standalone-sider").child(
                      S.documentList()
                        .title("Sider")
                        .filter(`_type == 'aksel_standalone'`)
                        .apiVersion(SANITY_API_VERSION),
                      /* .menuItems([
                            ...S.documentTypeList(
                              "aksel_standalone"
                            ).getMenuItems(),
                          ]) */
                    ),
                    S.listItem().title("Redirects").child(
                      S.documentList()
                        .title("Redirects")
                        .filter(`_type == 'redirect'`)
                        .apiVersion(SANITY_API_VERSION),
                      /* .menuItems([
                            ...S.documentTypeList("redirect").getMenuItems(),
                          ]) */
                    ),
                    S.listItem()
                      .title("Eksempler/Templates")
                      .child(
                        S.documentList()
                          .title("Eksempler")
                          .filter(`_type == 'kode_eksempler_fil'`)
                          .apiVersion(SANITY_API_VERSION),
                      ),
                    S.listItem()
                      .title("Token-grupper Designsystemet")
                      .child(
                        S.documentList()
                          .title("Grupper")
                          .filter(`_type == 'token_kategori'`)
                          .apiVersion(SANITY_API_VERSION),
                      ),
                    S.listItem()
                      .title("Props Designsystemet")
                      .child(
                        S.documentList()
                          .title("Props")
                          .filter(`_type == 'ds_props'`)
                          .apiVersion(SANITY_API_VERSION),
                      ),
                    S.documentListItem()
                      .title(`Skrivehjelp`)
                      .schemaType(`skrivehjelp`)
                      .icon(FileTextIcon)
                      .id(`skrivehjelp`),
                    S.documentListItem()
                      .title(`Publiseringsflyt`)
                      .schemaType(`publication_flow`)
                      .icon(FileTextIcon)
                      .id(`publication_flow`),
                    S.listItem()
                      .title("Artikkelvisninger")
                      .icon(EyeIcon)
                      .child(
                        S.documentList()
                          .title("Artikkelvisninger")
                          .filter(`_type == 'article_views'`)
                          .apiVersion(SANITY_API_VERSION)
                          .menuItems([
                            ...(S.documentTypeList(
                              "article_views",
                            ).getMenuItems() ?? []),
                          ]),
                      ),
                  ]),
              ),
          ]
        : []),

      S.divider(),
      ...(developer
        ? S.documentTypeListItems().filter(
            (listItem) => !filtered.includes(listItem.getId() ?? ""),
          )
        : []),
    ]);
};

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
    const slug = landingsider.find((x) => x.name === doc._type)?.url;
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
      schemaType,
    )
  ) {
    return S.document().views([
      S.view.form(),

      S.view
        .component(Iframe)
        .options({
          url: (doc) => resolveProductionUrl(doc),
        })
        .title("Forhåndsvisning"),
    ]);
  }
  if (schemaType === "aksel_forside") {
    return S.document().views([S.view.form()]);
  }
  return S.document().views([S.view.form()]);
};
