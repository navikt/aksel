import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { expect, fireEvent, fn, userEvent, within } from "storybook/test";
import { Button } from "../button";
import { Provider } from "../provider";
import {
  Dialog,
  DialogBackdrop,
  DialogClose,
  type DialogCloseProps,
  DialogDrawer,
  type DialogDrawerProps,
  DialogPortal,
  type DialogProps,
  DialogTrigger,
  type DialogTriggerProps,
} from "./index";

const meta: Meta<typeof Dialog> = {
  title: "ds-react/Dialog/Tests",
  component: Dialog,
  parameters: {
    chromatic: { disable: true },
  },
  decorators: [
    (Story) => (
      <PortalContainer>
        <div>
          {BackDropStyle}
          {DrawerStyle}
          <Story />
        </div>
      </PortalContainer>
    ),
  ],
};

export default meta;
type Story = StoryObj<BaseDialogProps>;

function testUtils(canvasElement: HTMLElement, args: BaseDialogProps) {
  const canvas = within(canvasElement);
  return {
    canvas,
    expectDrawerOpen: () =>
      expect(canvas.getByTestId("drawer")).toBeInTheDocument(),
    expectDrawerClosed: () =>
      expect(canvas.queryByTestId("drawer")).not.toBeInTheDocument(),
    expectOpenedCalls: (n: number) => {
      expect(args.rootProps?.onOpenChange).toHaveBeenCalledTimes(n);
    },
    clickCloseButton: async () => {
      await userEvent.click(canvas.getByText("Close"));
    },
  };
}

/* ----------------------------- State handling ----------------------------- */
export const CancelClose: Story = {
  render: BaseDialogComponent,
  beforeEach: withoutAnimations,
  play: async ({ canvasElement, args }) => {
    const { canvas, clickCloseButton } = testUtils(canvasElement, args);
    const drawer = canvas.getByTestId("drawer");

    await clickCloseButton();
    // Dialog should remain open
    expect(drawer).toBeInTheDocument();
  },
  args: {
    rootProps: {
      defaultOpen: true,
      onOpenChange: (_, event) => event?.preventDefault(),
    },
  },
};

export const CancelEscapeClose: Story = {
  render: BaseDialogComponent,
  beforeEach: withoutAnimations,
  play: async ({ canvasElement, args }) => {
    const { expectDrawerOpen } = testUtils(canvasElement, args);

    await userEvent.keyboard("{Escape}");
    // Dialog should remain open
    expectDrawerOpen();
  },
  args: {
    rootProps: {
      defaultOpen: true,
      onOpenChange: (_, event) => event?.preventDefault(),
    },
  },
};

export const EscapeClose: Story = {
  render: BaseDialogComponent,
  beforeEach: withoutAnimations,
  play: async ({ canvasElement, args }) => {
    const { expectDrawerOpen, expectDrawerClosed } = testUtils(
      canvasElement,
      args,
    );
    expectDrawerOpen();
    await userEvent.keyboard("{Escape}");
    expectDrawerClosed();
  },
  args: {
    rootProps: {
      defaultOpen: true,
    },
  },
};

export const NestedEscapeClose: Story = {
  render: BaseDialogComponent,
  beforeEach: withoutAnimations,
  play: async ({ canvasElement, args }) => {
    const { canvas, expectDrawerOpen, expectDrawerClosed } = testUtils(
      canvasElement,
      args,
    );

    const triggerButton = canvas.getByText("Open Dialog Nested");
    await userEvent.click(triggerButton);

    expect(canvas.getByTestId("drawer-nested")).toBeInTheDocument();
    await userEvent.keyboard("{Escape}");
    expect(canvas.queryByTestId("drawer-nested")).not.toBeInTheDocument();
    expectDrawerOpen();
    await userEvent.keyboard("{Escape}");
    expectDrawerClosed();
  },
  args: {
    rootProps: {
      defaultOpen: true,
    },
    nested: true,
  },
};

