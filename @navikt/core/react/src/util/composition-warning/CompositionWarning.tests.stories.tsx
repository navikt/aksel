import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "@storybook/test";
import React, { PropsWithChildren, useLayoutEffect, useState } from "react";
import { CompositionWarning } from ".";

export default {
  title: "Utilities/CompositionWarning/Tests",
  parameters: {
    chromatic: { disable: true },
  },
} satisfies Meta;

type Story = StoryObj;

function ConsoleWarnCapture({ children }: PropsWithChildren) {
  const [count, setCount] = useState(0);
  const [lastMessage, setLastMessage] = useState<string>("");

  useLayoutEffect(() => {
    const original = console.warn;
    const override: typeof console.warn = (...args) => {
      setCount((c) => c + 1);
      if (args.length > 0) {
        setLastMessage(String(args[0]));
      }
      return original.apply(console, args);
    };

    console.warn = override;
    return () => {
      console.warn = original;
    };
  }, []);

  return (
    <div>
      <div data-testid="warn-count">{`Console warnings: ${count}`}</div>
      <div data-testid="last-message">{`Laste msg: ${lastMessage}`}</div>
      {children}
    </div>
  );
}

const flush = () => new Promise((r) => setTimeout(r, 0));

export const WarnsOnMatch: Story = {
  name: "warns in dev when names match",
  render: () => (
    <ConsoleWarnCapture>
      <CompositionWarning.Root name="FormSummary.Header">
        <CompositionWarning.Forbidden
          name="FormSummary.Header"
          message="This child is forbidden in FormSummary.Header"
        >
          <button type="button">child</button>
        </CompositionWarning.Forbidden>
      </CompositionWarning.Root>
    </ConsoleWarnCapture>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await flush();

    const countEl = canvas.getByTestId("warn-count");
    const msgEl = canvas.getByTestId("last-message");

    expect(countEl.textContent).toBe("1");
    expect(msgEl.textContent).toContain(
      "[Aksel] This child is forbidden in FormSummary.Header",
    );
  },
};

export const NoWarnOnMismatch: Story = {
  name: "does not warn when names differ",
  render: () => (
    <ConsoleWarnCapture>
      <CompositionWarning.Root name="FormSummary.Footer">
        <CompositionWarning.Forbidden
          name="FormSummary.Header"
          message="Should not appear"
        >
          <button type="button">child</button>
        </CompositionWarning.Forbidden>
      </CompositionWarning.Root>
    </ConsoleWarnCapture>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await flush();

    const countEl = canvas.getByTestId("warn-count");
    expect(countEl.textContent).toBe("0");
  },
};

export const NoWarnWithoutProvider: Story = {
  name: "does not warn without provider",
  render: () => (
    <ConsoleWarnCapture>
      <CompositionWarning.Forbidden
        name="FormSummary.Header"
        message="Should not appear"
      >
        <button type="button">child</button>
      </CompositionWarning.Forbidden>
    </ConsoleWarnCapture>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await flush();

    const countEl = canvas.getByTestId("warn-count");
    expect(countEl.textContent).toBe("0");
  },
};
