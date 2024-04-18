import Avatar from "boring-avatars";
import { StructureResolver } from "sanity/structure";
import { LightBulbIcon } from "@navikt/aksel-icons";
import {
  SANITY_API_VERSION,
  landingsider,
  previews,
  prinsippKategorier,
} from "../../config";
import { Iframe } from "./IFrame";
import { adminStructure } from "./admin";
import { gpStructure } from "./god-praksis";
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
  "godpraksis_landingsside",
  "aksel_artikkel",
  "skrivehjelp",
  "publication_flow",
  "article_views",
  "gp.tema",
  "gp.tema.undertema",
  "gp.innholdstype",
];

export const structure: StructureResolver = async (
  S,
  { currentUser, getClient },
) => {
  const editor = await getClient({ apiVersion: SANITY_API_VERSION }).fetch(
    `*[_type == "editor" && ($mail == lower(email) || $mail == lower(alt_email))][0]`,
    { mail: currentUser?.email.toLowerCase() ?? "" },
  );

  return S.list()
    .title("Innhold")
    .items([
      ...(editor
        ? [
            S.listItem()
              .title(editor?.title ?? "Profilside")
              .icon(() => (
                <Avatar
                  size="1100"
                  name={editor?.title ?? "Profilside"}
                  variant="beam"
                  colors={[
                    "#D1DAB9",
                    "#92BEA5",
                    "#6F646C",
                    "#671045",
                    "#31233E",
                  ]}
                />
              ))
              .child(S.document().schemaType("editor").documentId(editor._id)),
            S.divider(),
          ]
        : []),

      gpStructure(S),
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
        .child(S.documentTypeList("editor").title("Forfattere")),
      adminStructure(S),

      /**
       * Shows all document-types not in `filtered`.
       */
      ...S.documentTypeListItems().filter(
        (listItem) => !filtered.includes(listItem.getId() ?? ""),
      ),
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

  if ("gp.tema" === doc._type) {
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
  if ([...previews, ...landingsider.map((x) => x.name)].includes(schemaType)) {
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
