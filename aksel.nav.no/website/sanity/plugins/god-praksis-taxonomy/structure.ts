import { CurrentUser } from "sanity";
import { DefaultDocumentNodeResolver, StructureResolver } from "sanity/desk";

const adminOrDev = (user: CurrentUser) =>
  user.roles.find((role) => ["developer", "administrator"].includes(role.name));

export const structure: StructureResolver = (S, { currentUser }) => {
  if (!adminOrDev(currentUser)) {
    return null;
  }

  return S.list()
    .title("Aksel Manager")
    .items([
      S.documentTypeListItem("gp.innholdstype").title("Innholdstype"),
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
      }),
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
