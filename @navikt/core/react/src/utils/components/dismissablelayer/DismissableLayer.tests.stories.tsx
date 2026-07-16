import type { StoryObj } from "@storybook/react-vite";
import React from "react";
import {
  expect,
  fireEvent,
  fn,
  userEvent,
  waitFor,
  within,
} from "storybook/test";
import {
  DismissableLayer,
  type DismissableLayerProps,
} from "./DismissableLayer";

export default {
  title: "Utilities/DismissableLayer/Tests",
  parameters: {
    chromatic: { disable: true },
  },
};

type Story = StoryObj<DismissableLayerProps>;

export const EscapeKeyDown: Story = {
  render: (props) => {
    return (
      <DismissableLayer asChild {...props}>
        <input type="text" />
      </DismissableLayer>
    );
  },
  play: async ({ args }) => {
    await userEvent.keyboard("{Escape}");
    waitFor(() => {
      expect(args.onEscapeKeyDown).toHaveBeenCalledOnce();
      expect(args.onDismiss).toHaveBeenCalledOnce();
    });
  },
  args: {
    onDismiss: fn(),
    onEscapeKeyDown: fn(),
  },
};

export const FocusOutside: Story = {
  render: (props) => {
    return (
      <div>
        <DismissableLayer asChild {...props}>
          <input type="text" />
        </DismissableLayer>
        <input type="text" data-testid="outside" />
      </div>
    );
  },
  play: async ({ args }) => {
    const canvas = within(document.body);
    const outsideInput = canvas.getByTestId("outside");
    outsideInput.focus();

    expect(args.onFocusOutside).toHaveBeenCalledOnce();
    expect(args.onDismiss).toHaveBeenCalledOnce();
  },
  args: {
    onDismiss: fn(),
    onFocusOutside: fn(),
  },
};

export const PointerDownOutside: Story = {
  render: (props) => {
    return (
      <div>
        <DismissableLayer asChild {...props}>
          <input type="text" />
        </DismissableLayer>
        <div data-testid="outside" style={{ padding: "1rem" }} />
      </div>
    );
  },
  play: async ({ args }) => {
    const canvas = within(document.body);
    const outsideElement = canvas.getByTestId("outside");
    await userEvent.click(outsideElement);

    expect(args.onPointerDownOutside).toHaveBeenCalledOnce();
    expect(args.onDismiss).toHaveBeenCalledOnce();
  },
  args: {
    onDismiss: fn(),
    onPointerDownOutside: fn(),
  },
};

/**
 * Tabindex on parent element causes focusin-event to be triggered on the parent when clicking inside the child, which again causes `onFocusOutside` to be called.
 * This test ensures that clicking inside the element does not trigger `onFocusOutside` or `onDismiss`, even with a tabindex on the parent.
 */
export const PointerDownInside: Story = {
  render: (props) => {
    return (
      <div tabIndex={-1}>
        <DismissableLayer asChild {...props} onDismiss={console.log}>
          <div
            data-testid="inside-element"
            style={{ background: "red", padding: "2rem" }}
          />
        </DismissableLayer>
      </div>
    );
  },
  play: async ({ args }) => {
    const canvas = within(document.body);
    const insideElement = canvas.getByTestId("inside-element");
    await userEvent.click(insideElement);

    expect(args.onFocusOutside).not.toHaveBeenCalled();
    expect(args.onDismiss).not.toHaveBeenCalled();
  },
  args: {
    onDismiss: fn(),
    onFocusOutside: fn(),
  },
};

export const InteractOutside: Story = {
  render: (props) => {
    return (
      <div>
        <DismissableLayer asChild {...props}>
          <input type="text" />
        </DismissableLayer>
        <div data-testid="outside" style={{ padding: "1rem" }} />
        <div
          data-testid="outside-focusable"
          style={{ padding: "1rem" }}
          // biome-ignore lint/a11y/noNoninteractiveTabindex: testing only
          tabIndex={0}
        />
      </div>
    );
  },
  play: async ({ args }) => {
    const canvas = within(document.body);
    const outsideElement = canvas.getByTestId("outside");
    const outsideFocus = canvas.getByTestId("outside-focusable");

    expect(args.onDismiss).not.toHaveBeenCalled();
    expect(args.onInteractOutside).not.toHaveBeenCalled();

    await userEvent.keyboard("{Escape}");

    waitFor(() => {
      expect(args.onDismiss).toHaveBeenCalledTimes(1);
      expect(args.onInteractOutside).not.toHaveBeenCalled();
    });

    outsideFocus.focus();

    expect(args.onInteractOutside).toHaveBeenCalledTimes(1);
    expect(args.onDismiss).toHaveBeenCalledTimes(2);

    await userEvent.click(outsideElement);

    expect(args.onInteractOutside).toHaveBeenCalledTimes(2);
    expect(args.onDismiss).toHaveBeenCalledTimes(3);
  },
  args: {
    onDismiss: fn(),
    onInteractOutside: fn(),
  },
};

