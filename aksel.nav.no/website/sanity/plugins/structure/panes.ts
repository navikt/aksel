import { FileXMarkIcon } from "@navikt/aksel-icons";

export const Panes = (
  docType,
  categories: { title: string; value: string }[],
  S
) => {
  return [
    ...categories.map(({ value, title }) =>
      S.listItem()
        .title(title)
        .child(
          S.documentList()
            .title(title)
            .schemaType(docType)
            .filter(`_type == $docType && $kat == kategori`)
            .params({ kat: value, docType })
        )
    ),
    S.listItem()
      .title(`Uten kategori`)
      .icon(FileXMarkIcon)
      .child(
        S.documentList()
          .title("Uten kategori")
          .schemaType(docType)
          .filter(`_type == $docType && !defined(kategori)`)
          .params({ docType })
      ),
  ];
};
