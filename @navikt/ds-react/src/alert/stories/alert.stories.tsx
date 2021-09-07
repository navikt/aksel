import React from "react";
import { Alert, AlertProps } from "../index";

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
      {variants.map((variant, i) => (
        <Alert key={variant} variant={variant}>
          {new Array(i + 1).fill(
            "Id elit esse enim reprehenderit enim nisi veniam nostrud."
          )}
        </Alert>
      ))}
      <h2>Small</h2>
      <div>
        {variants.map((variant, i) => (
          <Alert key={variant} variant={variant} size="small">
            {new Array(i + 1).fill(
              "Id elit esse enim reprehenderit enim nisi veniam nostrud."
            )}
          </Alert>
        ))}
      </div>
      <h2>Alert fullWidth</h2>
      {variants.map((variant, i) => (
        <Alert fullWidth key={variant} variant={variant}>
          {new Array(i + 1).fill(
            "Id elit esse enim reprehenderit enim nisi veniam nostrud."
          )}
        </Alert>
      ))}
      <h2>Small</h2>
      <div>
        {variants.map((variant, i) => (
          <Alert fullWidth key={variant} variant={variant} size="small">
            {new Array(i + 1).fill(
              "Id elit esse enim reprehenderit enim nisi veniam nostrud."
            )}
          </Alert>
        ))}
      </div>
    </>
  );
};