export const DisableOutsidePointerEvents: Story = {
  render: (props) => {
    return (
      <div>
        <DismissableLayer asChild {...props}>
          <input type="text" />
        </DismissableLayer>
        <div
          data-testid="outside-focusable"
          style={{ padding: "1rem" }}
          // biome-ignore lint/a11y/noNoninteractiveTabindex: testing only
          tabIndex={0}
        />
      </div>
    );
  },
  play: async () => {
    const canvas = within(document.body);
    const outsideFocus = canvas.getByTestId("outside-focusable");

    fireEvent.click(outsideFocus);

    expect(outsideFocus).not.toHaveFocus();
  },
  args: {
    disableOutsidePointerEvents: true,
  },
};

export const SafeZone: Story = {
  render: (props) => {
    const [safeAnchor, setSafeAnchor] = React.useState<HTMLDivElement | null>(
      null,
    );
    const [safeContainer, setSafeContainer] =
      React.useState<HTMLDivElement | null>(null);

    return (
      <div>
        <div
          // biome-ignore lint/a11y/noNoninteractiveTabindex: testing inly
          tabIndex={0}
          ref={setSafeAnchor}
          data-testid="safe-anchor"
          style={{ padding: "1rem", backgroundColor: "lightgray" }}
        />
        <DismissableLayer
          asChild
          {...props}
          safeZone={{
            anchor: safeAnchor,
            dismissable: safeContainer,
          }}
        >
          <div data-testid="safe-container" ref={setSafeContainer}>
            <button type="button">test</button>
          </div>
        </DismissableLayer>
      </div>
    );
  },
  play: async ({ args }) => {
    const canvas = within(document.body);
    const outsideAnchor = canvas.getByTestId("safe-anchor");
    const outsideContainer = canvas.getByTestId("safe-container");

    expect(args.onDismiss).not.toHaveBeenCalled();
    expect(args.onInteractOutside).not.toHaveBeenCalled();

    outsideAnchor.focus();
    expect(args.onDismiss).not.toHaveBeenCalled();
    expect(args.onInteractOutside).toHaveBeenCalledTimes(1);

    outsideContainer.focus();
    expect(args.onDismiss).not.toHaveBeenCalled();
    expect(args.onInteractOutside).toHaveBeenCalledTimes(1);

    await userEvent.click(outsideAnchor);
    expect(args.onDismiss).not.toHaveBeenCalled();
    expect(args.onInteractOutside).toHaveBeenCalledTimes(2);

    await userEvent.click(outsideContainer);
    expect(args.onDismiss).not.toHaveBeenCalled();
    expect(args.onInteractOutside).toHaveBeenCalledTimes(2);
  },
  args: {
    onDismiss: fn(),
    onInteractOutside: fn(),
  },
};

