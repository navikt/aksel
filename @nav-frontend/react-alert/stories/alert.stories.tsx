import React from "react";
import Alert from "../src/index";

export default {
  title: "@nav-frontend/react-alert",
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
    </>
  );
};
