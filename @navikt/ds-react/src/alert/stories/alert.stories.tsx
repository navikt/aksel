import React from "react";
import { Alert } from "..";
import { BodyLong, Heading } from "../..";

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
          <Alert.Content>
            {new Array(i + 1).fill(
              "Id elit esse enim reprehenderit enim nisi veniam nostrud."
            )}
          </Alert.Content>
        </Alert>
      ))}
      <h2>Small</h2>
      <div>
        {variants.map((variant, i) => (
          <Alert key={variant} variant={variant} size="small">
            <Alert.Content>
              {new Array(i + 1).fill(
                "Id elit esse enim reprehenderit enim nisi veniam nostrud."
              )}
            </Alert.Content>
          </Alert>
        ))}
      </div>
      <h2>Alert fullWidth</h2>
      {variants.map((variant, i) => (
        <Alert fullWidth key={variant} variant={variant}>
          <Alert.Content>
            {new Array(i + 1).fill(
              "Id elit esse enim reprehenderit enim nisi veniam nostrud."
            )}
          </Alert.Content>
        </Alert>
      ))}
      <h2>Small</h2>
      <div>
        {variants.map((variant, i) => (
          <Alert fullWidth key={variant} variant={variant} size="small">
            <Alert.Content>
              {new Array(i + 1).fill(
                "Id elit esse enim reprehenderit enim nisi veniam nostrud."
              )}
            </Alert.Content>
          </Alert>
        ))}
      </div>
      <h2>Inline</h2>
      <div>
        {variants.map((variant, i) => (
          <Alert inline key={variant} variant={variant}>
            <Alert.Content>
              {new Array(i + 1).fill(
                "Id elit esse enim reprehenderit enim nisi veniam nostrud."
              )}
            </Alert.Content>
          </Alert>
        ))}
      </div>
      <h2>Inline small</h2>
      <div>
        {variants.map((variant, i) => (
          <Alert inline key={variant} variant={variant} size="small">
            <Alert.Content>
              {new Array(i + 1).fill(
                "Id elit esse enim reprehenderit enim nisi veniam nostrud."
              )}
            </Alert.Content>
          </Alert>
        ))}
      </div>
      <h2>Med Heading</h2>
      <div>
        {variants.map((variant, i) => (
          <Alert key={variant} variant={variant}>
            <Alert.Title>Aliquip duis est in commodo pariatur</Alert.Title>
            <Alert.Content>
              <BodyLong spacing>
                Ullamco ullamco laborum et commodo sint culpa cupidatat culpa
                qui laboris ex. Labore ex occaecat proident qui qui fugiat
                magna. Fugiat sint commodo consequat eu aute.
              </BodyLong>
              <Heading as="div" size="small" spacing>
                Ullamco eiusmod Lorem eiusmod eu.
              </Heading>
              <BodyLong>
                Ullamco ullamco laborum et commodo sint culpa cupidatat culpa
                qui laboris ex. Labore ex occaecat proident qui qui fugiat
                magna. Fugiat sint commodo consequat eu aute.
              </BodyLong>
            </Alert.Content>
          </Alert>
        ))}
      </div>
      <h2>Med Heading small</h2>
      <div>
        {variants.map((variant, i) => (
          <Alert key={variant} variant={variant} size="small">
            <Alert.Title>Aliquip duis est in commodo pariatur</Alert.Title>
            <Alert.Content>
              <BodyLong spacing>
                Ullamco ullamco laborum et commodo sint culpa cupidatat culpa
                qui laboris ex. Labore ex occaecat proident qui qui fugiat
                magna. Fugiat sint commodo consequat eu aute.
              </BodyLong>
              <Heading as="div" size="xsmall" spacing>
                Ullamco eiusmod Lorem eiusmod eu.
              </Heading>
              <BodyLong>
                Ullamco ullamco laborum et commodo sint culpa cupidatat culpa
                qui laboris ex. Labore ex occaecat proident qui qui fugiat
                magna. Fugiat sint commodo consequat eu aute.
              </BodyLong>
            </Alert.Content>
          </Alert>
        ))}
      </div>
    </>
  );
};