export const NestedPointerEvents: StoryObj<{
  root: Omit<DismissableLayerProps, "children" | "asChild">;
  nested: Omit<DismissableLayerProps, "children" | "asChild">;
}> = {
  render: (props) => {
    const [showRoot, setShowRoot] = React.useState(true);
    const [showNested, setShowNested] = React.useState(true);

    return (
      <div>
        <input
          type="text"
          data-testId="outside"
          tabIndex={0}
          style={{ padding: "1rem", backgroundColor: "lightgray" }}
        />
        {showRoot && (
          <DismissableLayer
            {...props.root}
            onDismiss={(event) => {
              props.root.onDismiss?.(event);
              setShowRoot(false);
              console.info("dismissed root");
            }}
          >
            <input type="text" data-testId="root" placeholder="root" />
            {showNested && (
              <DismissableLayer
                {...props.nested}
                onDismiss={(event) => {
                  props.nested.onDismiss?.(event);
                  setShowNested(false);
                  console.info("dismissed nested");
                }}
              >
                <input type="text" data-testId="nested" placeholder="nested" />
              </DismissableLayer>
            )}
          </DismissableLayer>
        )}
      </div>
    );
  },
  play: async ({ args }) => {
    const canvas = within(document.body);
    const outside = canvas.getByTestId("outside");
    const nested = canvas.getByTestId("nested");

    expect(args.root.onDismiss).not.toHaveBeenCalled();
    expect(args.nested.onDismiss).not.toHaveBeenCalled();

    nested.focus();
    expect(args.root.onDismiss).not.toHaveBeenCalled();
    expect(args.nested.onDismiss).not.toHaveBeenCalled();

    await fireEvent.pointerDown(outside);

    waitFor(() => {
      expect(args.root.onDismiss).not.toHaveBeenCalled();
      expect(args.nested.onDismiss).toHaveBeenCalledTimes(1);
    });

    await userEvent.click(outside);

    waitFor(() => {
      expect(args.root.onDismiss).toHaveBeenCalledTimes(1);
      expect(args.nested.onDismiss).toHaveBeenCalledTimes(1);
    });
  },
  args: {
    root: {
      onDismiss: fn(),
    },
    nested: {
      onDismiss: fn(),
      disableOutsidePointerEvents: true,
    },
  },
};

export const NestedEscapeKeydown: StoryObj<{
  root: Omit<DismissableLayerProps, "children" | "asChild">;
  nested: Omit<DismissableLayerProps, "children" | "asChild">;
}> = {
  render: (props) => {
    const [showRoot, setShowRoot] = React.useState(true);
    const [showNested, setShowNested] = React.useState(true);
    const [enabled, setEnabled] = React.useState(true);
    const [enabledNested, setEnabledNested] = React.useState(true);

    return (
      <div>
        {showRoot && (
          <DismissableLayer
            {...props.root}
            onDismiss={(event) => {
              props.root.onDismiss?.(event);
              setShowRoot(false);
            }}
            enabled={enabled}
            id="root"
          >
            <input type="text" data-testId="root" />
            {showNested && (
              <DismissableLayer
                {...props.nested}
                onDismiss={(event) => {
                  props.nested?.onDismiss?.(event);
                  setShowNested(false);
                }}
                id="nested"
                enabled={enabledNested}
              >
                <input type="text" data-testId="nested" />
                <button type="button" onClick={() => setEnabled((x) => !x)}>
                  toggle root {enabled}
                </button>
                <button
                  type="button"
                  onClick={() => setEnabledNested((x) => !x)}
                >
                  toggle nested {enabledNested}
                </button>
              </DismissableLayer>
            )}
          </DismissableLayer>
        )}
      </div>
    );
  },
  play: async ({ args }) => {
    expect(args.root.onDismiss).not.toHaveBeenCalled();
    expect(args.nested.onDismiss).not.toHaveBeenCalled();

    await userEvent.keyboard("{Escape}");

    waitFor(() => {
      expect(args.root.onDismiss).toHaveBeenCalledTimes(1);
      expect(args.nested.onDismiss).toHaveBeenCalledTimes(1);
    });

    await userEvent.keyboard("{Escape}");

    waitFor(() => {
      expect(args.root.onDismiss).toHaveBeenCalledTimes(1);
      expect(args.nested.onDismiss).toHaveBeenCalledTimes(1);
    });
  },
  args: {
    root: {
      onDismiss: fn(),
    },
    nested: {
      onDismiss: fn(),
    },
  },
};

