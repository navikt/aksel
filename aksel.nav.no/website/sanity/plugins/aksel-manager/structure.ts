import { StructureResolver } from "sanity/desk";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Aksel Manager")
    .items([
      /* S.documentTypeListItem("tema").title("Tema"),
      S.documentTypeListItem("tema_tag").title("Tema tag"), */
      S.documentTypeListItem("gp.innholdstype").title("Innholdstype"),
      S.documentTypeListItem("gp.tema").title("Tema"),
      S.listItem({
        id: "tema_view",
        title: "Tema tagger",
        schemaType: "gp.tema.tag",
        child: () =>
          S.documentTypeList("gp.tema")
            .child((authorId) =>
              S.documentTypeList("gp.tema.tag")
                .title("Tags")
                .filter("_type == $type && tema._ref == $authorId")
                .params({ type: "gp.tema.tag", authorId })
                .initialValueTemplates([
                  S.initialValueTemplateItem("book.by.author", { authorId }),
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
    default:
      S.view.form();
  }
};
