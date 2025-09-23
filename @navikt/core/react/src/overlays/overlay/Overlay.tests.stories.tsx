import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within } from "@storybook/test";
import React from "react";
import { Button } from "../../button";
import { Provider } from "../../provider";
import {
  Overlay,
  OverlayBackdrop,
  OverlayClose,
  type OverlayCloseProps,
  OverlayDrawer,
  OverlayPortal,
  type OverlayProps,
  OverlayTrigger,
  type OverlayTriggerProps,
} from "./index";

const meta: Meta<typeof Overlay> = {
  title: "ds-react/Overlay/Tests",
  component: Overlay,
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
type Story = StoryObj<BaseOverlayProps>;

/* ----------------------------- State handling ----------------------------- */
export const CancelClose: Story = {
  render: BaseOverlayComponent,
  beforeEach: withoutAnimations,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const drawer = canvas.getByTestId("drawer");
    const closeButton = canvas.getByText("Close");

    await userEvent.click(closeButton);
    // Overlay should remain open
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
  render: BaseOverlayComponent,
  beforeEach: withoutAnimations,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const drawer = canvas.getByTestId("drawer");

    await userEvent.keyboard("{Escape}");
    // Overlay should remain open
    expect(drawer).toBeInTheDocument();
  },
  args: {
    rootProps: {
      defaultOpen: true,
      onOpenChange: (_, event) => event?.preventDefault(),
    },
  },
};

export const EscapeClose: Story = {
  render: BaseOverlayComponent,
  beforeEach: withoutAnimations,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(canvas.getByTestId("drawer")).toBeInTheDocument();
    await userEvent.keyboard("{Escape}");

    expect(canvas.queryByTestId("drawer")).not.toBeInTheDocument();
  },
  args: {
    rootProps: {
      defaultOpen: true,
    },
  },
};

export const NestedEscapeClose: Story = {
  render: BaseOverlayComponent,
  beforeEach: withoutAnimations,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const triggerButton = canvas.getByText("Open Overlay Nested");
    await userEvent.click(triggerButton);

    expect(canvas.getByTestId("drawer-nested")).toBeInTheDocument();
    await userEvent.keyboard("{Escape}");
    expect(canvas.queryByTestId("drawer-nested")).not.toBeInTheDocument();
    expect(canvas.getByTestId("drawer")).toBeInTheDocument();
    await userEvent.keyboard("{Escape}");
    expect(canvas.queryByTestId("drawer")).not.toBeInTheDocument();
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
  render: BaseOverlayComponent,
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    expect(args.rootProps?.onOpenChange).not.toHaveBeenCalled();
    const triggerButton = canvas.getByText("Open Overlay");

    await userEvent.click(triggerButton);
    // Overlay should remain open
    expect(canvas.getByTestId("drawer")).toBeInTheDocument();
    expect(args.rootProps?.onOpenChange).toHaveBeenCalledOnce();
  },
  args: {
    rootProps: {
      onOpenChange: fn(),
    },
  },
};

export const TriggerDisabled: Story = {
  render: BaseOverlayComponent,
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    expect(args.rootProps?.onOpenChange).not.toHaveBeenCalled();

    const triggerButton = canvas.getByText("Open Overlay");
    await userEvent.click(triggerButton);
    expect(canvas.queryByTestId("drawer")).not.toBeInTheDocument();

    expect(args.rootProps?.onOpenChange).not.toHaveBeenCalled();
  },
  args: {
    triggerButtonProps: { disabled: true },
    rootProps: {
      onOpenChange: fn(),
    },
  },
};

export const TriggerDisabledSlot: Story = {
  render: BaseOverlayComponent,
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    expect(args.rootProps?.onOpenChange).not.toHaveBeenCalled();
    const triggerButton = canvas.getByText("Open Overlay");
    await userEvent.click(triggerButton);

    expect(canvas.queryByTestId("drawer")).not.toBeInTheDocument();
    expect(args.rootProps?.onOpenChange).not.toHaveBeenCalled();
  },
  args: {
    triggerButtonProps: {
      disabled: true,
      asChild: true,
      children: (
        <Button disabled id="slot">
          Open Overlay
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
  render: BaseOverlayComponent,
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    expect(args.rootProps?.onOpenChange).not.toHaveBeenCalled();
    const closeButton = canvas.getByText("Close");

    await userEvent.click(closeButton);
    expect(args.rootProps?.onOpenChange).toHaveBeenCalledOnce();
  },
  args: {
    rootProps: {
      defaultOpen: true,
      onOpenChange: fn(),
    },
  },
};

export const CloseButtonDisabled: Story = {
  render: BaseOverlayComponent,
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    expect(args.rootProps?.onOpenChange).not.toHaveBeenCalled();
    const closeButton = canvas.getByText("Close");

    await userEvent.click(closeButton);
    expect(args.rootProps?.onOpenChange).not.toHaveBeenCalled();
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
  render: BaseOverlayComponent,
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    expect(args.rootProps?.onOpenChange).not.toHaveBeenCalled();
    const closeButton = canvas.getByText("Close");

    await userEvent.click(closeButton);
    expect(args.rootProps?.onOpenChange).not.toHaveBeenCalled();
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
type BaseOverlayProps = {
  rootProps?: Omit<OverlayProps, "children"> & { children?: React.ReactNode };
  closeButtonProps?: Omit<OverlayCloseProps, "children"> & {
    /* Has to override AsChild type */
    children?: any;
  };
  triggerButtonProps?: Omit<OverlayTriggerProps, "children"> & {
    /* Has to override AsChild type */
    children?: any;
  };
  nested?: boolean;
};

function BaseOverlayComponent({
  closeButtonProps,
  triggerButtonProps,
  rootProps,
  nested,
}: BaseOverlayProps) {
  return (
    <Overlay {...rootProps}>
      <OverlayTrigger data-testid="trigger" {...triggerButtonProps}>
        {triggerButtonProps?.children ?? "Open Overlay"}
      </OverlayTrigger>
      <OverlayPortal data-testid="portal">
        <OverlayBackdrop className="backdropCSS" data-testid="backdrop" />
        <OverlayDrawer className="drawerCSS" data-testid="drawer">
          {nested ? (
            <Overlay>
              <OverlayTrigger data-testid="trigger-nested">
                Open Overlay Nested
              </OverlayTrigger>
              <OverlayPortal data-testid="portal-nested">
                <OverlayBackdrop
                  className="backdropCSS"
                  data-testid="backdrop-nested"
                />
                <OverlayDrawer
                  className="drawerCSS"
                  data-testid="drawer-nested"
                >
                  Drawer content Nested
                  <OverlayClose data-testid="close-nested">
                    Close Nested
                  </OverlayClose>
                </OverlayDrawer>
              </OverlayPortal>
            </Overlay>
          ) : (
            "Drawer content"
          )}
          <OverlayClose data-testid="close" {...closeButtonProps}>
            {closeButtonProps?.children ?? "Close"}
          </OverlayClose>
        </OverlayDrawer>
      </OverlayPortal>
    </Overlay>
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


    &[data-starting-style],
    &[data-ending-style] {
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

    &[data-starting-style], &[data-ending-style] {
      transform: translateX(100%);
    }
  }
  `}
  </style>
);
