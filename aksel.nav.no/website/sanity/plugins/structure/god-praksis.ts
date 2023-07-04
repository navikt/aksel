import { FileXMarkIcon } from "@navikt/aksel-icons";
import { MasterDetailIcon } from "@sanity/icons";
import { StructureBuilder } from "sanity/desk";
/* documentStore is in Alpha, so avoid using for now */
export const GodPraksisPanes = async (getClient, S: StructureBuilder) => {
  let tema = await getClient({ apiVersion: "2021-06-07" }).fetch(
    `*[_type == "aksel_tema"]{title,seksjoner, _id}`
  );
  tema = tema
    .map((x) => ({
      title: x.title,
      sider:
        x.seksjoner?.reduce((b, n) => [...b, ...(n?.sider ?? [])], []) || [],
      _id: x._id,
    }))
    .filter(
      (x) =>
        !(
          x._id.startsWith("drafts") &&
          tema.find((y) => y._id === x._id.replace("drafts.", ""))
        )
    );

  const ids = await getClient({ apiVersion: "2021-06-07" }).fetch(
    `*[_type == "aksel_artikkel"]{_id, tema}`
  );

  return [
    S.listItem()
      .title(`Temasider (${tema.length})`)
      .icon(MasterDetailIcon)
      .child(S.documentTypeList("aksel_tema")),
    S.divider(),
    ...tema.map(({ title, _id }) =>
      S.listItem()
        .title(
          `${title} (${
            ids.filter(
              (x) =>
                x?.tema &&
                x?.tema?.find?.((y) => y._ref === _id.replace("drafts.", ""))
            ).length ?? 0
          })`
        )
        .child(
          S.documentList()
            .title(`${title}`)
            .filter(`_type == 'aksel_artikkel' && $tag in tema[]._ref`)
            .params({ tag: _id.replace("drafts.", "") })
          /* .menuItems([...S.documentTypeList("aksel_artikkel").getMenuItems()]) */
        )
    ),
    S.divider(),
    S.listItem()
      .title(`Artikler uten tema (${ids.filter((x) => !x?.tema).length ?? 0})`)
      .icon(FileXMarkIcon)
      .child(
        S.documentList()
          .title(`Artikler uten tema`)
          .filter(`_type == 'aksel_artikkel' && !defined(tema)`)
        /* .menuItems([...S.documentTypeList("aksel_artikkel").getMenuItems()]) */
      ),
  ];
};
