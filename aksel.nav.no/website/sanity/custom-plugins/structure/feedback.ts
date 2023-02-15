import {
  DotIcon,
  EyeClosedIcon,
  EyeOpenIcon,
  PresentationIcon,
} from "@sanity/icons";
import { StructureBuilder } from "sanity/desk";

export const FeedbackPanes = async (getClient, S: StructureBuilder) => {
  const fb = await getClient({ apiVersion: "2021-06-07" }).fetch(
    `{
      "behandlet": count(*[_type == "aksel_feedback" && behandlet == true]),
      "ubehandlet": count(*[_type == "aksel_feedback" && behandlet == false]),
      "totalt-gp": count(*[_type == "aksel_feedback" && doc_ref->_type == "aksel_artikkel"]),
      "totalt-comp": count(*[_type == "aksel_feedback" && doc_ref->_type == "komponent_artikkel"]),
      "totalt-grunnleggende": count(*[_type == "aksel_feedback" && doc_ref->_type == "ds_artikkel"]),
      "totalt-rest": count(*[_type == "aksel_feedback" && !(doc_ref->_type in ["ds_artikkel", "komponent_artikkel", "aksel_artikkel"])]),
      "totalt-footer": count(*[_type == "aksel_feedback" && feedback_type == "footer"]),
      "totalt-uu": count(*[_type == "aksel_feedback" && feedback_type == "uu_feedback"]),
      "totalt-ja": count(*[_type == "aksel_feedback" && artikkel_feedback == "ja"]),
      "totalt-nei": count(*[_type == "aksel_feedback" && artikkel_feedback == "nei"]),
      "totalt-forslag": count(*[_type == "aksel_feedback" && artikkel_feedback == "forslag"]),
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
      .title(`God praksis`)
      .icon(DotIcon)
      .child(
        S.documentList()
          .title(`Behandlet`)
          .filter(
            `_type == "aksel_feedback" && behandlet == false && doc_ref->_type == "aksel_artikkel"`
          )
      ),
    S.listItem()
      .title(`Komponentsider`)
      .icon(DotIcon)
      .child(
        S.documentList()
          .title(`Behandlet`)
          .filter(
            `_type == "aksel_feedback" && behandlet == false && doc_ref->_type == "komponent_artikkel"`
          )
      ),
    S.listItem()
      .title(`Grunnleggende`)
      .icon(DotIcon)
      .child(
        S.documentList()
          .title(`Behandlet`)
          .filter(
            `_type == "aksel_feedback" && behandlet == false && doc_ref->_type == "ds_artikkel"`
          )
      ),
    S.listItem()
      .title(`Andre sider`)
      .icon(DotIcon)
      .child(
        S.documentList()
          .title(`Behandlet`)
          .filter(
            `_type == "aksel_feedback" && behandlet == false && !(doc_ref->_type in ["ds_artikkel", "komponent_artikkel", "aksel_artikkel"])`
          )
      ),
    S.listItem()
      .title(`Fant ikke det de lette etter`)
      .icon(DotIcon)
      .child(
        S.documentList()
          .title(`Behandlet`)
          .filter(
            `_type == "aksel_feedback" && behandlet == false && artikkel_feedback == "nei"`
          )
      ),
    S.listItem()
      .title(`Footer`)
      .icon(DotIcon)
      .child(
        S.documentList()
          .title(`Behandlet`)
          .filter(
            `_type == "aksel_feedback" && behandlet == false && feedback_type == "footer"`
          )
      ),
    S.listItem()
      .title(`UU-feedback`)
      .icon(DotIcon)
      .child(
        S.documentList()
          .title(`Behandlet`)
          .filter(
            `_type == "aksel_feedback" && behandlet == false && feedback_type == "uu_feedback"`
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
    S.divider(),
    S.listItem()
      .title(`Alle tilbakemeldinger (${fb.ubehandlet + fb.behandlet})`)
      .icon(PresentationIcon)
      .child(
        S.documentList().title(`Ubehandlet`).filter(`_type == "aksel_feedback"`)
      ),
    S.listItem()
      .title(`God praksis totalt (${fb["totalt-gp"]})`)
      .icon(DotIcon)
      .child(
        S.documentList()
          .title(`Behandlet`)
          .filter(
            `_type == "aksel_feedback" && doc_ref->_type == "aksel_artikkel"`
          )
      ),
    S.listItem()
      .title(`Komponentsider totalt (${fb["totalt-comp"]})`)
      .icon(DotIcon)
      .child(
        S.documentList()
          .title(`Behandlet`)
          .filter(
            `_type == "aksel_feedback" && doc_ref->_type == "komponent_artikkel"`
          )
      ),
    S.listItem()
      .title(`Grunnleggende totalt (${fb["totalt-grunnleggende"]})`)
      .icon(DotIcon)
      .child(
        S.documentList()
          .title(`Behandlet`)
          .filter(
            `_type == "aksel_feedback" && doc_ref->_type == "ds_artikkel"`
          )
      ),
    S.listItem()
      .title(`Andre sider totalt (${fb["totalt-rest"]})`)
      .icon(DotIcon)
      .child(
        S.documentList()
          .title(`Behandlet`)
          .filter(
            `_type == "aksel_feedback" && !(doc_ref->_type in ["ds_artikkel", "komponent_artikkel", "aksel_artikkel"])`
          )
      ),
    S.listItem()
      .title(`Nei totalt (${fb["totalt-nei"]})`)
      .icon(DotIcon)
      .child(
        S.documentList()
          .title(`Behandlet`)
          .filter(`_type == "aksel_feedback" && artikkel_feedback == "nei"`)
      ),
    S.listItem()
      .title(`Forslag totalt (${fb["totalt-forslag"]})`)
      .icon(DotIcon)
      .child(
        S.documentList()
          .title(`Behandlet`)
          .filter(`_type == "aksel_feedback" && artikkel_feedback == "forslag"`)
      ),
    S.listItem()
      .title(`Ja totalt (${fb["totalt-ja"]})`)
      .icon(DotIcon)
      .child(
        S.documentList()
          .title(`Behandlet`)
          .filter(`_type == "aksel_feedback" && artikkel_feedback == "ja"`)
      ),
    S.listItem()
      .title(`Footer totalt (${fb["totalt-footer"]})`)
      .icon(DotIcon)
      .child(
        S.documentList()
          .title(`Behandlet`)
          .filter(`_type == "aksel_feedback" && feedback_type == "footer"`)
      ),
    S.listItem()
      .title(`UU-feedback totalt (${fb["totalt-uu"]})`)
      .icon(DotIcon)
      .child(
        S.documentList()
          .title(`Behandlet`)
          .filter(`_type == "aksel_feedback" && feedback_type == "uu_feedback"`)
      ),
  ];
};
