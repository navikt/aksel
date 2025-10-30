import type { StoryObj } from "@storybook/react/*";
import React from "react";
import { expect, userEvent, within } from "storybook/test";
import { Provider } from "../provider";
import { Portal } from "./Portal";

export default {
  title: "Utilities/Portal/Tests",
  parameters: {
    chromatic: { disable: true },
  },
};

type Story = StoryObj<typeof PortalComponent>;

export const CustomContainer: Story = {
  render: () => {
    const [customRoot, setCustomRoot] = React.useState<HTMLElement | null>(
      null,
    );

    return (
      <div>
        <div data-testid="custom-root" ref={setCustomRoot} />
        <PortalComponent rootElement={customRoot} />
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const customRoot = canvas.getByTestId("custom-root");

    const portalNode = canvas.getByTestId("portal-node");

    expect(portalNode.parentElement).toBe(customRoot);
  },
};

export const CustomContainerFromProvider: Story = {
  render: () => {
    const [customRoot, setCustomRoot] = React.useState<HTMLElement | null>(
      null,
    );

    return (
      <Provider rootElement={customRoot ?? undefined}>
        <div data-testid="custom-root" ref={setCustomRoot} />
        <PortalComponent />
      </Provider>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const customRoot = canvas.getByTestId("custom-root");

    const portalNode = canvas.getByTestId("portal-node");

    expect(portalNode.parentElement).toBe(customRoot);
  },
};

export const AllowContainerChange: Story = {
  render: () => {
    const [customRootOne, setCustomRootOne] =
      React.useState<HTMLElement | null>(null);
    const [customRootTwo, setCustomRootTwo] =
      React.useState<HTMLElement | null>(null);
    const [activated, setActivated] = React.useState<boolean>(false);

    return (
      <div>
        <button onClick={() => setActivated(true)}>Change root</button>
        <div data-testid="custom-root-one" ref={setCustomRootOne} />
        <div data-testid="custom-root-two" ref={setCustomRootTwo} />
        <PortalComponent
          rootElement={activated ? customRootTwo : customRootOne}
        />
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const customRootOne = canvas.getByTestId("custom-root-one");
    const customRootTwo = canvas.getByTestId("custom-root-two");

    let portalNode = canvas.getByTestId("portal-node");

    expect(portalNode.parentElement).toBe(customRootOne);

    await userEvent.click(canvas.getByRole("button", { name: "Change root" }));

    /* Portal-node is re-attached, so reference is changed */
    portalNode = canvas.getByTestId("portal-node");

    expect(portalNode.parentElement).toBe(customRootTwo);
  },
};

export const NestedPortalsAreInCorrectTree: Story = {
  render: () => {
    /**
     * We still need custom root since `canvasElement`!== document.body in Storybook play functions
     */
    const [customRoot, setCustomRoot] = React.useState<HTMLElement | null>(
      null,
    );
    return (
      <div>
        <div data-testid="custom-root" ref={setCustomRoot} />

        <PortalComponent rootElement={customRoot} nested prefix="level-one-" />
        <PortalComponent rootElement={customRoot} prefix="level-two-" />
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const root = canvas.getByTestId("level-one-portal-node");
    const nested = canvas.getByTestId("level-one-nestedportal-node");
    const rootTwoNode = canvas.getByTestId("level-two-portal-node");

    expect(nested.parentElement).toBe(root);
    expect(rootTwoNode.parentElement).not.toBe(root);
    expect(rootTwoNode.previousSibling).toBe(root);
  },
};

function PortalComponent({
  nested = false,
  prefix = "",
  rootElement,
}: {
  nested?: boolean;
  prefix?: string;
  rootElement?: HTMLElement | null;
}) {
  return (
    <Portal data-testid={`${prefix}portal-node`} rootElement={rootElement}>
      <div
        data-testid={`${prefix}inside-portal`}
        style={{
          background: "gray",
          padding: "1rem",
        }}
      >
        Portal {prefix}
      </div>
      {nested && <PortalComponent prefix={`${prefix}nested`} />}
    </Portal>
  );
}
