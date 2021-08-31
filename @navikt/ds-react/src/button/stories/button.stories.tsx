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

const varSwitch = {
  primary: "Primary",
  secondary: "Secondary",
  action: "Action",
  danger: "Danger",
};

export const All = () => {
  return (
    <>
      <h1>Button</h1>
      <Section>
        {variants.map((variant) => (
          <Button key={variant} variant={variant}>
            {varSwitch[variant]}
          </Button>
        ))}
      </Section>
      <h2>disabled</h2>
      <Section>
        {variants.map((variant) => (
          <Button key={variant} variant={variant} disabled>
            {varSwitch[variant]}
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
            {varSwitch[variant]}
          </a>
        ))}
      </Section>
      <h2>Small</h2>
      <Section>
        {variants.map((variant) => (
          <Button key={variant} variant={variant} size="s">
            {varSwitch[variant]}
          </Button>
        ))}
      </Section>
      <h2>Button w/icon</h2>
      <Section>
        {variants.map((variant) => (
          <Button key={variant} variant={variant}>
            <span>{varSwitch[variant]}</span> <Success />
          </Button>
        ))}
      </Section>
      <h2>Small w/icon</h2>
      <Section>
        {variants.map((variant) => (
          <Button key={variant} variant={variant} size="s">
            <Success /> <span>{varSwitch[variant]}</span>
          </Button>
        ))}
      </Section>
      <Section>
        {variants.map((variant) => (
          <Button key={variant} variant={variant} size="s">
            <span className="sr-only">Success ikon</span>
            <Success />
          </Button>
        ))}
      </Section>
    </>
  );
};
