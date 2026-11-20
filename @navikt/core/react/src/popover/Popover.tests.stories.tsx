import type { StoryObj } from "@storybook/react-vite";
import React, { useState } from "react";
import { createPortal } from "react-dom";
import { expect, fn, userEvent, waitFor, within } from "storybook/test";
import { Dialog, DialogPopup, DialogTitle, DialogTrigger } from "../dialog";
import { Popover } from "./root/PopoverRoot";

export default {
  title: "ds-react/Popover/tests",
  component: Popover,
  parameters: {
    chromatic: { disable: true },
  },
};

type Story = StoryObj<typeof Popover>;

function PopoverTestRender({
  initialOpen = false,
  extraElements,
}: {
  initialOpen?: boolean;
  extraElements?: React.ReactNode;
}) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [open, setOpen] = useState(initialOpen);

  return (
    <div>
      {extraElements}
      <button type="button" ref={setAnchorEl} onClick={() => setOpen(true)}>
        open
      </button>
      <Popover open={open} anchorEl={anchorEl} onClose={() => setOpen(false)}>
        This is a popover
      </Popover>
    </div>
  );
}

export const ShowHidePopover: Story = {
  render: () => <PopoverTestRender initialOpen={false} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const popover = canvas.getByText("This is a popover");
    const button = canvas.getByRole("button", { name: "open" });

    expect(popover).not.toBeVisible();

    await userEvent.click(button);
    expect(popover).toBeVisible();

    await userEvent.click(document.body);
    expect(popover).not.toBeVisible();
  },
};

export const HideOnOutsideClick: Story = {
  render: () => (
    <PopoverTestRender
      initialOpen={true}
      extraElements={<button type="button">Outside-element</button>}
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const popover = canvas.getByText("This is a popover");

    expect(popover).toBeVisible();

    await userEvent.click(canvas.getByText("Outside-element"));
    expect(popover).not.toBeVisible();
  },
};

export const HideOnEscape: Story = {
  render: () => <PopoverTestRender initialOpen={true} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const popover = canvas.getByText("This is a popover");

    expect(popover).toBeVisible();

    await userEvent.keyboard("{Escape}");
    expect(popover).not.toBeVisible();
  },
};

export const KeepOpenOnPopoverClick: Story = {
  render: () => <PopoverTestRender initialOpen={true} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const popover = canvas.getByText("This is a popover");

    expect(popover).toBeVisible();

    await userEvent.click(popover);
    expect(popover).toBeVisible();
  },
};

function ShadowFocusTestRender() {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button type="button" ref={setAnchorEl} onClick={() => setOpen(true)}>
        Open popover
      </button>
      <Popover open={open} anchorEl={anchorEl} onClose={() => setOpen(false)}>
        <button type="button">Inside popover</button>
        {open &&
          anchorEl &&
          createPortal(
            <button type="button">Portaled popover content</button>,
            anchorEl.ownerDocument.body,
          )}
      </Popover>
      <button type="button">Another button</button>
    </div>
  );
}

export const DismissOnFocusLeavingShadowPopover: Story = {
  globals: { webComponentWrapper: "open" },
  render: () => <ShadowFocusTestRender />,
  play: async ({ canvasElement }) => {
    const root = canvasElement.firstElementChild?.shadowRoot;
    const mount = root?.querySelector("div");
    if (!root || !mount) {
      throw new Error("Expected the open shadow root Storybook decorator");
    }

    const canvas = within(mount);
    const anchor = canvas.getByRole("button", { name: "Open popover" });
    const outside = canvas.getByRole("button", { name: "Another button" });

    anchor.focus();
    await userEvent.click(anchor);
    const inside = canvas.getByRole("button", { name: "Inside popover" });
    expect(inside).toBeVisible();
    inside.focus();
    expect(root.activeElement).toBe(inside);

    const portaled = within(canvasElement.ownerDocument.body).getByRole(
      "button",
      { name: "Portaled popover content" },
    );
    portaled.focus();
    await new Promise<void>((resolve) => setTimeout(resolve, 0));
    expect(portaled).toHaveFocus();
    expect(inside).toBeVisible();

    anchor.focus();
    await new Promise<void>((resolve) => setTimeout(resolve, 0));
    expect(root.activeElement).toBe(anchor);
    expect(inside).toBeVisible();

    // Like tabbing past a Popover with no tabbable content, leaving the anchor
    // directly should close it too.
    outside.focus();
    expect(root.activeElement).toBe(outside);
    await waitFor(() => expect(inside).not.toBeVisible());

    await userEvent.click(anchor);
    inside.focus();
    expect(root.activeElement).toBe(inside);
    expect(inside).toBeVisible();
    outside.focus();
    await waitFor(() => expect(inside).not.toBeVisible());
    expect(root.activeElement).toBe(outside);
  },
};

