import React from "react";
import StepIndicator from "../StepIndicator";
import StepIndicatorStep from "../StepIndicatorStep";
import { Meta } from "@storybook/react/types-6-0";

export default {
  title: "ds-react/step-indicator",
  component: StepIndicator,
} as Meta;

export const All = () => {
  return (
    <div style={{ display: "grid", gridAutoRows: "8rem", rowGap: "2rem" }}>
      <StepIndicator visLabel={false} onChange={() => {}}>
        <StepIndicatorStep
          label="Dette steget først"
          index={0}
        ></StepIndicatorStep>
        <StepIndicatorStep
          label="Og så dette steget"
          aktiv
          index={1}
        ></StepIndicatorStep>
        <StepIndicatorStep
          label="Deretter må du gjøre dette"
          index={2}
        ></StepIndicatorStep>
        <StepIndicatorStep
          label="Konklusjonen"
          disabled
          index={3}
        ></StepIndicatorStep>
      </StepIndicator>
      <StepIndicator visLabel onChange={() => {}}>
        <StepIndicatorStep
          label="Dette steget først"
          index={0}
        ></StepIndicatorStep>
        <StepIndicatorStep
          label="Og så dette steget"
          aktiv
          index={1}
        ></StepIndicatorStep>
        <StepIndicatorStep
          label="Deretter må du gjøre dette"
          index={2}
        ></StepIndicatorStep>
        <StepIndicatorStep
          label="Konklusjonen"
          disabled
          index={3}
        ></StepIndicatorStep>
      </StepIndicator>
      <StepIndicator visLabel={false} kompakt onChange={() => {}}>
        <StepIndicatorStep
          label="Dette steget først"
          index={0}
        ></StepIndicatorStep>
        <StepIndicatorStep
          label="Og så dette steget"
          aktiv
          index={1}
        ></StepIndicatorStep>
        <StepIndicatorStep
          label="Deretter må du gjøre dette"
          index={2}
        ></StepIndicatorStep>
        <StepIndicatorStep
          label="Konklusjonen"
          disabled
          index={3}
        ></StepIndicatorStep>
      </StepIndicator>
      <StepIndicator visLabel kompakt onChange={() => {}}>
        <StepIndicatorStep
          label="Dette steget først"
          index={0}
        ></StepIndicatorStep>
        <StepIndicatorStep
          label="Og så dette steget"
          aktiv
          index={1}
        ></StepIndicatorStep>
        <StepIndicatorStep
          label="Deretter må du gjøre dette"
          index={2}
        ></StepIndicatorStep>
        <StepIndicatorStep
          label="Konklusjonen"
          disabled
          index={3}
        ></StepIndicatorStep>
      </StepIndicator>
    </div>
  );
};