export const OutsideClickClose: Story = {
  render: BaseDialogComponent,
  beforeEach: withoutAnimations,
  play: async ({ canvasElement, args }) => {
    const { expectDrawerOpen, expectDrawerClosed, expectOpenedCalls } =
      testUtils(canvasElement, args);

    expectOpenedCalls(0);
    expectDrawerOpen();

    await userEvent.click(document.documentElement);

    expectDrawerClosed();
    expectOpenedCalls(1);
  },
  args: {
    rootProps: {
      defaultOpen: true,
      onOpenChange: fn(),
    },
  },
};

export const OutsideClickNoClose: Story = {
  render: BaseDialogComponent,
  beforeEach: withoutAnimations,
  play: async ({ canvasElement, args }) => {
    const { expectDrawerOpen, expectOpenedCalls } = testUtils(
      canvasElement,
      args,
    );

    expectOpenedCalls(0);
    expectDrawerOpen();

    await userEvent.click(document.documentElement);

    expectDrawerOpen();
    expectOpenedCalls(0);
  },
  args: {
    rootProps: {
      defaultOpen: true,
      onOpenChange: fn(),
    },
    drawerProps: {
      closeOnOutsideClick: false,
    },
  },
};

/* Close should only happend on onClick */
export const OutsideClickIntentionalClose: Story = {
  render: BaseDialogComponent,
  beforeEach: withoutAnimations,
  play: async ({ canvasElement, args }) => {
    const { expectDrawerOpen, expectDrawerClosed, expectOpenedCalls } =
      testUtils(canvasElement, args);

    expectOpenedCalls(0);
    expectDrawerOpen();

    await fireEvent.pointerDown(document.documentElement);
    expectDrawerOpen();
    expectOpenedCalls(0);

    await userEvent.click(document.documentElement);

    expectDrawerClosed();
    expectOpenedCalls(1);
  },
  args: {
    rootProps: {
      defaultOpen: true,
      onOpenChange: fn(),
    },
  },
};

/* ----------------------------- Focus handling ----------------------------- */
export const TrapFocusWithOutsideClick: Story = {
  render: (props) => {
    const [counter, setCounter] = React.useState(0);
    return (
      <div>
        <button
          data-testid="counter"
          onClick={() => setCounter((x) => x + 1)}
        >{`Counter ${counter}`}</button>
        <BaseDialogComponent {...props} />
      </div>
    );
  },
  beforeEach: withoutAnimations,
  play: async ({ canvasElement, args }) => {
    const { canvas, expectDrawerOpen, expectOpenedCalls } = testUtils(
      canvasElement,
      args,
    );

    expectOpenedCalls(0);
    expectDrawerOpen();

    const closeButton = canvas.getByText("Close");
    expect(closeButton).toHaveFocus();

    await fireEvent.click(document.body);
    expectDrawerOpen();
    expectOpenedCalls(0);
    expect(closeButton).toHaveFocus();

    const counterButton = canvas.getByTestId("counter");
    await userEvent.click(counterButton);
    expectDrawerOpen();
    expectOpenedCalls(0);
    expect(closeButton).toHaveFocus();
    expect(counterButton).toHaveTextContent("Counter 1");
  },
  args: {
    rootProps: {
      defaultOpen: true,
      onOpenChange: fn(),
    },
    drawerProps: {
      modal: "trap-focus",
      closeOnOutsideClick: false,
    },
    backdrop: false,
  },
};

export const TrapFocusWithFocusBlur: Story = {
  render: BaseDialogComponent,
  beforeEach: withoutAnimations,
  play: async ({ canvasElement, args }) => {
    const { canvas, expectDrawerOpen, expectOpenedCalls } = testUtils(
      canvasElement,
      args,
    );

    expectOpenedCalls(0);
    expectDrawerOpen();

    const closeButton = canvas.getByText("Close");
    expect(closeButton).toHaveFocus();

    await fireEvent.focus(document.body);
    expectDrawerOpen();
    expectOpenedCalls(0);
    expect(closeButton).toHaveFocus();

    await fireEvent.blur(closeButton);
    expect(canvas.queryByTestId("drawer")).toBeInTheDocument();
    expectDrawerOpen();

    expectOpenedCalls(0);
    expect(closeButton).toHaveFocus();
  },
  args: {
    rootProps: {
      defaultOpen: true,
      onOpenChange: fn(),
    },
    drawerProps: {
      modal: "trap-focus",
      closeOnOutsideClick: false,
    },
    backdrop: false,
  },
};

