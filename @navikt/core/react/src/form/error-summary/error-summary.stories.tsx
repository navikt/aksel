import { Meta, StoryObj } from "@storybook/react";
import React, { useRef, useState } from "react";
import { Button } from "../../button";
import { VStack } from "../../layout/stack";
import { useControllableState } from "../../util/hooks";
import { ErrorSummary } from "./ErrorSummary";

export default {
  title: "ds-react/Errorsummary",
  component: ErrorSummary,
  argTypes: {
    headingTag: {
      control: {
        type: "text",
      },
    },
    size: {
      control: {
        type: "radio",
        options: ["medium", "small"],
      },
    },
  },
  parameters: {
    chromatic: { disable: true },
  },
} satisfies Meta<typeof ErrorSummary>;

type Story = StoryObj<typeof ErrorSummary>;

export const Default: Story = {
  render: (props) => (
    <ErrorSummary
      heading="Feiloppsummering komponent"
      headingTag={props.headingTag || "h2"}
      size={props.size ?? undefined}
    >
      <ErrorSummary.Item href="#1">Checkbox må fylles ut</ErrorSummary.Item>
      <ErrorSummary.Item href="#2">
        Tekstfeltet må ha en godkjent e-mail
      </ErrorSummary.Item>
    </ErrorSummary>
  ),
};

export const Small: Story = {
  render: () => (
    <ErrorSummary heading="Feiloppsummering komponent" size="small">
      <ErrorSummary.Item href="#1">Checkbox må fylles ut</ErrorSummary.Item>
      <ErrorSummary.Item href="#2">
        Tekstfeltet må ha en godkjent e-mail
      </ErrorSummary.Item>
    </ErrorSummary>
  ),
};

export const Focus: Story = {
  render: () => {
    const focusRef = useRef<HTMLDivElement>(null);
    const [error, setError] = useState(false);

    const handleClick = () => {
      const _error = error;
      setError(!error);

      setTimeout(() => {
        !_error && focusRef.current?.focus();
      });
    };
    return (
      <VStack gap="8">
        <ErrorSummary
          ref={focusRef}
          heading="Feiloppsummering heading"
          hidden={!error}
        >
          <ErrorSummary.Item href="#1">Checkbox må fylles ut</ErrorSummary.Item>
          <ErrorSummary.Item href="#2">
            Tekstfeltet må ha en godkjent e-mail
          </ErrorSummary.Item>
        </ErrorSummary>
        <Button onClick={handleClick}>
          {error ? "Slå av errorsummary" : "Slå på errorsummary"}
        </Button>
      </VStack>
    );
  },
};

function useErrorSummary(enabled?: boolean) {
  const focusRef = useRef<HTMLDivElement>(null);

  const focusElement = (_enabled: boolean) => {
    if (_enabled) {
      /* Make sure hidden-state causes re-render before focusing element */
      setTimeout(() => {
        focusRef.current?.focus();
      });
    }
  };

  const [showError, setShowError] = useControllableState({
    defaultValue: enabled ?? false,
    value: enabled,
    onChange: focusElement,
  });

  return {
    props: { ref: focusRef, hidden: !showError },
    toggle: () => setShowError((x) => !x),
    enabled: showError,
    focus: () => focusElement(showError),
  };
}

export const FocusHook: Story = {
  render: () => {
    const { props, toggle, enabled } = useErrorSummary();

    return (
      <VStack gap="8">
        <ErrorSummary heading="Feiloppsummering heading" {...props}>
          <ErrorSummary.Item href="#1">Checkbox må fylles ut</ErrorSummary.Item>
          <ErrorSummary.Item href="#2">
            Tekstfeltet må ha en godkjent e-mail
          </ErrorSummary.Item>
        </ErrorSummary>
        <Button onClick={toggle}>
          {enabled ? "Slå av errorsummary" : "Slå på errorsummary"}
        </Button>
      </VStack>
    );
  },
};

export const FocusHookWithCustomFocus: Story = {
  render: () => {
    const { props, toggle, enabled, focus } = useErrorSummary();

    return (
      <VStack gap="8">
        <ErrorSummary heading="Feiloppsummering heading" {...props}>
          <ErrorSummary.Item href="#1">Checkbox må fylles ut</ErrorSummary.Item>
          <ErrorSummary.Item href="#2">
            Tekstfeltet må ha en godkjent e-mail
          </ErrorSummary.Item>
        </ErrorSummary>
        <Button onClick={toggle}>
          {enabled ? "Slå av errorsummary" : "Slå på errorsummary"}
        </Button>
        {enabled && <Button onClick={focus}>Fokuser errorsummary</Button>}
      </VStack>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [enabled, setEnabled] = useState(false);
    const { props, toggle } = useErrorSummary(enabled);

    return (
      <VStack gap="8">
        <ErrorSummary heading="Feiloppsummering heading" {...props}>
          <ErrorSummary.Item href="#1">Checkbox må fylles ut</ErrorSummary.Item>
          <ErrorSummary.Item href="#2">
            Tekstfeltet må ha en godkjent e-mail
          </ErrorSummary.Item>
        </ErrorSummary>
        <Button
          onClick={() => {
            setEnabled((x) => !x);
            toggle();
          }}
        >
          {enabled ? "Slå av errorsummary" : "Slå på errorsummary"}
        </Button>
      </VStack>
    );
  },
};

export const Chromatic: Story = {
  render: () => (
    <VStack gap="4">
      <div>
        <h2>Default</h2>
        <ErrorSummary heading="Feiloppsummering komponent">
          <ErrorSummary.Item href="#1">Checkbox må fylles ut</ErrorSummary.Item>
          <ErrorSummary.Item href="#2">
            Tekstfeltet må ha en godkjent e-mail
          </ErrorSummary.Item>
        </ErrorSummary>
      </div>
      <div>
        <h2>Small</h2>
        <ErrorSummary heading="Feiloppsummering komponent" size="small">
          <ErrorSummary.Item href="#1">Checkbox må fylles ut</ErrorSummary.Item>
          <ErrorSummary.Item href="#2">
            Tekstfeltet må ha en godkjent e-mail
          </ErrorSummary.Item>
        </ErrorSummary>
      </div>
    </VStack>
  ),
  parameters: {
    chromatic: { disable: false },
  },
};
