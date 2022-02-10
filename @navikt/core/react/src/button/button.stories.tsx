import React, { useState } from "react";
import { Button } from "./index";
import { Success } from "@navikt/ds-icons";
import { CheckboxGroup, Checkbox } from "..";

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
          >
            {varSwitch[variant]}
          </Button>
        ))}
      </Section>
    </div>
  );
};

export const ThemeExample = () => {
  const [theme, setTheme] = useState(3);

  const tokens = [
    {
      "--navds-button-color": "var(--navds-global-color-blue-500)",
      "--navds-button-color-hover": "var(--navds-global-color-blue-600)",
      "--navds-button-color-active": "var(--navds-global-color-blue-700)",
      "--navds-checkbox-radio-color": "var(--navds-global-color-blue-500)",
      "--navds-checkbox-radio-color-hover": "var(--navds-global-color-blue-50)",
    },
    {
      "--navds-button-color": "var(--navds-global-color-purple-500)",
      "--navds-button-color-hover": "var(--navds-global-color-purple-600)",
      "--navds-button-color-active": "var(--navds-global-color-purple-700)",
      "--navds-button-radii": "28px",
      "--navds-checkbox-radio-color": "var(--navds-global-color-purple-500)",
      "--navds-checkbox-radio-color-hover":
        "var(--navds-global-color-purple-50)",
    },
    {
      "--navds-button-color": "var(--navds-global-color-gray-900)",
      "--navds-button-color-hover": "var(--navds-global-color-gray-800)",
      "--navds-button-color-active": "var(--navds-global-color-gray-900)",
      "--navds-checkbox-radio-color": "var(--navds-global-color-gray-900)",
      "--navds-checkbox-radio-color-hover": "var(--navds-global-color-gray-50)",
    },
    {
      "--navds-button-color-light": "var(--navds-global-color-gray-900)",
      "--navds-button-color": "var(--navds-global-color-blue-100)",
      "--navds-button-color-hover": "var(--navds-global-color-blue-200)",
      "--navds-button-color-active": "var(--navds-global-color-blue-300)",
      "--navds-checkbox-radio-color": "var(--navds-global-color-blue-100)",
      "--navds-checkbox-radio-color-hover":
        "var(--navds-global-color-gray-800)",
      "--navds-checkbox-radio-color-light":
        "var(--navds-global-color-gray-900)",
      "--navds-checkbox-radio-color-offset":
        "var(--navds-global-color-gray-200)",
      "--navds-checkbox-radio-color-text": "var(--navds-global-color-white)",
    },
  ];

  const getName = () => {
    switch (theme) {
      case 0:
        return "default";
      case 1:
        return "arbeidsplassen";
      case 2:
        return "inverted";
      case 3:
        return "darkmode";
      default:
        break;
    }
  };

  return (
    <div
      style={{
        display: "flex",
        padding: "4rem",
        width: "100%",
        alignItems: "center",
        flexDirection: "column",
        background: theme === 3 && "var(--navds-global-color-gray-900)",
        ...tokens[theme],
      }}
    >
      <Button onClick={() => setTheme(theme === 3 ? 0 : theme + 1)}>
        Toggle theme: {getName()}
      </Button>
      <div
        style={{
          display: "flex",
          gap: "3rem",
          margin: "4rem 0",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "3rem",
          }}
        >
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="tertiary">Tertiary</Button>
        </div>
        <div
          style={{
            display: "flex",
            gap: "3rem",
          }}
        >
          <CheckboxGroup legend="Lorem" hideLegend>
            <Checkbox defaultChecked value="Apple">
              Apple
            </Checkbox>
            <Checkbox defaultChecked value="Orange" description="Laborum ad">
              Orange
            </Checkbox>
          </CheckboxGroup>
        </div>
      </div>
      Før 35, nå 5/6 tokens
      <pre style={{ color: theme === 3 && "white" }}>
        {JSON.stringify(tokens[theme], null, 2)
          .replaceAll('"', "")
          .replace("{", "")
          .replace("}", "")}
      </pre>
    </div>
  );
};
