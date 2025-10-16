import { Meta, StoryObj } from "@storybook/react-vite";
import clsx from "clsx";
import React, { useState } from "react";
import { ChevronDownIcon } from "@navikt/aksel-icons";
import { HGrid } from "../layout/grid";
import { Panel, Root, Trigger } from "./namespace";

const meta: Meta<typeof Root> = {
  title: "Utilities/Collapsible-v2",
  component: Root,
  parameters: {
    chromatic: { disable: true },
  },
};

export default meta;

type Story = StoryObj<typeof BaseCollapsible>;

export const Default: Story = {
  render: BaseCollapsible,
  args: {
    animation: "transition-vertical",
  },
};

export const HiddenUntilFound: Story = {
  render: BaseCollapsible,
  args: {
    rootProps: {
      hiddenUntilFound: true,
      keepMounted: true,
    },
  },
};

export const HiddenUntilFoundWithTransition: Story = {
  render: BaseCollapsible,
  args: {
    rootProps: {
      hiddenUntilFound: true,
      keepMounted: true,
    },
    animation: "transition-vertical",
  },
};

export const ControlledNotKeepMounted: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div>
        <button onClick={() => setOpen((x) => !x)}>Toggle</button>
        <BaseCollapsible
          rootProps={{ keepMounted: false, open, onOpenChange: setOpen }}
          animation="transition-vertical"
        />
      </div>
    );
  },
};

export const Animations: Story = {
  render: () => (
    <HGrid columns={2} gap="space-32">
      <div>
        <h2>Keepmounted: true</h2>
        <BaseCollapsible
          rootProps={{ keepMounted: true, defaultOpen: true }}
          animation="animation-vertical"
        />
      </div>
      <div>
        <h2>Keepmounted: false</h2>
        <BaseCollapsible
          rootProps={{ keepMounted: false, defaultOpen: true }}
          animation="animation-vertical"
        />
      </div>
      <div>
        <BaseCollapsible
          rootProps={{ keepMounted: true, defaultOpen: false }}
          animation="animation-vertical"
        />
      </div>
      <div>
        <BaseCollapsible
          rootProps={{ keepMounted: false, defaultOpen: false }}
          animation="animation-vertical"
        />
      </div>
    </HGrid>
  ),
};

export const AnimationsHorizontal: Story = {
  render: () => (
    <HGrid columns={2} gap="space-32">
      <div>
        <h2>Keepmounted: true</h2>
        <BaseCollapsible
          rootProps={{ keepMounted: true, defaultOpen: true }}
          animation="animation-horizontal"
        />
      </div>
      <div>
        <h2>Keepmounted: false</h2>
        <BaseCollapsible
          rootProps={{ keepMounted: false, defaultOpen: true }}
          animation="animation-horizontal"
        />
      </div>
      <div>
        <BaseCollapsible
          rootProps={{ keepMounted: true, defaultOpen: false }}
          animation="animation-horizontal"
        />
      </div>
      <div>
        <BaseCollapsible
          rootProps={{ keepMounted: false, defaultOpen: false }}
          animation="animation-horizontal"
        />
      </div>
    </HGrid>
  ),
};

export const Transitions: Story = {
  render: () => (
    <HGrid columns={2} gap="space-32">
      <div>
        <h2>Keepmounted: true</h2>
        <BaseCollapsible
          rootProps={{ keepMounted: true, defaultOpen: true }}
          animation="transition-vertical"
        />
      </div>
      <div>
        <h2>Keepmounted: false</h2>
        <BaseCollapsible
          rootProps={{ keepMounted: false, defaultOpen: true }}
          animation="transition-vertical"
        />
      </div>
      <div>
        <BaseCollapsible
          rootProps={{ keepMounted: true, defaultOpen: false }}
          animation="transition-vertical"
        />
      </div>
      <div>
        <BaseCollapsible
          rootProps={{ keepMounted: false, defaultOpen: false }}
          animation="transition-vertical"
        />
      </div>
    </HGrid>
  ),
};

