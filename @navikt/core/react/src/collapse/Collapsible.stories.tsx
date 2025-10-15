import { Meta, StoryObj } from "@storybook/react-vite";
import clsx from "clsx";
import React from "react";
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
  args: {},
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
    <div>
      {StoryStyles}
      <Root className="root" {...props.rootProps}>
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
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 3</li>
            <li>Item 3</li>
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
      background: var(--ax-bg-neutral-moderate);
      padding: 1rem;
      margin-top: 0.5rem;
      border-radius: var(--ax-radius-4);
      border: 1px solid var(--ax-border-neutral);
      overflow: hidden;
      width: 100%;

      & ul {
        list-style: none;
        margin: 0;
        padding: 0;
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
      transition: all 300ms ease;
      height: var(--__axc-collapsible-panel-height);

      &[data-entering-style],
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