export const FocusLock: Story = {
  render: BaseDialogComponent,
  beforeEach: withoutAnimations,
  play: async ({ canvasElement, args }) => {
    const { canvas, expectDrawerOpen, expectOpenedCalls } = testUtils(
      canvasElement,
      args,
    );

    expectOpenedCalls(0);
    expectDrawerOpen();

    const closeButton = canvas.getByText("Close");
    const testButton = canvas.getByText("Focus test");
    expect(closeButton).toHaveFocus();

    await userEvent.tab();
    expect(testButton).toHaveFocus();

    await userEvent.tab();
    expect(closeButton).toHaveFocus();

    await userEvent.tab({ shift: true });
    expect(testButton).toHaveFocus();
  },
  args: {
    rootProps: {
      defaultOpen: true,
      onOpenChange: fn(),
    },
    drawerProps: {
      children: <button data-testid="next-button">Focus test</button>,
    },
  },
};

export const FocusTriggerOnClose: Story = {
  render: BaseDialogComponent,
  beforeEach: withoutAnimations,
  play: async ({ canvasElement, args }) => {
    const {
      canvas,
      expectDrawerOpen,
      expectDrawerClosed,
      expectOpenedCalls,
      clickCloseButton,
    } = testUtils(canvasElement, args);

    expectOpenedCalls(0);
    const openButton = canvas.getByText("Open Dialog");
    await userEvent.click(openButton);
    expectDrawerOpen();

    const closeButton = canvas.getByText("Close");
    expect(closeButton).toHaveFocus();

    await clickCloseButton();
    expectDrawerClosed();
    expect(args.rootProps?.onOpenChange).toHaveBeenCalledTimes(2);

    expect(openButton).toHaveFocus();
  },
  args: {
    rootProps: {
      onOpenChange: fn(),
    },
  },
};

/**
 * By default, when trigger is not the one causing Drawer to open, the autofocus will go to body
 * We override this in `onUnmountAutoFocus` callback
 */
export const FocusTriggerOnCloseWhenDefaultOpen: Story = {
  render: BaseDialogComponent,
  beforeEach: withoutAnimations,
  play: async ({ canvasElement, args }) => {
    const {
      canvas,
      expectDrawerOpen,
      expectDrawerClosed,
      expectOpenedCalls,
      clickCloseButton,
    } = testUtils(canvasElement, args);

    expectOpenedCalls(0);
    expectDrawerOpen();

    const closeButton = canvas.getByText("Close");
    expect(closeButton).toHaveFocus();

    await clickCloseButton();
    expectDrawerClosed();
    expect(args.rootProps?.onOpenChange).toHaveBeenCalledTimes(1);

    const openButton = canvas.getByText("Open Dialog");
    expect(openButton).toHaveFocus();
  },
  args: {
    rootProps: {
      onOpenChange: fn(),
      defaultOpen: true,
    },
  },
};

export const FocusWithNoTrigger: Story = {
  render: BaseDialogComponent,
  beforeEach: withoutAnimations,
  play: async ({ canvasElement, args }) => {
    const {
      canvas,
      expectDrawerOpen,
      expectDrawerClosed,
      expectOpenedCalls,
      clickCloseButton,
    } = testUtils(canvasElement, args);

    expectOpenedCalls(0);
    expectDrawerOpen();

    const closeButton = canvas.getByText("Close");
    expect(closeButton).toHaveFocus();

    await clickCloseButton();
    expectDrawerClosed();
    expect(args.rootProps?.onOpenChange).toHaveBeenCalledTimes(1);

    expect(document.body).toHaveFocus();
  },
  args: {
    rootProps: {
      onOpenChange: fn(),
      defaultOpen: true,
    },
    triggerButtonProps: {
      style: { display: "none" },
    },
  },
};

