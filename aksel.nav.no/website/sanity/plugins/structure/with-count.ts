import { FileError } from "@navikt/ds-icons";

/* documentStore is in Alpha, so avoid using for now */
export const PanesWithCount = async (
  docType,
  categories: { title: string; value: string }[],
  getClient,
  S
) => {
  const ids = await getClient({ apiVersion: "2021-06-07" }).fetch(
    `*[_type == $docType]{_id, kategori}`,
    { docType }
  );

  return [
    ...categories.map(({ value, title }) =>
      S.listItem()
        .title(
          `${title} (${ids.filter((x) => x?.kategori === value).length ?? 0})`
        )
        .child(
          S.documentList()
            .title(title)
            .schemaType(docType)
            .filter(`_type == $docType && $kat == kategori`)
            .params({ kat: value, docType })
          /*    .menuItems([...S.documentTypeList(docType).getMenuItems()]) */
        )
    ),
    S.listItem()
      .title(`Uten kategori (${ids.filter((x) => !x?.kategori).length ?? 0})`)
      .icon(FileError)
      .child(
        S.documentList()
          .title("Uten kategori")
          .schemaType(docType)
          .filter(`_type == $docType && !defined(kategori)`)
          .params({ docType })
        /* .menuItems([...S.documentTypeList(docType).getMenuItems()]) */
      ),
  ];
};
