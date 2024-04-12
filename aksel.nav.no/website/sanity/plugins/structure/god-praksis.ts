import { StructureBuilder } from "sanity/structure";
import { PencilBoardIcon } from "@navikt/aksel-icons";
import { SANITY_API_VERSION } from "@/sanity/config";

export function godPraksiStructure(S: StructureBuilder) {
  const adminOrDev = S.context.currentUser?.roles.find((x) =>
    ["developer", "administrator"].includes(x.name),
  );
  if (!adminOrDev) {
    return S.divider();
  }

  return S.listItem()
    .title("God Praksis (ny)")
    .icon(PencilBoardIcon)
    .child(
      S.list()
        .title("God Praksis")
        .items([
          S.documentListItem({
            displayOptions: { showIcon: false },
            id: "gp_new",
            schemaType: "godpraksis_landingsside",
          })
            .title(`Landingsside`)
            .schemaType(`godpraksis_landingsside`)
            .id(`godpraksis_landingsside_id1`),
          S.divider(),
          ...godPraksisPanes(S),
        ]),
    );
}
function godPraksisPanes(S: StructureBuilder) {
  return [
    S.listItem({
      id: "my_gp_published",
      title: "Mine publiserte artikler",
      schemaType: "aksel_artikkel",
      child: (_, { structureContext }) => {
        const mail = structureContext.currentUser?.email;

        return S.documentTypeList("aksel_artikkel")
          .title("Artikler")
          .filter(
            `_type == $type && !(_id in path("drafts.**")) && ($mail in contributors[]->email || $mail in contributors[]->alt_email)`,
          )
          .apiVersion(SANITY_API_VERSION)
          .params({ type: "aksel_artikkel", mail })
          .initialValueTemplates([]);
      },
    }),
    S.listItem({
      id: "my_gp_drafts",
      title: "Mine drafts",
      schemaType: "aksel_artikkel",
      child: (_, { structureContext }) => {
        const mail = structureContext.currentUser?.email;

        return S.documentTypeList("aksel_artikkel")
          .title("Artikler")
          .filter(
            `_type == $type && _id in path("drafts.**") && ($mail in contributors[]->email || $mail in contributors[]->alt_email)`,
          )
          .apiVersion(SANITY_API_VERSION)
          .params({ type: "aksel_artikkel", mail })
          .initialValueTemplates([]);
      },
    }),
    S.listItem({
      id: "my_gp_outdated",
      title: "Mine artikler som trenger oppdatering",
      schemaType: "aksel_artikkel",
      child: (_, { structureContext }) => {
        const mail = structureContext.currentUser?.email;

        return S.documentTypeList("aksel_artikkel")
          .title("Artikler")
          .filter(
            `_type == $type && (dateTime(updateInfo.lastVerified + "T00:00:00Z") < dateTime(now()) - 60*60*24*365) && ($mail in contributors[]->email || $mail in contributors[]->alt_email)`,
          )
          .apiVersion(SANITY_API_VERSION)
          .params({ type: "aksel_artikkel", mail })
          .initialValueTemplates([]);
      },
    }),
    S.divider(),
    S.documentTypeListItem("gp.tema").title("Tema"),
    S.listItem({
      id: "tema_view",
      title: "Undertema",
      schemaType: "gp.tema.undertema",
      child: () =>
        S.documentTypeList("gp.tema")
          .child((id) => {
            return S.documentTypeList("gp.tema.undertema")
              .title("Undertema")
              .filter("_type == $type && tema._ref == $id")
              .apiVersion(SANITY_API_VERSION)
              .params({ type: "gp.tema.undertema", id })
              .initialValueTemplates([
                S.initialValueTemplateItem("gp.tema.undertema.by.tema", {
                  id,
                }),
              ]);
          })
          .initialValueTemplates([]),
    }),
    S.documentTypeListItem("gp.innholdstype").title("Innholdstyper"),
    S.divider(),
    S.listItem({
      id: "article_tema_complete_view",
      title: "Artikler",
      schemaType: "aksel_artikkel",
      child: () =>
        S.documentTypeList("gp.tema")
          .child((id) => {
            return S.documentTypeList("aksel_artikkel")
              .title("Artikler")
              .filter("_type == $type && $id in undertema[]->tema._ref")
              .apiVersion(SANITY_API_VERSION)
              .params({ type: "aksel_artikkel", id });
          })
          .initialValueTemplates([]),
    }),
    S.listItem({
      id: "article_undertema_view",
      title: "Artikler undertema",
      schemaType: "aksel_artikkel",
      child: () =>
        S.documentTypeList("gp.tema")
          .child((id) => {
            return S.documentTypeList("gp.tema.undertema")
              .title("Undertema")
              .filter("_type == $type && tema._ref == $id")
              .apiVersion(SANITY_API_VERSION)
              .params({ type: "gp.tema.undertema", id })
              .child((undertema_id) => {
                return S.documentTypeList("aksel_artikkel")
                  .title("Artikler")
                  .filter("_type == $type && $id in undertema[]._ref")
                  .apiVersion(SANITY_API_VERSION)
                  .params({ type: "aksel_artikkel", id: undertema_id })
                  .initialValueTemplates([
                    S.initialValueTemplateItem("gp.artikkel.by.undertema", {
                      undertema_id,
                    }),
                  ]);
              })
              .initialValueTemplates([]);
          })
          .initialValueTemplates([]),
    }),
    S.listItem({
      id: "article_innholdstype_view",
      title: "Artikler innholdstype",
      schemaType: "aksel_artikkel",
      child: () =>
        S.documentTypeList("gp.innholdstype")
          .child((id) => {
            return S.documentTypeList("aksel_artikkel")
              .title("Artikler")
              .filter("_type == $type && $id == innholdstype._ref")
              .apiVersion(SANITY_API_VERSION)
              .params({ type: "aksel_artikkel", id })
              .initialValueTemplates([
                S.initialValueTemplateItem("gp.artikkel.by.innholdstype", {
                  id,
                }),
              ]);
          })
          .initialValueTemplates([]),
    }),
    S.divider(),
    S.listItem({
      id: "article_no_undertema_view",
      title: "Uten undertema",
      schemaType: "aksel_artikkel",
      child: () =>
        S.documentTypeList("aksel_artikkel")
          .title("Artikler")
          .filter("_type == $type && !defined(undertema)")
          .apiVersion(SANITY_API_VERSION)
          .params({ type: "aksel_artikkel" })
          .initialValueTemplates([]),
    }),

    S.listItem({
      id: "article_no_innholdstype_view",
      title: "Uten innholdstype",
      schemaType: "aksel_artikkel",
      child: () =>
        S.documentTypeList("aksel_artikkel")
          .title("Artikler")
          .filter("_type == $type && !defined(innholdstype)")
          .apiVersion(SANITY_API_VERSION)
          .params({ type: "aksel_artikkel" })
          .initialValueTemplates([]),
    }),
    S.listItem({
      id: "article_gp_outdated_tema",
      title: "Trenger oppdatering",
      schemaType: "aksel_artikkel",
      child: () =>
        S.documentTypeList("gp.tema")
          .child((id) => {
            return S.documentTypeList("aksel_artikkel")
              .title("Artikler")
              .filter(
                `_type == $type && $id in undertema[]->tema._ref && (dateTime(updateInfo.lastVerified + "T00:00:00Z") < dateTime(now()) - 60*60*24*365)`,
              )
              .apiVersion(SANITY_API_VERSION)
              .params({ type: "aksel_artikkel", id })
              .initialValueTemplates([]);
          })
          .initialValueTemplates([]),
    }),
  ];
}