/**
 * Dialog should focus previously focused element when closed if there is no trigger
 */
export const FocusPreviousFocusedItemIfNoTrigger: Story = {
  render: (props) => {
    const [open, setOpen] = React.useState(false);
    return (
      <div>
        <button data-testid="custom-trigger" onClick={() => setOpen((x) => !x)}>
          Toggle open
        </button>
        <BaseDialogComponent
          {...props}
          rootProps={{ open, onOpenChange: (newOpen) => setOpen(newOpen) }}
        />
      </div>
    );
  },
  beforeEach: withoutAnimations,
  play: async ({ canvasElement, args }) => {
    const { canvas, expectDrawerOpen, expectDrawerClosed, clickCloseButton } =
      testUtils(canvasElement, args);

    const customTrigger = canvas.getByText("Toggle open");
    await userEvent.click(customTrigger);
    expect(canvas.getByTestId("drawer")).toBeInTheDocument();
    expectDrawerOpen();

    await clickCloseButton();

    expectDrawerClosed();

    expect(customTrigger).toHaveFocus();
  },
  args: {
    triggerButtonProps: {
      style: { display: "none" },
    },
  },
};

/**
 * Dialog should focus previously focused element when closed if there is no trigger
 */
export const FocusClickedItemOutsideWhenClosing: Story = {
  render: (props) => {
    const [open, setOpen] = React.useState(false);
    return (
      <div>
        <button data-testid="custom-trigger" onClick={() => setOpen((x) => !x)}>
          Toggle open
        </button>
        <button data-testid="placeholder-button">Click me</button>
        <BaseDialogComponent
          {...props}
          rootProps={{ open, onOpenChange: (newOpen) => setOpen(newOpen) }}
        />
      </div>
    );
  },
  beforeEach: withoutAnimations,
  play: async ({ canvasElement, args }) => {
    const { canvas, expectDrawerOpen, expectDrawerClosed } = testUtils(
      canvasElement,
      args,
    );

    const customTrigger = canvas.getByText("Toggle open");
    await userEvent.click(customTrigger);
    expectDrawerOpen();

    const placeholderButton = canvas.getByText("Click me");
    await userEvent.click(placeholderButton);

    expectDrawerClosed();
    expect(placeholderButton).toHaveFocus();
  },
  args: {
    triggerButtonProps: {
      style: { display: "none" },
    },
    drawerProps: {
      modal: "trap-focus",
    },
    backdrop: false,
  },
};

export const FocusAutoOnOpen: Story = {
  render: BaseDialogComponent,
  beforeEach: withoutAnimations,
  play: async ({ canvasElement, args }) => {
    const { canvas, expectDrawerOpen } = testUtils(canvasElement, args);

    const triggerButton = canvas.getByText("Open Dialog");

    await userEvent.click(triggerButton);
    expectDrawerOpen();

    expect(canvas.getByText("Autofocus")).toHaveFocus();
  },
  args: {
    drawerProps: {
      children: <button data-testid="autofocus-anchor">Autofocus</button>,
      onOpenAutoFocus: () => {
        return document.querySelector(
          '[data-testid="autofocus-anchor"]',
        ) as HTMLElement;
      },
    },
  },
};

export const FocusAutoOnClose: Story = {
  render: (props) => {
    return (
      <div>
        <button data-testid="autofocus-anchor">Autofocus</button>
        <BaseDialogComponent {...props} />
      </div>
    );
  },
  beforeEach: withoutAnimations,
  play: async ({ canvasElement, args }) => {
    const { canvas, expectDrawerOpen, expectDrawerClosed } = testUtils(
      canvasElement,
      args,
    );

    expectDrawerOpen();
    await userEvent.keyboard("{Escape}");
    expectDrawerClosed();
    expect(canvas.getByText("Autofocus")).toHaveFocus();
  },
  args: {
    rootProps: { defaultOpen: true },
    drawerProps: {
      children: <button data-testid="autofocus-anchor">Autofocus</button>,
      onCloseAutoFocus: () => {
        return document.querySelector(
          '[data-testid="autofocus-anchor"]',
        ) as HTMLElement;
      },
    },
  },
};

