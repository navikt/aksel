import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import {
  expect,
  fireEvent,
  fn,
  userEvent,
  waitFor,
  within,
} from "storybook/test";
import { Button } from "../button";
import { Provider } from "../provider";
import {
  Dialog,
  DialogClose,
  type DialogCloseProps,
  DialogDescription,
  DialogPopup,
  type DialogPopupProps,
  type DialogProps,
  DialogTitle,
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
    expectPopupOpen: () =>
      expect(canvas.getByTestId("popup")).toBeInTheDocument(),
    expectPopupClosed: () =>
      expect(canvas.queryByTestId("popup")).not.toBeInTheDocument(),
    expectOpenChangeCalls: (n: number) => {
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
    const popup = canvas.getByTestId("popup");

    await clickCloseButton();
    // Dialog should remain open
    expect(popup).toBeInTheDocument();
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
    const { expectPopupOpen } = testUtils(canvasElement, args);

    await userEvent.keyboard("{Escape}");
    // Dialog should remain open
    expectPopupOpen();
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
    const { expectPopupOpen, expectPopupClosed } = testUtils(
      canvasElement,
      args,
    );
    expectPopupOpen();
    await userEvent.keyboard("{Escape}");
    expectPopupClosed();
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
    const { canvas, expectPopupOpen, expectPopupClosed } = testUtils(
      canvasElement,
      args,
    );

    const triggerButton = canvas.getByText("Open Dialog Nested");
    await userEvent.click(triggerButton);

    expect(canvas.getByTestId("popup-nested")).toBeInTheDocument();
    await userEvent.keyboard("{Escape}");
    expect(canvas.queryByTestId("popup-nested")).not.toBeInTheDocument();
    expectPopupOpen();
    await userEvent.keyboard("{Escape}");
    expectPopupClosed();
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
    const { expectPopupOpen, expectPopupClosed, expectOpenChangeCalls } =
      testUtils(canvasElement, args);

    expectOpenChangeCalls(0);
    expectPopupOpen();

    await userEvent.click(document.documentElement);

    expectPopupClosed();
    expectOpenChangeCalls(1);
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
    const { expectPopupOpen, expectOpenChangeCalls } = testUtils(
      canvasElement,
      args,
    );

    expectOpenChangeCalls(0);
    expectPopupOpen();

    await userEvent.click(document.documentElement);

    expectPopupOpen();
    expectOpenChangeCalls(0);
  },
  args: {
    rootProps: {
      defaultOpen: true,
      onOpenChange: fn(),
    },
    popupProps: {
      closeOnOutsideClick: false,
    },
  },
};

