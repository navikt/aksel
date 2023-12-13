import { StructureBuilder } from "sanity/desk";
import { FileXMarkIcon, TagIcon } from "@navikt/aksel-icons";
import { SANITY_API_VERSION } from "@/sanity/config";

/* documentStore is in Alpha, so avoid using for now */
export const GodPraksisPanes = async (getClient, S: StructureBuilder) => {
  let tema = await getClient({ apiVersion: SANITY_API_VERSION }).fetch(
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

  const ids = await getClient({ apiVersion: SANITY_API_VERSION }).fetch(
    `*[_type == "aksel_artikkel"]{_id, tema}`
  );

  return [
    S.listItem()
      .title(`Temasider (${tema.length})`)
      .icon(TagIcon)
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
            .filter(`_type == 'aksel_artikkel' && $undertema in tema[]._ref`)
            .params({ undertema: _id.replace("drafts.", "") })
            .apiVersion(SANITY_API_VERSION)
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
          .apiVersion(SANITY_API_VERSION)
        /* .menuItems([...S.documentTypeList("aksel_artikkel").getMenuItems()]) */
      ),
  ];
};
