import React from "react";
import { CopyLink } from "..";

export default {
  title: "ds-react-navno/copy-link",
};

export const CopyLinkStory = () => {
  return (
    <CopyLink
      label="Kopier lenke"
      confirmationLabel="Lenken er kopiert"
      anchor="testAnchor"
    />
  );
};
