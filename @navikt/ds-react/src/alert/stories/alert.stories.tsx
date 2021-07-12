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
          Id elit esse enim reprehenderit.Tempor tempor ex exercitation id aute
          eu.Laborum nulla nisi irure voluptate mollit fugiat.Est quis culpa
          nostrud et reprehenderit ea sint.Eu veniam labore enim labore qui
          eiusmod Lorem amet ad esse.
        </Alert>
      ))}
      <h2>Small</h2>
      <div>
        {variants.map((variant) => (
          <Alert key={variant} variant={variant} size="s">
            Exercitation enim nisi veniam nostrud Lorem ipsum ea fugiat. Aute
            exercitation voluptate proident sit ex reprehenderit quis ex ut
            mollit.
          </Alert>
        ))}
      </div>
    </>
  );
};