/* --------------------------------- Backdrop -------------------------------- */
/* Only root-level backdrop should render */
export const BackdropRenderOnlyRoot: Story = {
  render: BaseDialogComponent,
  play: async ({ canvasElement, args }) => {
    const { canvas } = testUtils(canvasElement, args);

    const triggerButton = canvas.getByText("Open Dialog Nested");
    await userEvent.click(triggerButton);

    expect(canvas.getByTestId("drawer-nested")).toBeInTheDocument();
    expect(canvas.queryByTestId("backdrop-nested")).not.toBeInTheDocument();
  },
  args: {
    rootProps: {
      defaultOpen: true,
    },
    nested: true,
  },
};

/* --------------------------------- Trigger -------------------------------- */
export const TriggerOpenOnClick: Story = {
  render: BaseDialogComponent,
  play: async ({ canvasElement, args }) => {
    const { canvas, expectDrawerOpen, expectOpenedCalls } = testUtils(
      canvasElement,
      args,
    );

    expectOpenedCalls(0);
    const triggerButton = canvas.getByText("Open Dialog");

    await userEvent.click(triggerButton);
    // Dialog should remain open
    expectDrawerOpen();
    expectOpenedCalls(1);
  },
  args: {
    rootProps: {
      onOpenChange: fn(),
    },
  },
};

export const TriggerDisabled: Story = {
  render: BaseDialogComponent,
  play: async ({ canvasElement, args }) => {
    const { canvas, expectDrawerClosed, expectOpenedCalls } = testUtils(
      canvasElement,
      args,
    );

    expectOpenedCalls(0);

    const triggerButton = canvas.getByText("Open Dialog");
    await userEvent.click(triggerButton);
    expectDrawerClosed();

    expectOpenedCalls(0);
  },
  args: {
    triggerButtonProps: { disabled: true },
    rootProps: {
      onOpenChange: fn(),
    },
  },
};

export const TriggerDisabledSlot: Story = {
  render: BaseDialogComponent,
  play: async ({ canvasElement, args }) => {
    const { canvas, expectDrawerClosed, expectOpenedCalls } = testUtils(
      canvasElement,
      args,
    );

    expectOpenedCalls(0);
    const triggerButton = canvas.getByText("Open Dialog");
    await userEvent.click(triggerButton);

    expectDrawerClosed();
    expectOpenedCalls(0);
  },
  args: {
    triggerButtonProps: {
      disabled: true,
      asChild: true,
      children: (
        <Button disabled id="slot">
          Open Dialog
        </Button>
      ),
    },
    rootProps: {
      onOpenChange: fn(),
    },
  },
};

/* ---------------------------- CloseButton tests --------------------------- */
export const CloseButton: Story = {
  render: BaseDialogComponent,
  play: async ({ canvasElement, args }) => {
    const { expectOpenedCalls, clickCloseButton } = testUtils(
      canvasElement,
      args,
    );

    expectOpenedCalls(0);

    await clickCloseButton();
    expectOpenedCalls(1);
  },
  args: {
    rootProps: {
      defaultOpen: true,
      onOpenChange: fn(),
    },
  },
};

export const CloseButtonDisabled: Story = {
  render: BaseDialogComponent,
  play: async ({ canvasElement, args }) => {
    const { clickCloseButton, expectOpenedCalls } = testUtils(
      canvasElement,
      args,
    );

    expectOpenedCalls(0);

    await clickCloseButton();
    expectOpenedCalls(0);
  },
  args: {
    rootProps: {
      defaultOpen: true,
      onOpenChange: fn(),
    },
    closeButtonProps: { disabled: true },
  },
};

