import React from "react";
import Stegindikator from "../src/stegindikator";
import { Meta } from "@storybook/react/types-6-0";

export default {
  title: "nav-frontend/Stegindikator",
  component: Stegindikator,
} as Meta;

export const All = () => {
  return (
    <div style={{ display: "grid", gridAutoRows: "8rem", rowGap: "2rem" }}>
      <Stegindikator
        steg={[
          { label: "Dette steget først", index: 0 },
          { label: "Og så dette steget", aktiv: true, index: 1 },
          { label: "Deretter må du gjøre dette", index: 2 },
          { label: "Konklusjonen", disabled: true, index: 3 },
        ]}
        onChange={() => {}}
      />
      <Stegindikator
        visLabel
        steg={[
          { label: "Dette steget først", index: 0 },
          { label: "Og så dette steget", aktiv: true, index: 1 },
          { label: "Deretter må du gjøre dette", index: 2 },
          { label: "Konklusjonen", disabled: true, index: 3 },
        ]}
        onChange={() => {}}
      />
      <Stegindikator
        kompakt
        steg={[
          { label: "Dette steget først", index: 0 },
          { label: "Og så dette steget", aktiv: true, index: 1 },
          { label: "Deretter må du gjøre dette", index: 2 },
          { label: "Konklusjonen", disabled: true, index: 3 },
        ]}
        onChange={() => {}}
      />
      <Stegindikator
        kompakt
        visLabel
        steg={[
          { label: "Dette steget først", index: 0 },
          { label: "Og så dette steget", aktiv: true, index: 1 },
          { label: "Deretter må du gjøre dette", index: 2 },
          { label: "Konklusjonen", disabled: true, index: 3 },
        ]}
        onChange={() => {}}
      />
    </div>
  );
};
