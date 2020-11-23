import React from "react";
import Accordion from "../src/index";

export default {
  title: "@nav-frontend/react-accordion",
  component: Accordion,
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
          <Alert key={variant} variant={variant} size="small">
            {Array(8).fill(`${variant} content`).join(" ")}
          </Alert>
        ))}
      </div>
    </>
  );
};
