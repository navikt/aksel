/* import { WebPreview, JsonView } from './previews' */

// note: context includes `currentUser` and the client
export const structure = (S, context) =>
  S.list()
    .title("Innhold")
    .items([
      S.documentListItem()
        .title(`Kategorier`)
        .schemaType(`kategorier_komponent`)
        .id(`kategorier_komponent_id1`),
      ...S.documentTypeListItems(),
    ]);

/* export const defaultDocumentNode = (S, { schemaType }) => {
  if (schemaType === "post") {
    return S.document().views([
      S.view.form(),
      S.view.component(WebPreview).title("Web"),
    ]);
  }

  return S.document().views([
    S.view.form(),
    S.view.component(JsonView).title("JSON"),
  ]);
}; */
