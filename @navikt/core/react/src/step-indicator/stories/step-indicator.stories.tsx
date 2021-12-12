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
        <StepIndicatorStep label="Dette steget først"></StepIndicatorStep>
        <StepIndicatorStep label="Og så dette steget" aktiv></StepIndicatorStep>
        <StepIndicatorStep label="Deretter må du gjøre dette"></StepIndicatorStep>
        <StepIndicatorStep label="Konklusjonen" disabled></StepIndicatorStep>
      </StepIndicator>
      <StepIndicator visLabel onChange={() => {}}>
        <StepIndicatorStep label="Dette steget først"></StepIndicatorStep>
        <StepIndicatorStep label="Og så dette steget" aktiv></StepIndicatorStep>
        <StepIndicatorStep label="Deretter må du gjøre dette"></StepIndicatorStep>
        <StepIndicatorStep label="Konklusjonen" disabled></StepIndicatorStep>
      </StepIndicator>
      <StepIndicator visLabel={false} kompakt onChange={() => {}}>
        <StepIndicatorStep label="Dette steget først"></StepIndicatorStep>
        <StepIndicatorStep label="Og så dette steget" aktiv></StepIndicatorStep>
        <StepIndicatorStep label="Deretter må du gjøre dette"></StepIndicatorStep>
        <StepIndicatorStep label="Konklusjonen" disabled></StepIndicatorStep>
      </StepIndicator>
      <StepIndicator visLabel kompakt onChange={() => {}}>
        <StepIndicatorStep label="Dette steget først"></StepIndicatorStep>
        <StepIndicatorStep label="Og så dette steget" aktiv></StepIndicatorStep>
        <StepIndicatorStep label="Deretter må du gjøre dette"></StepIndicatorStep>
        <StepIndicatorStep label="Konklusjonen" disabled></StepIndicatorStep>
      </StepIndicator>
      <StepIndicator visLabel kompakt autoResponsiv onChange={() => {}}>
        <StepIndicatorStep label="Dette steget først"></StepIndicatorStep>
        <StepIndicatorStep label="Og så dette steget" aktiv></StepIndicatorStep>
        <StepIndicatorStep label="Deretter må du gjøre dette"></StepIndicatorStep>
        <StepIndicatorStep label="Konklusjonen" disabled></StepIndicatorStep>
      </StepIndicator>
    </div>
  );
};
