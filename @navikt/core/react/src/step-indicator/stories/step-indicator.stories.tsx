import React from "react";
import StepIndicator from "../StepIndicator";
import { Meta } from "@storybook/react/types-6-0";

export default {
  title: "ds-react/step-indicator",
  component: StepIndicator,
} as Meta;

export const All = () => {
  return (
    <div style={{ display: "grid", gridAutoRows: "8rem", rowGap: "2rem" }}>
      <StepIndicator
        steg={[
          { label: "Dette steget først", index: 0 },
          { label: "Og så dette steget", aktiv: true, index: 1 },
          { label: "Deretter må du gjøre dette", index: 2 },
          { label: "Konklusjonen", disabled: true, index: 3 },
        ]}
        onChange={() => {}}
      />
      <StepIndicator
        visLabel
        steg={[
          { label: "Dette steget først", index: 0 },
          { label: "Og så dette steget", aktiv: true, index: 1 },
          { label: "Deretter må du gjøre dette", index: 2 },
          { label: "Konklusjonen", disabled: true, index: 3 },
        ]}
        onChange={() => {}}
      />
      <StepIndicator
        kompakt
        steg={[
          { label: "Dette steget først", index: 0 },
          { label: "Og så dette steget", aktiv: true, index: 1 },
          { label: "Deretter må du gjøre dette", index: 2 },
          { label: "Konklusjonen", disabled: true, index: 3 },
        ]}
        onChange={() => {}}
      />
      <StepIndicator
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
