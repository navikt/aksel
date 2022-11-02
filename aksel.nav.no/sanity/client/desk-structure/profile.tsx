import { Picture } from "@navikt/ds-icons";
import S from "@sanity/desk-tool/structure-builder";
import userStore from "part:@sanity/base/user";
import client from "part:@sanity/base/client";

import React from "react";

export const profilePanel = async (id) => {
  const ids = await client.withConfig({ apiVersion: "2021-05-31" })
    .fetch(`*[_type == "editor"]{
      _id,
      user_id
    }`);

  const editor = ids.find(({ user_id }) => user_id?.current === id);

  if (editor) {
    return S.documentListItem()
      .title(`Profil`)
      .schemaType(`editor`)
      .icon(() => <Picture />)
      .id(editor._id);
  } else {
    return null;
  }
};
