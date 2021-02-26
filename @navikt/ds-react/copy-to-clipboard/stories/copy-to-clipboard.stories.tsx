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
        <CopyToClipboard label={label} text={text}>
          Kopier tekst
        </CopyToClipboard>
      </p>

      <h2>Tilpasser seg fontstørrelse</h2>
      <p style={{ fontSize: "0.8rem" }}>
        <CopyToClipboard label={label} text={text}>
          Kopier tekst
        </CopyToClipboard>
      </p>
    </div>
  );
};
