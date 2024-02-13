import { Meta } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import React, { useRef } from "react";
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
} as Meta;

export const Default = {
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

export const Small = () => (
  <ErrorSummary heading="Feiloppsummering komponent" size="small">
    <ErrorSummary.Item href="#1">Checkbox må fylles ut</ErrorSummary.Item>
    <ErrorSummary.Item href="#2">
      Tekstfeltet må ha en godkjent e-mail
    </ErrorSummary.Item>
  </ErrorSummary>
);

export const A11yDemo = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const ref = useRef<HTMLHeadingElement>(null);
    return (
      <div>
        <button onClick={() => ref.current?.focus()}>
          Fokuser Errorsummary på klikk
        </button>
        <ErrorSummary heading="Feiloppsummering tittel" focusTargetRef={ref}>
          <ErrorSummary.Item href="#1">Checkbox må fylles ut</ErrorSummary.Item>
          <ErrorSummary.Item href="#2">
            Tekstfeltet må ha en godkjent e-mail
          </ErrorSummary.Item>
        </ErrorSummary>
      </div>
    );
  },
};

export const FocusDemo = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const ref = useRef<HTMLHeadingElement>(null);
    return (
      <div>
        <button onClick={() => ref.current?.focus()}>Focus summary</button>
        <ErrorSummary heading="Feiloppsummering tittel" focusTargetRef={ref}>
          <ErrorSummary.Item href="#1">Checkbox må fylles ut</ErrorSummary.Item>
          <ErrorSummary.Item href="#2">
            Tekstfeltet må ha en godkjent e-mail
          </ErrorSummary.Item>
        </ErrorSummary>
      </div>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    const button = canvas.getByText("Focus summary");
    const heading = canvas.getByText("Feiloppsummering tittel");

    await step("click button", async () => {
      await userEvent.click(button);
    });

    expect(heading).toHaveFocus();
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};
