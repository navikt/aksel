import { Iframe, IframeOptions, UrlResolver } from "sanity-plugin-iframe-pane";
import { StructureResolver } from "sanity/structure";
import { LightBulbIcon } from "@navikt/aksel-icons";
import {
  SANITY_API_VERSION,
  landingsider,
  previews,
  prinsippKategorier,
} from "../../config";
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
  "ds_endringslogg_artikkel",
  "templates_landingsside",
  "templates_artikkel",
  "komponenter_landingsside",
  "media.tag",
  "aksel_forside",
  "aksel_ds_forside",
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
  "cookie_tracker",
];

export const structure: StructureResolver = async (S) => {
  return S.list()
    .title("Innhold")
    .items([
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
      adminStructure(S),

      /**
       * Shows all document-types not in `filtered`.
       */
      ...S.documentTypeListItems().filter(
        (listItem) => !filtered.includes(listItem.getId() ?? ""),
      ),
    ]);
};

export const resolveProductionUrlAppdir: UrlResolver = (doc) => {
  const rootPath = `${window.location.protocol}//${window.location.host}`;

  if (!doc?._type) {
    return rootPath;
  }

  if (previews.includes(doc._type)) {
    const slug = (doc?.slug as any)?.current;
    const previewUrl = `/${slug}`;
    if (!slug) {
      return "";
    }
    return `${rootPath}${previewUrl}`;
  }
  if (landingsider.find((x) => x.name === doc._type)) {
    const slug = landingsider.find((x) => x.name === doc._type)?.url;
    const previewUrl = `/${slug}`;
    if (!slug) {
      return "";
    }
    return `${rootPath}${previewUrl}`;
  }

  if ("gp.tema" === doc._type) {
    const slug = (doc?.slug as any)?.current;
    const previewUrl = `/god-praksis/${slug}`;
    if (!slug) {
      return "";
    }
    return `${rootPath}${previewUrl}`;
  }

  return rootPath;
};

export const defaultDocumentNode = (S, { schemaType }) => {
  if ([...previews, ...landingsider.map((x) => x.name)].includes(schemaType)) {
    return S.document().views([
      S.view.form(),

      S.view
        .component(Iframe)
        .options({
          url: {
            origin: "same-origin",
            preview: resolveProductionUrlAppdir,
            draftMode: "/api/draft-mode/enable",
          } satisfies IframeOptions["url"],
          reload: { button: true },
          attributes: {
            allow: "fullscreen",
          },
        })
        .title("Forhåndsvisning"),
    ]);
  }
  if (schemaType === "aksel_forside") {
    return S.document().views([S.view.form()]);
  }
  return S.document().views([S.view.form()]);
};
