import { CurrentUser } from "sanity";
import { DefaultDocumentNodeResolver, StructureResolver } from "sanity/desk";
import { SANITY_API_VERSION } from "@/sanity/config";

const adminOrDev = (user: CurrentUser) =>
  user.roles.find((role) => ["developer", "administrator"].includes(role.name));

export const structure: StructureResolver = (S, { currentUser }) => {
  if (!adminOrDev(currentUser)) {
    return S.list().title("Ingen tilgang");
  }

  return S.list()
    .title("Aksel Manager")
    .items([
      S.documentTypeListItem("gp.tema").title("Tema"),
      S.divider(),
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
      S.listItem({
        id: "article_undertema_view",
        title: "Artikler",
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
                    .params({ type: "aksel_artikkel", id: undertema_id });
                });
            })
            .initialValueTemplates([]),
      }),
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
      S.divider(),
      S.documentTypeListItem("gp.innholdstype").title("Innholdstype"),
      S.listItem({
        id: "article_innholdstype_view",
        title: "Artikler",
        schemaType: "aksel_artikkel",
        child: () =>
          S.documentTypeList("gp.innholdstype")
            .child((id) => {
              return S.documentTypeList("aksel_artikkel")
                .title("Artikler")
                .filter("_type == $type && $id == innholdstype._ref")
                .apiVersion(SANITY_API_VERSION)
                .params({ type: "aksel_artikkel", id });
            })
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

      /* S.listItem({
        id: "artikkel_view",
        title: "Artikler (tema)",
        schemaType: "gp.artikkel",
        child: () =>
          S.documentTypeList("gp.tema")
            .child((tema_id) =>
              S.documentTypeList("gp.tema.undertema")
                .title("Undertema")
                .filter("_type == $type && tema._ref == $tema_id")
                .params({ type: "gp.tema.undertema", tema_id })
                .initialValueTemplates([])
                .child((undertema_id) =>
                  S.documentTypeList("gp.artikkel")
                    .title("Artikler")
                    .filter(
                      "_type == $type && $undertema_id in undertema[]._ref"
                    )
                    .params({ type: "gp.artikkel", undertema_id })
                    .initialValueTemplates([
                      S.initialValueTemplateItem("gp.artikkel.by.undertema", {
                        undertema_id,
                      }),
                    ])
                )
            )
            .initialValueTemplates([]),
      }),
      S.listItem({
        id: "artikkel_view_innholdstype",
        title: "Artikler (innholdstype)",
        schemaType: "gp.artikkel",
        child: () =>
          S.documentTypeList("gp.innholdstype")
            .child((id) =>
              S.documentTypeList("gp.artikkel")
                .title("Innholdstype")
                .filter("_type == $type && innholdstype._ref == $id")
                .params({ type: "gp.artikkel", id })
                .initialValueTemplates([
                  S.initialValueTemplateItem("gp.artikkel.by.innholdstype", {
                    id,
                  }),
                ])
            )
            .initialValueTemplates([]),
      }), */
    ]);
};

// set default document node here — so that if users want concepts
// and schemes elsewhere in desk, they'll get the right views.
export const defaultDocumentNode: DefaultDocumentNodeResolver = (
  S,
  { schemaType }
) => {
  // Conditionally return a different configuration based on the schema type
  switch (schemaType) {
    case "gp.tema":
      return S.document().views([S.view.form()]);
    case "gp.tema.undertema":
      return S.document().views([S.view.form()]);
    case "gp.innholdstype":
      return S.document().views([S.view.form()]);
    case "gp.artikkel":
      return S.document().views([S.view.form()]);
    default:
      S.view.form();
  }
};
