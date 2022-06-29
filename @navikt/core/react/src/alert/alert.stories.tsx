import React from "react";
import { Alert } from ".";
import { BodyLong, Heading as DsHeading } from "..";

export default {
  title: "ds-react/Alert",
  component: Alert,
  argTypes: {
    variant: {
      defaultValue: "info",
      control: {
        type: "radio",
        options: ["error", "warning", "info", "success"],
      },
    },
    size: {
      control: {
        type: "radio",
        options: ["medium", "small"],
      },
    },
  },
};

const variants: Array<"error" | "warning" | "info" | "success"> = [
  "error",
  "warning",
  "info",
  "success",
];

export const Default = (props) => (
  <Alert
    variant={props.variant}
    size={props.size}
    fullWidth={props.fullWidth}
    inline={props.inline}
  >
    {props.children}
  </Alert>
);

Default.args = {
  children: "Id elit esse enim reprehenderit enim nisi veniam nostrud.",
  fullWidth: false,
};

export const Small = () => {
  return (
    <div className="colgap">
      {variants.map((variant, i) => (
        <Alert key={variant} variant={variant} size="small">
          {new Array(i + 1).fill(
            "Id elit esse enim reprehenderit enim nisi veniam nostrud."
          )}
        </Alert>
      ))}
    </div>
  );
};

export const FullWidth = () => {
  return (
    <div className="colgap">
      {variants.map((variant, i) => (
        <Alert key={variant} variant={variant} fullWidth>
          {new Array(i + 1).fill(
            "Id elit esse enim reprehenderit enim nisi veniam nostrud."
          )}
        </Alert>
      ))}
      {variants.map((variant, i) => (
        <Alert key={variant} variant={variant} fullWidth size="small">
          {new Array(i + 1).fill(
            "Id elit esse enim reprehenderit enim nisi veniam nostrud."
          )}
        </Alert>
      ))}
    </div>
  );
};

export const Inline = () => {
  return (
    <div className="colgap">
      {variants.map((variant, i) => (
        <Alert key={variant} variant={variant} inline>
          {new Array(i + 1).fill(
            "Id elit esse enim reprehenderit enim nisi veniam nostrud."
          )}
        </Alert>
      ))}
      {variants.map((variant, i) => (
        <Alert key={variant} variant={variant} inline size="small">
          {new Array(i + 1).fill(
            "Id elit esse enim reprehenderit enim nisi veniam nostrud."
          )}
        </Alert>
      ))}
    </div>
  );
};

export const Heading = () => {
  return (
    <div className="colgap">
      <Alert variant="info">
        <DsHeading spacing size="small" level="3">
          Aliquip duis est in commodo pariatur
        </DsHeading>
        <BodyLong>
          Ullamco ullamco laborum et commodo sint culpa cupidatat culpa qui
          laboris ex. Labore ex occaecat proident qui qui fugiat magna. Fugiat
          sint commodo consequat eu aute.
        </BodyLong>
      </Alert>
      <Alert variant="info" size="small">
        <DsHeading spacing size="xsmall" level="3">
          Aliquip duis est in commodo pariatur
        </DsHeading>
        <BodyLong>
          Ullamco ullamco laborum et commodo sint culpa cupidatat culpa qui
          laboris ex. Labore ex occaecat proident qui qui fugiat magna. Fugiat
          sint commodo consequat eu aute.
        </BodyLong>
      </Alert>
    </div>
  );
};
