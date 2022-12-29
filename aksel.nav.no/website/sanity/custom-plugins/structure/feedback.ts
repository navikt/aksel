import { EyeClosedIcon, EyeOpenIcon } from "@sanity/icons";
import { StructureBuilder } from "sanity/desk";

export const FeedbackPanes = async (getClient, S: StructureBuilder) => {
  const fb = await getClient({ apiVersion: "2021-06-07" }).fetch(
    `{
      "behandlet": count(*[_type == "aksel_feedback" && behandlet == true]),
      "ubehandlet": count(*[_type == "aksel_feedback" && behandlet == false]),
    }`
  );

  return [
    S.listItem().title(`Ubehandlet (${fb.ubehandlet})`).icon(EyeOpenIcon).child(
      S.documentList()
        .title(`Ubehandlet`)
        .filter(`_type == "aksel_feedback" && behandlet == false`)
      /* .menuItems([...S.documentTypeList("aksel_artikkel").getMenuItems()]) */
    ),
    S.listItem().title(`Behandlet (${fb.behandlet})`).icon(EyeClosedIcon).child(
      S.documentList()
        .title(`Behandlet`)
        .filter(`_type == "aksel_feedback" && behandlet == true`)
      /* .menuItems([...S.documentTypeList("aksel_artikkel").getMenuItems()]) */
    ),
  ];
};
