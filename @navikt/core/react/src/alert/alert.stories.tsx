import React from "react";
import { Alert } from ".";
import { BodyLong, Heading } from "..";

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
            <Heading spacing size="small" level="3">
              Aliquip duis est in commodo pariatur
            </Heading>
            <BodyLong spacing>
              Ullamco ullamco laborum et commodo sint culpa cupidatat culpa qui
              laboris ex. Labore ex occaecat proident qui qui fugiat magna.
              Fugiat sint commodo consequat eu aute.
            </BodyLong>
            <Heading level="4" size="xsmall" spacing>
              Ullamco eiusmod Lorem eiusmod eu.
            </Heading>
            <BodyLong>
              Ullamco ullamco laborum et commodo sint culpa cupidatat culpa qui
              laboris ex. Labore ex occaecat proident qui qui fugiat magna.
              Fugiat sint commodo consequat eu aute.
            </BodyLong>
          </Alert>
        ))}
      </div>
      <h2>Med Heading small</h2>
      <div>
        {variants.map((variant, i) => (
          <Alert key={variant} variant={variant} size="small">
            <Heading spacing size="small" level="3">
              Aliquip duis est in commodo pariatur
            </Heading>
            <BodyLong spacing>
              Ullamco ullamco laborum et commodo sint culpa cupidatat culpa qui
              laboris ex. Labore ex occaecat proident qui qui fugiat magna.
              Fugiat sint commodo consequat eu aute.
            </BodyLong>
            <Heading level="4" size="xsmall" spacing>
              Ullamco eiusmod Lorem eiusmod eu.
            </Heading>
            <BodyLong>
              Ullamco ullamco laborum et commodo sint culpa cupidatat culpa qui
              laboris ex. Labore ex occaecat proident qui qui fugiat magna.
              Fugiat sint commodo consequat eu aute.
            </BodyLong>
          </Alert>
        ))}
      </div>
    </>
  );
};
