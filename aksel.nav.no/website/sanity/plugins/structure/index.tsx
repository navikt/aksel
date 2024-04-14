import { StructureResolver } from "sanity/structure";
import { LightBulbIcon, PencilBoardIcon } from "@navikt/aksel-icons";
import {
  SANITY_API_VERSION,
  landingsider,
  previews,
  prinsippKategorier,
} from "../../config";
import { Iframe } from "./IFrame";
import { adminStructure } from "./admin";
import { godPraksiStructure } from "./god-praksis";
import { GodPraksisPanesOld } from "./god-praksis.old";
import { grunnleggendeStructure } from "./grunnleggende";
import { komponenterStructure } from "./komponenter";
import { monsterStructure } from "./monster";
import { produktBloggenStructure } from "./produktbloggen";

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
      email.toLowerCase() === currentUser?.email.toLowerCase() ||
      alt_email.toLowerCase() === currentUser?.email.toLowerCase(),
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
      godPraksiStructure(S),
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
      grunnleggendeStructure(S),
      komponenterStructure(S),
      monsterStructure(S),
      produktBloggenStructure(S),

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
      adminStructure(S),

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
