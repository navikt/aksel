import React from "react";
import { Alert } from "../index";

export default {
  title: "ds-react/alert",
  component: Alert,
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
      <h1>Alert</h1>
      {variants.map((variant) => (
        <Alert key={variant} variant={variant}>
          {Array(8).fill(`${variant} content`).join(" ")}
        </Alert>
      ))}
      <h2>Small</h2>
      <div>
        {variants.map((variant) => (
          <Alert key={variant} variant={variant} size="s">
            {Array(8).fill(`${variant} content`).join(" ")}
          </Alert>
        ))}
      </div>
    </>
  );
};