export const CloseButtonDisabledSlot: Story = {
  render: BaseDialogComponent,
  play: async ({ canvasElement, args }) => {
    const { expectOpenedCalls, clickCloseButton } = testUtils(
      canvasElement,
      args,
    );

    expectOpenedCalls(0);
    await clickCloseButton();
    expectOpenedCalls(0);
  },
  args: {
    rootProps: {
      defaultOpen: true,
      onOpenChange: fn(),
    },
    closeButtonProps: {
      asChild: true,
      children: (
        <Button disabled id="slot">
          Close
        </Button>
      ),
    },
  },
};

/* ------------------------------- Test setup ------------------------------- */
type BaseDialogProps = {
  rootProps?: Omit<DialogProps, "children"> & { children?: React.ReactNode };
  drawerProps?: Omit<DialogDrawerProps, "children"> & {
    children?: React.ReactNode;
  };
  closeButtonProps?: Omit<DialogCloseProps, "children"> & {
    /* Has to override AsChild type */
    children?: any;
  };
  triggerButtonProps?: Omit<DialogTriggerProps, "children"> & {
    /* Has to override AsChild type */
    children?: any;
  };
  nested?: boolean;
  backdrop?: boolean;
};

function BaseDialogComponent({
  closeButtonProps,
  triggerButtonProps,
  rootProps,
  drawerProps,
  nested,
  backdrop = true,
}: BaseDialogProps) {
  return (
    <Dialog {...rootProps}>
      <DialogTrigger data-testid="trigger" {...triggerButtonProps}>
        {triggerButtonProps?.children ?? "Open Dialog"}
      </DialogTrigger>
      <DialogPortal data-testid="portal">
        {backdrop && (
          <DialogBackdrop className="backdropCSS" data-testid="backdrop" />
        )}
        <DialogDrawer
          className="drawerCSS"
          data-testid="drawer"
          {...drawerProps}
        >
          {nested ? (
            <Dialog>
              <DialogTrigger data-testid="trigger-nested">
                Open Dialog Nested
              </DialogTrigger>
              <DialogPortal data-testid="portal-nested">
                <DialogBackdrop
                  className="backdropCSS"
                  data-testid="backdrop-nested"
                />
                <DialogDrawer className="drawerCSS" data-testid="drawer-nested">
                  Drawer content Nested
                  <DialogClose data-testid="close-nested">
                    Close Nested
                  </DialogClose>
                </DialogDrawer>
              </DialogPortal>
            </Dialog>
          ) : (
            "Drawer content"
          )}
          <DialogClose data-testid="close" {...closeButtonProps}>
            {closeButtonProps?.children ?? "Close"}
          </DialogClose>
          {drawerProps?.children}
        </DialogDrawer>
      </DialogPortal>
    </Dialog>
  );
}

function PortalContainer({ children }: { children: React.ReactNode }) {
  const [container, setContainer] = React.useState<HTMLElement | null>(null);

  return (
    <Provider rootElement={container ?? undefined}>
      {children}
      <div id="portal-container" ref={setContainer} />
    </Provider>
  );
}

function withoutAnimations() {
  globalThis.AKSEL_ANIMATIONS_DISABLED = true;
  return () => {
    globalThis.AKSEL_ANIMATIONS_DISABLED = false;
  };
}

const BackDropStyle = (
  <style>
    {`
  .backdropCSS {
    position: fixed;
    inset: 0;
    background-color: red;
    opacity: 0.2;
    transition: opacity 300ms cubic-bezier(0.45, 1.005, 0, 1.005);


    &[data-entering-style], &[data-exiting-style] {
      opacity: 0;
    }
    }
  `}
  </style>
);

const DrawerStyle = (
  <style>
    {`
  .drawerCSS {
    box-sizing: border-box;
    position: fixed;
    top: 0;
    bottom: 0;
    right:0;
    width: 24rem;
    max-width: 100vw;
    padding: 1.5rem;
    border-radius: 0.5rem;
    background-color: var(--ax-bg-neutral-soft);
    transition: all 300ms;
    padding: 4rem;

    &[data-entering-style], &[data-exiting-style] {
      transform: translateX(100%);
    }
  }
  `}
  </style>
);