export const MultipleEscapeKeydown: StoryObj<{
  first: Omit<DismissableLayerProps, "children" | "asChild">;
  last: Omit<DismissableLayerProps, "children" | "asChild">;
}> = {
  render: (props) => {
    const [showFirst, setShowFirst] = React.useState(true);
    const [showLast, setShowLast] = React.useState(true);

    return (
      <div>
        {showFirst && (
          <DismissableLayer
            {...props.first}
            onDismiss={(event) => {
              props.first.onDismiss?.(event);
              setShowFirst(false);
            }}
          >
            <input type="text" data-testId="first" placeholder="first" />
          </DismissableLayer>
        )}
        {showLast && (
          <DismissableLayer
            {...props.last}
            onDismiss={(event) => {
              props.last?.onDismiss?.(event);
              setShowLast(false);
            }}
          >
            <input type="text" data-testId="last" placeholder="last" />
          </DismissableLayer>
        )}
      </div>
    );
  },
  play: async ({ args }) => {
    expect(args.first.onDismiss).not.toHaveBeenCalled();
    expect(args.last.onDismiss).not.toHaveBeenCalled();

    await userEvent.keyboard("{Escape}");

    waitFor(() => {
      expect(args.first.onDismiss).not.toHaveBeenCalled();
      expect(args.last.onDismiss).toHaveBeenCalledTimes(1);
    });

    await userEvent.keyboard("{Escape}");

    waitFor(() => {
      expect(args.first.onDismiss).toHaveBeenCalledTimes(1);
      expect(args.last.onDismiss).toHaveBeenCalledTimes(1);
    });
  },
  args: {
    first: {
      onDismiss: fn(),
    },
    last: {
      onDismiss: fn(),
    },
  },
};

export const MultipleOutsideClick: StoryObj<{
  first: Omit<DismissableLayerProps, "children" | "asChild">;
  last: Omit<DismissableLayerProps, "children" | "asChild">;
}> = {
  render: (props) => {
    const [showFirst, setShowFirst] = React.useState(true);
    const [showLast, setShowLast] = React.useState(true);

    return (
      <div>
        <input
          type="text"
          data-testId="outside"
          tabIndex={0}
          style={{ padding: "1rem", backgroundColor: "lightgray" }}
        />
        {showFirst && (
          <DismissableLayer
            {...props.first}
            onDismiss={(event) => {
              props.first.onDismiss?.(event);
              setShowFirst(false);
            }}
          >
            <input type="text" data-testId="first" placeholder="first" />
          </DismissableLayer>
        )}
        {showLast && (
          <DismissableLayer
            {...props.last}
            onDismiss={(event) => {
              props.last?.onDismiss?.(event);
              setShowLast(false);
            }}
          >
            <input type="text" data-testId="last" placeholder="last" />
          </DismissableLayer>
        )}
      </div>
    );
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const outside = canvas.getByTestId("outside");

    expect(args.first.onDismiss).not.toHaveBeenCalled();
    expect(args.last.onDismiss).not.toHaveBeenCalled();

    await fireEvent.pointerDown(outside);

    waitFor(() => {
      expect(args.first.onDismiss).not.toHaveBeenCalled();
      expect(args.last.onDismiss).toHaveBeenCalledTimes(1);
    });

    await userEvent.click(outside);

    waitFor(() => {
      expect(args.first.onDismiss).toHaveBeenCalledTimes(1);
      expect(args.last.onDismiss).toHaveBeenCalledTimes(1);
    });
  },
  args: {
    first: {
      onDismiss: fn(),
    },
    last: {
      onDismiss: fn(),
      disableOutsidePointerEvents: true,
    },
  },
};

export const PreventEvents: Story = {
  render: (props) => {
    return (
      <div>
        <DismissableLayer asChild {...props}>
          <input type="text" />
        </DismissableLayer>
        <div data-testid="outside" style={{ padding: "1rem" }} />
        <div
          data-testid="outside-focusable"
          style={{ padding: "1rem" }}
          // biome-ignore lint/a11y/noNoninteractiveTabindex: testing inly
          tabIndex={0}
        />
      </div>
    );
  },
  play: async ({ args }) => {
    const canvas = within(document.body);
    const outsideElement = canvas.getByTestId("outside");
    const outsideFocus = canvas.getByTestId("outside-focusable");

    expect(args.onDismiss).not.toHaveBeenCalled();

    await userEvent.keyboard("{Escape}");

    expect(args.onDismiss).not.toHaveBeenCalled();

    outsideFocus.focus();

    expect(args.onDismiss).not.toHaveBeenCalled();

    await userEvent.click(outsideElement);

    expect(args.onDismiss).not.toHaveBeenCalled();
  },
  args: {
    onDismiss: fn(),
    onInteractOutside: (event) => event.preventDefault(),
    onFocusOutside: (event) => event.preventDefault(),
    onEscapeKeyDown: (event) => event.preventDefault(),
    onPointerDownOutside: (event) => event.preventDefault(),
  },
};
