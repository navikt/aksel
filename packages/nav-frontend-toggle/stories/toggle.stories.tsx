import React from "react";
import { ToggleGruppe, ToggleKnapp } from "../src/index";
import { Meta } from "@storybook/react/types-6-0";

export default {
  title: "nav-frontend/Toggle",
  component: ToggleKnapp,
} as Meta;

export const All = () => {
  return (
    <div
      style={{
        display: "grid",
        gridAutoRows: "8rem",
        rowGap: "2rem",
      }}
    >
      <ToggleGruppe
        defaultToggles={[
          { children: "Mandag", pressed: true },
          { children: "Tirsdag" },
          { children: "Onsdag" },
        ]}
      />
      <ToggleGruppe
        defaultToggles={[
          { children: "Mandag", pressed: true },
          { children: "Tirsdag" },
          { children: "Onsdag", pressed: true },
        ]}
        multiSelect
      />
      <ToggleGruppe
        defaultToggles={[
          { children: "B", pressed: true },
          { children: <em style={{ paddingLeft: 2, paddingRight: 2 }}>I</em> },
          { children: <span style={{ textDecoration: "underline" }}>U</span> },
        ]}
        multiSelect
        kompakt
      />
    </div>
  );
};
