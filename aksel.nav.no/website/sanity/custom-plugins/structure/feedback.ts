import { DotIcon, EyeClosedIcon, EyeOpenIcon } from "@sanity/icons";
import { StructureBuilder } from "sanity/desk";

export const FeedbackPanes = async (getClient, S: StructureBuilder) => {
  const fb = await getClient({ apiVersion: "2021-06-07" }).fetch(
    `{
      "behandlet": count(*[_type == "aksel_feedback" && behandlet == true]),
      "ubehandlet": count(*[_type == "aksel_feedback" && behandlet == false]),
      "ugp": count(*[_type == "aksel_feedback" && behandlet == false && doc_ref->_type == "aksel_artikkel"]),
      "ucomp": count(*[_type == "aksel_feedback" && behandlet == false && doc_ref->_type == "komponent_artikkel"]),
      "ugrunnleggende": count(*[_type == "aksel_feedback" && behandlet == false && doc_ref->_type == "ds_artikkel"]),
      "umisc": count(*[_type == "aksel_feedback" && behandlet == false && !(doc_ref->_type in ["ds_artikkel", "komponent_artikkel", "aksel_artikkel"])]),
    }`
  );

  /* const types = [...fb.ubehandlet, ...fb.behandlet]?.reduce((acc, curr) => {
    return {
      ...acc,
      [curr._type]: acc[curr?._type] ? acc[curr._type] + 1 : 1,
    };
  }, {});
  console.log(types); */

  return [
    S.listItem().title(`Ubehandlet (${fb.ubehandlet})`).icon(EyeOpenIcon).child(
      S.documentList()
        .title(`Ubehandlet`)
        .filter(`_type == "aksel_feedback" && behandlet == false`)
      /* .menuItems([...S.documentTypeList("aksel_artikkel").getMenuItems()]) */
    ),
    S.listItem()
      .title(`God praksis (${fb?.ugp})`)
      .icon(DotIcon)
      .child(
        S.documentList()
          .title(`Behandlet`)
          .filter(
            `_type == "aksel_feedback" && behandlet == false && doc_ref->_type == "aksel_artikkel"`
          )
      ),
    S.listItem()
      .title(`Komponentsider (${fb?.ucomp})`)
      .icon(DotIcon)
      .child(
        S.documentList()
          .title(`Behandlet`)
          .filter(
            `_type == "aksel_feedback" && behandlet == false && doc_ref->_type == "komponent_artikkel"`
          )
      ),
    S.listItem()
      .title(`Komponentsider (${fb?.ugrunnleggende})`)
      .icon(DotIcon)
      .child(
        S.documentList()
          .title(`Behandlet`)
          .filter(
            `_type == "aksel_feedback" && behandlet == false && doc_ref->_type == "ds_artikkel"`
          )
      ),
    S.listItem()
      .title(`Andre sider (${fb?.umisc})`)
      .icon(DotIcon)
      .child(
        S.documentList()
          .title(`Behandlet`)
          .filter(
            `_type == "aksel_feedback" && behandlet == false && !(doc_ref->_type in ["ds_artikkel", "komponent_artikkel", "aksel_artikkel"])`
          )
      ),
    S.divider(),
    S.listItem()
      .title(`Behandlet (${fb.behandlet})`)
      .icon(EyeClosedIcon)
      .child(
        S.documentList()
          .title(`Behandlet`)
          .filter(`_type == "aksel_feedback" && behandlet == true`)
      ),
  ];
};
