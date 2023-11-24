import { StructureResolver } from "sanity/desk";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Aksel Manager")
    .items([
      S.documentTypeListItem("gp.innholdstype").title("Innholdstype"),
      S.documentTypeListItem("gp.tema").title("Tema"),
      S.listItem({
        id: "tema_view",
        title: "Tema tagger",
        schemaType: "gp.tema.tag",
        child: () =>
          S.documentTypeList("gp.tema")
            .child((id, ...rest) => {
              console.log({ id, rest: rest[0] });
              return S.documentTypeList("gp.tema.tag")
                .title("Tags")
                .filter("_type == $type && tema._ref == $id")
                .params({ type: "gp.tema.tag", id })
                .initialValueTemplates([
                  S.initialValueTemplateItem("gp.tema.tag.by.tema", {
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
              S.documentTypeList("gp.tema.tag")
                .title("Tags")
                .filter("_type == $type && tema._ref == $tema_id")
                .params({ type: "gp.tema.tag", tema_id })
                .initialValueTemplates([])
                .child((tag_id) =>
                  S.documentTypeList("gp.artikkel")
                    .title("Artikler")
                    .filter("_type == $type && $tag_id in tags[]._ref")
                    .params({ type: "gp.artikkel", tag_id })
                    .initialValueTemplates([
                      S.initialValueTemplateItem("gp.artikkel.by.tag", {
                        tag_id,
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

// set default document node here — so that if users want concepts
// and schemes elsewhere in desk, they'll get the right views.
export const defaultDocumentNode = (
  S: any,
  { schemaType }: { schemaType: any }
) => {
  // Conditionally return a different configuration based on the schema type
  switch (schemaType) {
    case "gp.tema":
      return S.document().views([S.view.form()]);
    case "gp.tema.tag":
      return S.document().views([S.view.form()]);
    case "gp.innholdstype":
      return S.document().views([S.view.form()]);
    case "gp.artikkel":
      return S.document().views([S.view.form()]);
    default:
      S.view.form();
  }
};