export const TransitionsHorizontal: Story = {
  render: () => (
    <HGrid columns={2} gap="space-32">
      <div>
        <h2>Keepmounted: true</h2>
        <BaseCollapsible
          rootProps={{ keepMounted: true, defaultOpen: true }}
          animation="transition-horizontal"
        />
      </div>
      <div>
        <h2>Keepmounted: false</h2>
        <BaseCollapsible
          rootProps={{ keepMounted: false, defaultOpen: true }}
          animation="transition-horizontal"
        />
      </div>
      <div>
        <BaseCollapsible
          rootProps={{ keepMounted: true, defaultOpen: false }}
          animation="transition-horizontal"
        />
      </div>
      <div>
        <BaseCollapsible
          rootProps={{ keepMounted: false, defaultOpen: false }}
          animation="transition-horizontal"
        />
      </div>
    </HGrid>
  ),
};

type BaseCollapsibleProps = {
  rootProps?: Omit<React.ComponentProps<typeof Root>, "children">;
  triggerProps?: Omit<React.ComponentProps<typeof Trigger>, "asChild">;
  panelProps?: Omit<React.ComponentProps<typeof Panel>, "children">;
  animation?:
    | "animation-vertical"
    | "animation-horizontal"
    | "transition-vertical"
    | "transition-horizontal";
};

function BaseCollapsible(props: BaseCollapsibleProps) {
  return (
    <div style={{ width: "300px", maxWidth: "100%" }}>
      {StoryStyles}
      <Root
        className="root"
        onOpenChange={(newOpen) => console.info("onOpenChange", newOpen)}
        {...props.rootProps}
      >
        <Trigger className="trigger" {...props.triggerProps}>
          <ChevronDownIcon aria-hidden fontSize="1.25rem" />
          <span>Show list</span>
        </Trigger>
        <Panel
          className={clsx("panel", {
            "panel-animation": props.animation === "animation-vertical",
            "panel-animation-horizontal":
              props.animation === "animation-horizontal",
            "panel-transition": props.animation === "transition-vertical",
            "panel-transition-horizontal":
              props.animation === "transition-horizontal",
          })}
          {...props.panelProps}
        >
          <ul>
            <li>Ikea</li>
            <li>Skeidar</li>
            <li>Mobelringen</li>
          </ul>
        </Panel>
      </Root>
    </div>
  );
}

const StoryStyles = (
  <style>
    {`
    .root {}

    .trigger {
      display: flex;
      gap: 0.25rem;
      align-items: center;
      background: var(--ax-bg-neutral-moderate);
      border-radius: var(--ax-radius-4);
      padding: 0.5rem 1rem 0.5rem 0.5rem;
      border: 1px solid var(--ax-border-neutral);
      cursor: pointer;
      width: 100%;

      &:hover {
        background: var(--ax-bg-neutral-moderate-hover);
      }

      & svg {
        rotate: -90deg;
      }

      &[data-state="open"] {
        & svg {
          rotate: 0deg;
        }
      }
    }

    .panel {
      overflow: hidden;

      & ul {
        background: var(--ax-bg-neutral-moderate);
        border-radius: var(--ax-radius-4);
        border: 1px solid var(--ax-border-neutral);
        width: 100%;
        overflow: hidden;
        padding: 1rem;
        list-style: none;
        margin: 0;
        margin-top: 0.5rem;
        white-space: nowrap;
      }
    }

    .panel-animation {
      &[data-state="open"] {
        animation: ax-collapse-slide-down 300ms ease;
      }

      &[data-state="closed"] {
        animation: ax-collapse-slide-down 300ms ease reverse;
      }
    }

    .panel-animation-horizontal {
      &[data-state="open"] {
        animation: ax-collapse-slide-sideways 300ms ease;
      }

      &[data-state="closed"] {
        animation: ax-collapse-slide-sideways 300ms ease reverse;
      }
    }

    @keyframes ax-collapse-slide-down {
      from {
        height: 0;
      }
      to {
        height: var(--__axc-collapsible-panel-height);
      }
    }

    @keyframes ax-collapse-slide-sideways {
      from {
        width: 0;
      }
      to {
        width: var(--__axc-collapsible-panel-width);
      }
    }

    .panel-transition {
      height: var(--__axc-collapsible-panel-height);
      transition: all 300ms ease;

      &[data-entering-style] {
        height: 100vh;
        opacity: 0;
        background: red;
      }

      &[data-exiting-style] {
        height: 0;
        opacity: 0;
      }

    }

    .panel-transition-horizontal {
      width: var(--__axc-collapsible-panel-height);
      transition: all 300ms ease;

      &[data-entering-style],
      &[data-exiting-style] {
        width: 0;
        opacity: 0;
      }
    }

    `}
  </style>
);