/* Close should only happen on onClick */
export const OutsideClickIntentionalClose: Story = {
  render: BaseDialogComponent,
  beforeEach: withoutAnimations,
  play: async ({ canvasElement, args }) => {
    const { expectPopupOpen, expectPopupClosed, expectOpenChangeCalls } =
      testUtils(canvasElement, args);

    expectOpenChangeCalls(0);
    expectPopupOpen();

    await fireEvent.pointerDown(document.documentElement);
    expectPopupOpen();
    expectOpenChangeCalls(0);

    await userEvent.click(document.documentElement);

    expectPopupClosed();
    expectOpenChangeCalls(1);
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
    const { canvas, expectPopupOpen, expectOpenChangeCalls } = testUtils(
      canvasElement,
      args,
    );

    expectOpenChangeCalls(0);
    expectPopupOpen();

    const popup = canvas.getByTestId("popup");
    await waitFor(() => expect(popup).toHaveFocus());

    await fireEvent.click(document.body);
    expectPopupOpen();
    expectOpenChangeCalls(0);

    const counterButton = canvas.getByTestId("counter");
    await userEvent.click(counterButton);
    expectPopupOpen();
    expectOpenChangeCalls(0);
    await waitFor(() => expect(popup).toHaveFocus());
    expect(counterButton).toHaveTextContent("Counter 1");
  },
  args: {
    rootProps: {
      defaultOpen: true,
      onOpenChange: fn(),
    },
    popupProps: {
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
    const { canvas, expectPopupOpen, expectOpenChangeCalls } = testUtils(
      canvasElement,
      args,
    );

    expectOpenChangeCalls(0);
    expectPopupOpen();

    const popup = canvas.getByTestId("popup");
    await waitFor(() => expect(popup).toHaveFocus());

    await fireEvent.focus(document.body);
    expectPopupOpen();
    expectOpenChangeCalls(0);

    await fireEvent.blur(popup);
    expectPopupOpen();

    expectOpenChangeCalls(0);
    await waitFor(() => expect(popup).toHaveFocus());
  },
  args: {
    rootProps: {
      defaultOpen: true,
      onOpenChange: fn(),
    },
    popupProps: {
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
    const { canvas, expectPopupOpen, expectOpenChangeCalls } = testUtils(
      canvasElement,
      args,
    );

    expectOpenChangeCalls(0);
    expectPopupOpen();

    const popup = canvas.getByTestId("popup");
    const closeButton = canvas.getByText("Close");
    const testButton = canvas.getByText("Focus test");
    await waitFor(() => expect(popup).toHaveFocus());

    await userEvent.tab();
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
    popupProps: {
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
      expectPopupOpen,
      expectPopupClosed,
      expectOpenChangeCalls,
      clickCloseButton,
    } = testUtils(canvasElement, args);

    expectOpenChangeCalls(0);
    const openButton = canvas.getByText("Open Dialog");
    await userEvent.click(openButton);
    expectPopupOpen();

    await clickCloseButton();
    expectPopupClosed();
    expect(args.rootProps?.onOpenChange).toHaveBeenCalledTimes(2);

    expect(openButton).toHaveFocus();
  },
  args: {
    rootProps: {
      onOpenChange: fn(),
    },
  },
};

export const FocusWithNoTrigger: Story = {
  render: BaseDialogComponent,
  beforeEach: withoutAnimations,
  play: async ({ canvasElement, args }) => {
    const {
      expectPopupOpen,
      expectPopupClosed,
      expectOpenChangeCalls,
      clickCloseButton,
    } = testUtils(canvasElement, args);

    expectOpenChangeCalls(0);
    expectPopupOpen();

    await clickCloseButton();
    expectPopupClosed();
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
 * Dialog should focus previously focused element when closed if built-in trigger is not used
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
    const { canvas, expectPopupOpen, expectPopupClosed, clickCloseButton } =
      testUtils(canvasElement, args);

    const customTrigger = canvas.getByText("Toggle open");
    await userEvent.click(customTrigger);
    expectPopupOpen();

    await clickCloseButton();

    expectPopupClosed();

    expect(customTrigger).toHaveFocus();
  },
  args: {
    triggerButtonProps: {
      style: { display: "none" },
    },
  },
};

/**
 * Dialog should focus previously focused element when closed if built-in trigger is not used
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
    const { canvas, expectPopupOpen, expectPopupClosed } = testUtils(
      canvasElement,
      args,
    );

    const customTrigger = canvas.getByText("Toggle open");
    await userEvent.click(customTrigger);
    expectPopupOpen();

    const placeholderButton = canvas.getByText("Click me");
    await userEvent.click(placeholderButton);

    expectPopupClosed();
    expect(placeholderButton).toHaveFocus();
  },
  args: {
    triggerButtonProps: {
      style: { display: "none" },
    },
    popupProps: {
      modal: "trap-focus",
    },
    backdrop: false,
  },
};

export const FocusAutoOnOpen: Story = {
  render: BaseDialogComponent,
  beforeEach: withoutAnimations,
  play: async ({ canvasElement, args }) => {
    const { canvas, expectPopupOpen } = testUtils(canvasElement, args);

    const triggerButton = canvas.getByText("Open Dialog");

    await userEvent.click(triggerButton);
    expectPopupOpen();

    await waitFor(() => expect(canvas.getByText("Autofocus")).toHaveFocus());
  },
  args: {
    popupProps: {
      children: <button data-testid="autofocus-anchor">Autofocus</button>,
      initialFocus: () => {
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
    const { canvas, expectPopupOpen, expectPopupClosed } = testUtils(
      canvasElement,
      args,
    );

    expectPopupOpen();
    await userEvent.keyboard("{Escape}");
    expectPopupClosed();
    expect(canvas.getByText("Autofocus")).toHaveFocus();
  },
  args: {
    rootProps: { defaultOpen: true },
    popupProps: {
      children: <button data-testid="autofocus-anchor">Autofocus</button>,
      returnFocus: () => {
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

    expect(canvas.getByTestId("popup-nested")).toBeInTheDocument();
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
    const { canvas, expectPopupOpen, expectOpenChangeCalls } = testUtils(
      canvasElement,
      args,
    );

    expectOpenChangeCalls(0);
    const triggerButton = canvas.getByText("Open Dialog");

    await userEvent.click(triggerButton);
    expectPopupOpen();
    expectOpenChangeCalls(1);
  },
  args: {
    rootProps: {
      onOpenChange: fn(),
    },
  },
};

/* ---------------------------- CloseButton tests --------------------------- */
export const CloseButton: Story = {
  render: BaseDialogComponent,
  play: async ({ canvasElement, args }) => {
    const { expectOpenChangeCalls, clickCloseButton } = testUtils(
      canvasElement,
      args,
    );

    expectOpenChangeCalls(0);

    await clickCloseButton();
    expectOpenChangeCalls(1);
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
    const { clickCloseButton, expectOpenChangeCalls } = testUtils(
      canvasElement,
      args,
    );

    expectOpenChangeCalls(0);

    await clickCloseButton();
    expectOpenChangeCalls(0);
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
    const { expectOpenChangeCalls, clickCloseButton } = testUtils(
      canvasElement,
      args,
    );

    expectOpenChangeCalls(0);
    await clickCloseButton();
    expectOpenChangeCalls(0);
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

export const AriaAttributes: Story = {
  render: BaseDialogComponent,
  play: async ({ canvasElement, args }) => {
    const { canvas, expectPopupOpen } = testUtils(canvasElement, args);

    const triggerButton = canvas.getByText("Open Dialog");

    expect(triggerButton).toHaveAttribute("aria-expanded", "false");
    await userEvent.click(triggerButton);
    expectPopupOpen();

    const popupElement = canvas.getByTestId("popup");

    expect(triggerButton).toHaveAttribute("aria-expanded", "true");
    expect(triggerButton).toHaveAttribute("aria-controls", "custom-popup-id");

    expect(popupElement).toHaveAttribute("id", "custom-popup-id");
    expect(popupElement).toHaveAttribute("role", "dialog");
    expect(popupElement).toHaveAttribute("tabindex", "-1");
    expect(popupElement).toHaveAttribute("aria-labelledby", "popup-title");
  },
  args: {
    popupProps: {
      id: "custom-popup-id",
    },
  },
};

/* ------------------------------- Test setup ------------------------------- */
type BaseDialogProps = {
  rootProps?: Omit<DialogProps, "children"> & { children?: React.ReactNode };
  popupProps?: Omit<DialogPopupProps, "children" | "asChild"> & {
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
  popupProps,
  nested,
  backdrop = true,
}: BaseDialogProps) {
  return (
    <Dialog {...rootProps}>
      <DialogTrigger data-testid="trigger" {...triggerButtonProps}>
        {triggerButtonProps?.children ?? "Open Dialog"}
      </DialogTrigger>

      <DialogPopup
        className="popupCSS"
        data-testid="popup"
        {...popupProps}
        withBackdrop={backdrop}
      >
        {nested ? (
          <Dialog>
            <DialogTrigger data-testid="trigger-nested">
              Open Dialog Nested
            </DialogTrigger>

            <DialogPopup className="popupCSS" data-testid="popup-nested">
              Popup content Nested
              <DialogClose data-testid="close-nested">Close Nested</DialogClose>
            </DialogPopup>
          </Dialog>
        ) : (
          "Popup content"
        )}
        <DialogTitle id="popup-title">Dialog title</DialogTitle>
        <DialogDescription id="popup-description">
          Dialog Description
        </DialogDescription>
        <DialogClose data-testid="close" {...closeButtonProps}>
          {closeButtonProps?.children ?? "Close"}
        </DialogClose>
        {popupProps?.children}
      </DialogPopup>
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
