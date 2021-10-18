import React from "react";
import { Alert } from "..";

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
      <h2>Inline</h2>
      <div>
        {variants.map((variant, i) => (
          <Alert inline key={variant} variant={variant}>
            {new Array(i + 1).fill(
              "Id elit esse enim reprehenderit enim nisi veniam nostrud."
            )}
          </Alert>
        ))}
      </div>
      <h2>Inline small</h2>
      <div>
        {variants.map((variant, i) => (
          <Alert inline key={variant} variant={variant} size="small">
            {new Array(i + 1).fill(
              "Id elit esse enim reprehenderit enim nisi veniam nostrud."
            )}
          </Alert>
        ))}
      </div>
      <h2>Med Heading</h2>
      <div>
        {variants.map((variant, i) => (
          <Alert key={variant} variant={variant}>
            <Alert.Title level="2">
              Aliquip duis est in commodo pariatur
            </Alert.Title>
            <Alert.Content spacing>
              Ullamco ullamco laborum et commodo sint culpa cupidatat culpa qui
              laboris ex. Labore ex occaecat proident qui qui fugiat magna.
              Fugiat sint commodo consequat eu aute.
            </Alert.Content>
            <Alert.Title level="3">
              Ullamco eiusmod Lorem eiusmod eu.
            </Alert.Title>
            <Alert.Content>
              Ullamco ullamco laborum et commodo sint culpa cupidatat culpa qui
              laboris ex. Labore ex occaecat proident qui qui fugiat magna.
              Fugiat sint commodo consequat eu aute.
            </Alert.Content>
          </Alert>
        ))}
      </div>
      <h2>Med Heading small</h2>
      <div>
        {variants.map((variant, i) => (
          <Alert key={variant} variant={variant} size="small">
            <Alert.Title level="2">
              Aliquip duis est in commodo pariatur
            </Alert.Title>
            <Alert.Content spacing>
              Ullamco ullamco laborum et commodo sint culpa cupidatat culpa qui
              laboris ex. Labore ex occaecat proident qui qui fugiat magna.
              Fugiat sint commodo consequat eu aute.
            </Alert.Content>
            <Alert.Title level="3">
              Ullamco eiusmod Lorem eiusmod eu.
            </Alert.Title>
            <Alert.Content>
              Ullamco ullamco laborum et commodo sint culpa cupidatat culpa qui
              laboris ex. Labore ex occaecat proident qui qui fugiat magna.
              Fugiat sint commodo consequat eu aute.
            </Alert.Content>
          </Alert>
        ))}
      </div>
    </>
  );
};
