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
          <Button key={variant} variant={variant} size="small">
            {variant}
          </Button>
        ))}
      </Section>
      <h2>Button w/icon</h2>
      <Section>
        {variants.map((variant) => (
          <Button key={variant} variant={variant}>
            {variant} <Success />
          </Button>
        ))}
      </Section>
      <Section>
        {variants.map((variant) => (
          <Button key={variant} variant={variant}>
            <span className="sr-only">Success ikon</span>
            <Success />
          </Button>
        ))}
      </Section>
      <h2>Small w/icon</h2>
      <Section>
        {variants.map((variant) => (
          <Button key={variant} variant={variant} size="small">
            <Success /> {variant}
          </Button>
        ))}
      </Section>
      <Section>
        {variants.map((variant) => (
          <Button key={variant} variant={variant} size="small">
            <span className="sr-only">Success ikon</span>
            <Success />
          </Button>
        ))}
      </Section>
      <div style={{ maxWidth: "200px" }}>
        <Button>
          Proident commodo dolore duis ad et minim reprehenderit nulla ipsum.
        </Button>
        <Button size="small">
          Proident commodo dolore duis ad et minim reprehenderit nulla ipsum.
        </Button>
      </div>
    </>
  );
};
