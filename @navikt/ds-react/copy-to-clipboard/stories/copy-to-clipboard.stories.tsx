import * as React from "react";
import { CopyToClipboard } from "../src";

export default {
  title: "@navikt/copy-to-clipboard",
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
      <p>
        Her kan du kopiere {label}
        <CopyToClipboard label={label} text={text} />
      </p>

      <h2>Tilpasser seg fontstørrelse</h2>
      <p style={{ fontSize: "0.8rem" }}>
        Her kan du kopiere {label}
        <CopyToClipboard label={label} text={text} />
      </p>
    </div>
  );
};
