import * as React from "react";

import { CopyToClipboard } from "../index";

export default {
  title: "@ds-react/copy-to-clipboard",
  component: CopyToClipboard,
};

export const All = () => {
  const label = "pi";

  const text = "3.14159265359";
  return (
    <div>
      <h2>Fritstående knapp</h2>
      <CopyToClipboard label={label} text={text} />

      <h2>Sammen med tekst</h2>
      <CopyToClipboard label={label} text={text}>
        Kopier tekst
      </CopyToClipboard>

      <h2>Tilpasser seg fontstørrelse</h2>
      <CopyToClipboard label={label} text={text} style={{ fontSize: "0.8rem" }}>
        Kopier tekst
      </CopyToClipboard>
    </div>
  );
};
