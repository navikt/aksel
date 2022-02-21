import React, { useState } from "react";
import { Button } from "./index";
import { SaveFile, Success } from "@navikt/ds-icons";
import { BodyLong, Panel } from "..";

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

export const UUDemo = () => {
  const [loading, setLoading] = useState(false);

  const handleLoading = () => {
    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timeout);
  };

  return (
    <div
      style={{
        maxWidth: 400,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 16,
      }}
    >
      <h1>Button med Aria-live alltid satt</h1>
      <Panel border>
        <BodyLong spacing>
          Lorem incididunt cillum anim incididunt consectetur aute do mollit.
          Incididunt incididunt qui sunt id. Dolore deserunt nulla do enim in id
          id cillum voluptate minim ad. Lorem sit sunt minim excepteur elit est
          adipisicing aute qui qui incididunt.
        </BodyLong>
        <BodyLong spacing>
          Aliquip dolor magna ullamco ad in Lorem adipisicing veniam pariatur.
          Ut aliqua officia ullamco nulla proident occaecat. Labore sint
          proident esse pariatur ullamco nostrud ad reprehenderit consectetur
          minim anim non. Nostrud ad tempor fugiat dolor nostrud proident
          aliquip eu velit id nulla fugiat laborum.
        </BodyLong>
      </Panel>
      <Button aria-live="polite" onClick={handleLoading} loading={loading}>
        <SaveFile />
        Lagre melding
      </Button>
    </div>
  );
};

export const UUDemo2 = () => {
  const [loading, setLoading] = useState(false);

  const handleLoading = () => {
    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timeout);
  };

  return (
    <div
      style={{
        maxWidth: 400,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 16,
      }}
    >
      <h1>Button med Aria-live bare ved loading-state</h1>
      <Panel border>
        <BodyLong spacing>
          Lorem incididunt cillum anim incididunt consectetur aute do mollit.
          Incididunt incididunt qui sunt id. Dolore deserunt nulla do enim in id
          id cillum voluptate minim ad. Lorem sit sunt minim excepteur elit est
          adipisicing aute qui qui incididunt.
        </BodyLong>
        <BodyLong spacing>
          Aliquip dolor magna ullamco ad in Lorem adipisicing veniam pariatur.
          Ut aliqua officia ullamco nulla proident occaecat. Labore sint
          proident esse pariatur ullamco nostrud ad reprehenderit consectetur
          minim anim non. Nostrud ad tempor fugiat dolor nostrud proident
          aliquip eu velit id nulla fugiat laborum.
        </BodyLong>
      </Panel>
      <Button
        aria-live={loading ? "polite" : undefined}
        onClick={handleLoading}
        loading={loading}
      >
        <SaveFile />
        Lagre melding
      </Button>
    </div>
  );
};
