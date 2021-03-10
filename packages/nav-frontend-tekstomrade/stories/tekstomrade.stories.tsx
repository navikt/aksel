import React from "react";
import Tekstomrade, {
  createDynamicHighlightingRule,
  HighlightRule,
  BoldRule,
} from "../src/tekstomrade";
import { Meta } from "@storybook/react/types-6-0";

export default {
  title: "nav-frontend/Tekstomrade",
  component: Tekstomrade,
} as Meta;

export const All = () => {
  return (
    <div style={{ display: "grid", gridAutoRows: "8rem", rowGap: "2rem" }}>
      <Tekstomrade>
        {`En komponent som tar ansvar for å brekke opp \ntekst i avsnitt, og \nlegge til lenker.\n\nVi kan f.eks lenke til www.nav.no, og ha flere lenker på samme linje. (Les mer her; https://nav.no)`}
      </Tekstomrade>
      <Tekstomrade
        rules={[
          HighlightRule,
          BoldRule,
          createDynamicHighlightingRule(["ruk"]),
        ]}
      >
        {`*Vi* kan bruke helt egne regler _her_`}
      </Tekstomrade>
    </div>
  );
};
