import React from "react";
import { StepIndicator } from "..";

export default {
  title: "ds-react/step-indicator",
  component: StepIndicator,
};

const variants: Array<"error" | "warning" | "info" | "success"> = [
  "error",
  "warning",
  "info",
  "success",
];

export const All = () => {
  return (
    <>
      <h1>StepIndicator</h1>
      {variants.map((variant, i) => (
        <StepIndicator key={variant} variant={variant}>
          {new Array(i + 1).fill(
            "Id elit esse enim reprehenderit enim nisi veniam nostrud."
          )}
        </StepIndicator>
      ))}
    </>
  );
};
