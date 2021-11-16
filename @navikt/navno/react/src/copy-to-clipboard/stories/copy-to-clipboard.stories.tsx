import * as React from "react";

import { CopyToClipboard } from "../index";

export default {
  title: "ds-react-internal/copy-to-clipboard",
  component: CopyToClipboard,
};

export const All = () => {
  const label = "Kopierte PI til clipboard";

  const text = "3.14159265359";
  return (
    <div>
      <h2>Fritstående knapp</h2>
      <CopyToClipboard popoverText={label} copyText={text} />

      <h2>Sammen med tekst</h2>
      <CopyToClipboard popoverText={label} copyText={text}>
        Kopier tekst
      </CopyToClipboard>

      <h2>Small size</h2>
      <CopyToClipboard popoverText={label} copyText={text} size="small">
        Kopier tekst
      </CopyToClipboard>
      <CopyToClipboard popoverText={label} copyText={text} size="small" />

      <h2>Endrer placement av popover</h2>
      <CopyToClipboard
        popoverText={label}
        copyText={text}
        popoverPlacement="bottom-end"
      >
        Kopier tekst
      </CopyToClipboard>
    </div>
  );
};