export const DismissOnFocusMovingToEnclosingShadowRoot: Story = {
  globals: { webComponentWrapper: "open" },
  render: function NestedShadowPopover() {
    const [root, setRoot] = useState<ShadowRoot | null>(null);
    const attachRoot = React.useCallback((host: HTMLDivElement | null) => {
      if (host) {
        setRoot(host.shadowRoot ?? host.attachShadow({ mode: "open" }));
      }
    }, []);

    return (
      <>
        <div ref={attachRoot} data-testid="inner-host" />
        {root && createPortal(<ShadowFocusTestRender />, root)}
        <button type="button">Enclosing root button</button>
      </>
    );
  },
  play: async ({ canvasElement }) => {
    const outerRoot = canvasElement.firstElementChild?.shadowRoot;
    const outerMount = outerRoot?.querySelector("div");
    if (!outerRoot || !outerMount) {
      throw new Error("Expected the open shadow root Storybook decorator");
    }

    const outerCanvas = within(outerMount);
    const innerRoot = outerCanvas.getByTestId("inner-host").shadowRoot;
    const innerMount = innerRoot?.querySelector("div");
    if (!innerRoot || !innerMount) {
      throw new Error("Expected a popover in the nested shadow root");
    }

    const innerCanvas = within(innerMount);
    await userEvent.click(
      innerCanvas.getByRole("button", { name: "Open popover" }),
    );
    const inside = innerCanvas.getByRole("button", { name: "Inside popover" });
    inside.focus();
    await tick();
    expect(innerRoot.activeElement).toBe(inside);
    const enclosingButton = outerCanvas.getByRole("button", {
      name: "Enclosing root button",
    });
    enclosingButton.focus();
    await waitFor(() =>
      expect(
        innerCanvas.queryByRole("button", { name: "Inside popover" }),
      ).not.toBeInTheDocument(),
    );
    expect(outerRoot.activeElement).toBe(enclosingButton);
  },
};

/* ------------------------- Focus outside scenarios ------------------------ */
function tick() {
  return new Promise<void>((resolve) => setTimeout(resolve, 0));
}

function FocusScenarioRender({
  onClose,
  children,
}: {
  onClose?: () => void;
  children?: React.ReactNode;
}) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button type="button">Before</button>
      <button
        type="button"
        ref={setAnchorEl}
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
      >
        Trigger
      </button>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={() => {
          onClose?.();
          setOpen(false);
        }}
      >
        <Popover.Content>
          <button type="button">Inside</button>
          {children}
        </Popover.Content>
      </Popover>
      <button type="button">After</button>
    </div>
  );
}

function getFocusScenario(canvasElement: HTMLElement) {
  const canvas = within(canvasElement);
  const trigger = canvas.getByRole("button", { name: "Trigger" });
  return {
    canvas,
    before: canvas.getByRole("button", { name: "Before" }),
    trigger,
    after: canvas.getByRole("button", { name: "After" }),
    openWithKeyboard: async () => {
      trigger.focus();
      await userEvent.keyboard("{Enter}");
      expect(trigger).toHaveAttribute("aria-expanded", "true");
    },
    expectClosed: () =>
      waitFor(() => expect(trigger).toHaveAttribute("aria-expanded", "false")),
  };
}

export const FocusOutsideWithoutFocusedTrigger: Story = {
  render: (args) => <FocusScenarioRender onClose={args.onClose} />,
  play: async ({ args, canvasElement }) => {
    const { before, trigger, after, expectClosed } =
      getFocusScenario(canvasElement);

    before.focus();
    after.focus();
    await tick();
    expect(args.onClose).not.toHaveBeenCalled();

    // Safari and Firefox on macOS don't focus buttons on click
    await userEvent.click(trigger);
    trigger.blur();
    expect(document.body).toHaveFocus();
    expect(trigger).toHaveAttribute("aria-expanded", "true");

    after.focus();
    await expectClosed();
    expect(args.onClose).toHaveBeenCalledOnce();
  },
  args: { onClose: fn() },
};

export const FocusOutsideWithKeyboard: Story = {
  render: (args) => <FocusScenarioRender onClose={args.onClose} />,
  play: async ({ args, canvasElement }) => {
    const { canvas, before, trigger, after, openWithKeyboard, expectClosed } =
      getFocusScenario(canvasElement);

    await openWithKeyboard();
    await userEvent.tab();
    expect(canvas.getByRole("button", { name: "Inside" })).toHaveFocus();
    await userEvent.tab({ shift: true });
    expect(trigger).toHaveFocus();
    await tick();
    expect(args.onClose).not.toHaveBeenCalled();

    await userEvent.tab({ shift: true });
    expect(before).toHaveFocus();
    await expectClosed();
    expect(args.onClose).toHaveBeenCalledOnce();

    await openWithKeyboard();
    await userEvent.tab();
    await userEvent.tab();
    expect(after).toHaveFocus();
    await expectClosed();
    expect(args.onClose).toHaveBeenCalledTimes(2);
  },
  args: { onClose: fn() },
};

function SelfRemovingButton() {
  const [visible, setVisible] = useState(true);
  return visible ? (
    <button type="button" onClick={() => setVisible(false)}>
      Remove me
    </button>
  ) : null;
}

