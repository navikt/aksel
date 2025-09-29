import { Meta, StoryFn, StoryObj } from "@storybook/react-vite";
import React, { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@navikt/aksel-icons";
import { Button } from "../button";
import { Box } from "../layout/box";
import { HStack, VStack } from "../layout/stack";
import { Collapsible } from "./Collapsible";

const meta: Meta<typeof Collapsible> = {
  title: "Utilities/Collapsible",
  component: Collapsible,
  parameters: {
    chromatic: { disable: true },
  },
};

export default meta;

type Story = StoryObj<typeof Collapsible>;

export const Default: Story = {
  render: (...props) => (
    <Collapsible {...props}>
      <Collapsible.Trigger>Trigger</Collapsible.Trigger>
      <Collapsible.Content>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae
        corporis maxime aliquam, voluptates nobis numquam, non odit optio
        architecto iure laborum possimus! Quibusdam sit ullam, consequatur sunt
        tempore optio aliquid!
      </Collapsible.Content>
    </Collapsible>
  ),
  args: {
    open: false,
    defaultOpen: false,
  },
};

export const InContext: StoryFn<typeof Collapsible> = () => {
  const [open, setOpen] = useState(false);
  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <HStack justify="space-between" gap="4" align="center">
        Steg 1 av 8{" "}
        <Collapsible.Trigger asChild>
          <Button
            size="small"
            variant="tertiary"
            iconPosition="right"
            icon={
              open ? (
                <ChevronUpIcon aria-hidden />
              ) : (
                <ChevronDownIcon aria-hidden />
              )
            }
          >
            Vis steg
          </Button>
        </Collapsible.Trigger>
      </HStack>
      <Collapsible.Content>
        <p>Lorem ipsum dolor sit</p>
      </Collapsible.Content>
    </Collapsible>
  );
};

export const Animated: StoryFn<typeof Collapsible> = () => (
  <Collapsible lazy>
    <Collapsible.Trigger asChild>
      <Button size="small" variant="secondary">
        Animer open/lukk
      </Button>
    </Collapsible.Trigger>
    <Collapsible.Content className="collapsible">
      <div className="collapsibleContent">
        <Box padding="8" background="surface-alt-3-subtle">
          <div>lorem ipsum</div>
        </Box>
      </div>
    </Collapsible.Content>
  </Collapsible>
);

Animated.decorators = [
  (Story) => (
    <div style={{ height: 300 }}>
      <style>{`
      .collapsible {
        display: grid;
        grid-template-rows: 0fr;
        overflow: hidden;
        transition: grid-template-rows 1s ease-in-out;
      }

      .collapsible[data-state="closed"] {
        width: 0;
      }

      .collapsible[data-state="open"] {
        grid-template-rows: 1fr;
      }

      .collapsibleContent {
        min-height: 0;
        transition: visibility 1s;
        visibility: hidden;
      }

      .collapsible[data-state="open"] .collapsibleContent {
        visibility: visible;
      }

  `}</style>
      {Story()}
    </div>
  ),
];

export const Lazy: StoryFn<typeof Collapsible> = () => (
  <Collapsible lazy>
    <Collapsible.Trigger>Trigger</Collapsible.Trigger>
    <Collapsible.Content>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae
      corporis maxime aliquam, voluptates nobis numquam, non odit optio
      architecto iure laborum possimus! Quibusdam sit ullam, consequatur sunt
      tempore optio aliquid!
    </Collapsible.Content>
  </Collapsible>
);

export const AsChild: StoryFn<typeof Collapsible> = () => (
  <Collapsible>
    <Collapsible.Trigger asChild>
      <Button>Button</Button>
    </Collapsible.Trigger>
    <Collapsible.Content asChild>
      <Box padding="4" background="surface-alt-3-subtle">
        <div>lorem ipsum</div>
      </Box>
    </Collapsible.Content>
  </Collapsible>
);

export const DefaultOpen: StoryFn<typeof Collapsible> = () => (
  <Collapsible defaultOpen>
    <Collapsible.Trigger asChild>
      <Button>Button</Button>
    </Collapsible.Trigger>
    <Collapsible.Content asChild>
      <Box padding="4" background="surface-alt-3-subtle">
        <div>lorem ipsum</div>
      </Box>
    </Collapsible.Content>
  </Collapsible>
);

export const ControlledOpen: StoryFn<typeof Collapsible> = () => (
  <Collapsible open>
    <Collapsible.Trigger asChild>
      <Button>Button</Button>
    </Collapsible.Trigger>
    <Collapsible.Content asChild>
      <Box padding="4" background="surface-alt-3-subtle">
        <div>lorem ipsum</div>
      </Box>
    </Collapsible.Content>
  </Collapsible>
);

export const Disabled: StoryFn<typeof Collapsible> = ({ open = false }) => (
  <Collapsible open={open}>
    <Collapsible.Trigger asChild disabled>
      <Button>Button</Button>
    </Collapsible.Trigger>
    <Collapsible.Content asChild>
      <Box padding="4" background="surface-alt-3-subtle">
        <div>lorem ipsum</div>
      </Box>
    </Collapsible.Content>
  </Collapsible>
);

export const Chromatic: Story = {
  render: () => (
    <VStack gap="8">
      <div>
        <h2>In context</h2>
        <InContext />
      </div>
      <div>
        <h2>Animated</h2>
        <Animated />
      </div>
      <div>
        <h2>Lazy</h2>
        <Lazy />
      </div>
      <div>
        <h2>AsChild</h2>
        <AsChild />
      </div>
      <div>
        <h2>DefaultOpen</h2>
        <DefaultOpen />
      </div>
      <div>
        <h2>ControlledOpen</h2>
        <ControlledOpen />
      </div>
      <div>
        <h2>Disabled</h2>
        <Disabled />
        <Disabled open />
      </div>
    </VStack>
  ),
  parameters: {
    chromatic: { disable: false },
  },
};
