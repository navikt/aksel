import React from "react";
import { Button } from "../index";
import { Success } from "@navikt/ds-icons";

export default {
  title: "ds-react/button",
  component: Button,
};

const Section = ({ children }) => (
  <div
    style={{
      display: "grid",
      gap: 16,
      gridAutoFlow: "column",
      justifyContent: "start",
      padding: 24,
      background: "lightgray",
    }}
  >
    {children}
  </div>
);

const variants: Array<"primary" | "secondary" | "action" | "danger"> = [
  "primary",
  "secondary",
  "action",
  "danger",
];

export const All = () => {
  return (
    <>
      <h1>Button</h1>
      <Section>
        {variants.map((variant) => (
          <Button key={variant} variant={variant}>
            {variant}
          </Button>
        ))}
      </Section>
      <h2>disabled</h2>
      <Section>
        {variants.map((variant) => (
          <Button key={variant} variant={variant} disabled>
            {variant}
          </Button>
        ))}
      </Section>
      <h2>As link</h2>
      <Section>
        {variants.map((variant) => (
          <a
            key={variant}
            className={`navds-button navds-button--${variant} navds-body-short`}
            href="the-link"
          >
            {variant}
          </a>
        ))}
      </Section>
      <h2>Small</h2>
      <Section>
        {variants.map((variant) => (
          <Button key={variant} variant={variant} size="s">
            {variant}
          </Button>
        ))}
      </Section>
    </>
  );
};

export const ButtonWIcon = () => {
  return (
    <div>
      <Button>
        Button
        <Success />
      </Button>
      <br />
      <Button size="s">
        Button
        <Success />
      </Button>
    </div>
  );
};
