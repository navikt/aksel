import React, { useState } from "react";
import { Button } from "./index";
import { Success } from "@navikt/ds-icons";

export default {
  title: "ds-react/button",
  component: Button,
};

const Section = ({ children }) => (
  <div
    style={{
      display: "flex",
      gap: 16,
      gridAutoFlow: "column",
      justifyContent: "start",
      padding: 24,
      paddingLeft: 0,
    }}
  >
    {children}
  </div>
);

const variants: Array<"primary" | "secondary" | "tertiary" | "danger"> = [
  "primary",
  "secondary",
  "tertiary",
  "danger",
];

const varSwitch = {
  primary: "Primary",
  secondary: "Secondary",
  tertiary: "Tertiary",
  danger: "Danger",
};

export const All = () => {
  const [loadingState, setLoadingState] = useState(true);
  const [content, setContent] = useState<string>("");

  const toggleLoading = () => {
    setLoadingState(!loadingState);
  };

  return (
    <div style={{ paddingLeft: "1rem" }}>
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
          <Button as="a" key={variant} variant={variant} href="the-link">
            {varSwitch[variant]}
          </Button>
        ))}
      </Section>
      <h2>Small</h2>
      <Section>
        {variants.map((variant) => (
          <Button key={variant} variant={variant} size="small">
            {varSwitch[variant]}
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
            <span className="navds-sr-only">Success ikon</span>
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
            <span className="navds-sr-only">Success ikon</span>
            <Success />
          </Button>
        ))}
      </Section>
      <h2>Button w/loader</h2>
      <Button onClick={toggleLoading}>Toggle loaders</Button>
      <Button onClick={() => setContent((content) => `${content} wat`)}>
        Change content
      </Button>
      <Section>
        {variants.map((variant) => (
          <Button
            key={variant}
            variant={variant}
            loading={loadingState}
            onClick={toggleLoading}
            aria-label={loadingState ? "laster inn data" : undefined}
          >
            {content || varSwitch[variant]}
          </Button>
        ))}
      </Section>
      <h2>Small w/loader</h2>
      <Section>
        {variants.map((variant) => (
          <Button
            key={variant}
            variant={variant}
            size="small"
            loading={loadingState}
            onClick={toggleLoading}
            aria-label={loadingState ? "laster inn data" : undefined}
          >
            {varSwitch[variant]}
          </Button>
        ))}
      </Section>
    </div>
  );
};