export const FocusOutsideAfterFocusedContentIsRemoved: Story = {
  render: (args) => (
    <FocusScenarioRender onClose={args.onClose}>
      <SelfRemovingButton />
    </FocusScenarioRender>
  ),
  play: async ({ args, canvasElement }) => {
    const { canvas, after, openWithKeyboard, expectClosed } =
      getFocusScenario(canvasElement);

    await openWithKeyboard();
    canvas.getByRole("button", { name: "Remove me" }).focus();
    await userEvent.keyboard("{Enter}");
    await waitFor(() =>
      expect(
        canvas.queryByRole("button", { name: "Remove me" }),
      ).not.toBeInTheDocument(),
    );
    await tick();
    expect(args.onClose).not.toHaveBeenCalled();

    after.focus();
    await expectClosed();
    expect(args.onClose).toHaveBeenCalledOnce();
  },
  args: { onClose: fn() },
};

function PortaledButton() {
  return createPortal(<button type="button">Portaled</button>, document.body);
}

export const KeepOpenWhenFocusMovesIntoPortalOrIframe: Story = {
  render: (args) => (
    <FocusScenarioRender onClose={args.onClose}>
      <PortaledButton />
      <iframe title="Embedded" srcDoc="<button>Inside frame</button>" />
    </FocusScenarioRender>
  ),
  play: async ({ args, canvasElement }) => {
    const { canvas, trigger, after, openWithKeyboard, expectClosed } =
      getFocusScenario(canvasElement);

    await openWithKeyboard();
    within(document.body).getByRole("button", { name: "Portaled" }).focus();
    await tick();
    canvas.getByTitle("Embedded").focus();
    await tick();
    expect(args.onClose).not.toHaveBeenCalled();
    expect(trigger).toHaveAttribute("aria-expanded", "true");

    after.focus();
    await expectClosed();
    expect(args.onClose).toHaveBeenCalledOnce();
  },
  args: { onClose: fn() },
};

export const KeepOpenWhileNestedDialogIsOpen: Story = {
  render: (args) => (
    <FocusScenarioRender onClose={args.onClose}>
      <Dialog>
        <DialogTrigger>
          <button type="button">Open dialog</button>
        </DialogTrigger>
        <DialogPopup aria-labelledby="nested-dialog-title">
          <DialogTitle id="nested-dialog-title">Nested dialog</DialogTitle>
          <button type="button">Dialog button</button>
        </DialogPopup>
      </Dialog>
    </FocusScenarioRender>
  ),
  beforeEach: () => {
    globalThis.AKSEL_NO_EXIT_ANIMATIONS = true;
    return () => {
      globalThis.AKSEL_NO_EXIT_ANIMATIONS = false;
    };
  },
  play: async ({ args, canvasElement }) => {
    const { canvas, trigger, openWithKeyboard, expectClosed } =
      getFocusScenario(canvasElement);
    const page = within(document.body);

    await openWithKeyboard();
    const dialogTrigger = canvas.getByRole("button", { name: "Open dialog" });
    dialogTrigger.focus();
    await userEvent.keyboard("{Enter}");

    const dialog = await page.findByRole("dialog", { name: "Nested dialog" });
    await waitFor(() => expect(dialog).toHaveFocus());
    await userEvent.tab();
    expect(page.getByRole("button", { name: "Dialog button" })).toHaveFocus();
    await userEvent.tab();
    await userEvent.tab({ shift: true });
    await tick();
    expect(args.onClose).not.toHaveBeenCalled();

    await userEvent.keyboard("{Escape}");
    await waitFor(() => expect(dialog).not.toBeInTheDocument());
    await waitFor(() => expect(dialogTrigger).toHaveFocus());
    await tick();
    expect(args.onClose).not.toHaveBeenCalled();
    expect(trigger).toHaveAttribute("aria-expanded", "true");

    await userEvent.keyboard("{Escape}");
    await expectClosed();
  },
  args: { onClose: fn() },
};

function PopoverPlacementTestRender({
  anchorTop,
  popoverHeight,
}: {
  anchorTop: string;
  popoverHeight: string;
}) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  return (
    <div style={{ paddingTop: anchorTop }}>
      <button type="button" ref={setAnchorEl}>
        anchor
      </button>
      <Popover
        open
        anchorEl={anchorEl}
        onClose={() => null}
        placement="bottom-start"
        data-testid="popover"
      >
        <div style={{ height: popoverHeight }}>This is a popover</div>
      </Popover>
    </div>
  );
}

export const FlipToTopWhenBottomOverflows: Story = {
  render: () => (
    <PopoverPlacementTestRender
      anchorTop="calc(100vh - 6rem)"
      popoverHeight="8rem"
    />
  ),
  play: async ({ canvasElement }) => {
    const popover = within(canvasElement).getByTestId("popover");

    await waitFor(() =>
      expect(popover).toHaveAttribute("data-placement", "top-start"),
    );
  },
};

export const KeepBottomWhenNeitherSideFits: Story = {
  render: () => (
    <PopoverPlacementTestRender anchorTop="60vh" popoverHeight="150vh" />
  ),
  play: async ({ canvasElement }) => {
    const popover = within(canvasElement).getByTestId("popover");

    await waitFor(() =>
      expect(popover).toHaveAttribute("data-placement", "bottom-start"),
    );
  },
};
