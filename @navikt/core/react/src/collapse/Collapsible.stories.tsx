import { Meta, StoryFn, StoryObj } from "@storybook/react-vite";
import React, { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@navikt/aksel-icons";
import { Button } from "../button";
import { Box } from "../layout/box";
import { HStack, VStack } from "../layout/stack";
import { Panel, Root, Trigger } from "./namespace";

const meta: Meta<typeof Root> = {
  title: "Utilities/Root-v2",
  component: Root,
  parameters: {
    chromatic: { disable: true },
  },
};

export default meta;

type Story = StoryObj<typeof Root>;

export const Default: Story = {
  render: (...props) => (
    <Root {...props}>
      <Trigger>Trigger</Trigger>
      <Panel>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae
        corporis maxime aliquam, voluptates nobis numquam, non odit optio
        architecto iure laborum possimus! Quibusdam sit ullam, consequatur sunt
        tempore optio aliquid!
      </Panel>
    </Root>
  ),
  args: {
    open: false,
    defaultOpen: false,
  },
};

export const InContext: StoryFn<typeof Root> = () => {
  const [open, setOpen] = useState(false);
  return (
    <Root open={open} onOpenChange={setOpen}>
      <HStack justify="space-between" gap="4" align="center">
        Steg 1 av 8{" "}
        <Trigger asChild>
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
        </Trigger>
      </HStack>
      <Panel>
        <p>Lorem ipsum dolor sit</p>
      </Panel>
    </Root>
  );
};

export const Animated: StoryFn<typeof Root> = () => (
  <Root lazy>
    <Trigger asChild>
      <Button size="small" variant="secondary">
        Animer open/lukk
      </Button>
    </Trigger>
    <Panel className="root">
      <div className="rootContent">
        <Box padding="8" background="surface-alt-3-subtle">
          <div>lorem ipsum</div>
        </Box>
      </div>
    </Panel>
  </Root>
);

Animated.decorators = [
  (Story) => (
    <div style={{ height: 300 }}>
      <style>{`
      .root {
        display: grid;
        grid-template-rows: 0fr;
        overflow: hidden;
        transition: grid-template-rows 1s ease-in-out;
      }

      .root[data-state="closed"] {
        width: 0;
      }

      .root[data-state="open"] {
        grid-template-rows: 1fr;
      }

      .rootContent {
        min-height: 0;
        transition: visibility 1s;
        visibility: hidden;
      }

      .root[data-state="open"] .rootContent {
        visibility: visible;
      }

  `}</style>
      {Story()}
    </div>
  ),
];

export const Lazy: StoryFn<typeof Root> = () => (
  <Root lazy>
    <Trigger>Trigger</Trigger>
    <Panel>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae
      corporis maxime aliquam, voluptates nobis numquam, non odit optio
      architecto iure laborum possimus! Quibusdam sit ullam, consequatur sunt
      tempore optio aliquid!
    </Panel>
  </Root>
);

export const AsChild: StoryFn<typeof Root> = () => (
  <Root>
    <Trigger asChild>
      <Button>Button</Button>
    </Trigger>
    <Panel asChild>
      <Box padding="4" background="surface-alt-3-subtle">
        <div>lorem ipsum</div>
      </Box>
    </Panel>
  </Root>
);

export const DefaultOpen: StoryFn<typeof Root> = () => (
  <Root defaultOpen>
    <Trigger asChild>
      <Button>Button</Button>
    </Trigger>
    <Panel asChild>
      <Box padding="4" background="surface-alt-3-subtle">
        <div>lorem ipsum</div>
      </Box>
    </Panel>
  </Root>
);

export const ControlledOpen: StoryFn<typeof Root> = () => (
  <Root open>
    <Trigger asChild>
      <Button>Button</Button>
    </Trigger>
    <Panel asChild>
      <Box padding="4" background="surface-alt-3-subtle">
        <div>lorem ipsum</div>
      </Box>
    </Panel>
  </Root>
);

export const Disabled: StoryFn<typeof Root> = ({ open = false }) => (
  <Root open={open}>
    <Trigger asChild disabled>
      <Button>Button</Button>
    </Trigger>
    <Panel asChild>
      <Box padding="4" background="surface-alt-3-subtle">
        <div>lorem ipsum</div>
      </Box>
    </Panel>
  </Root>
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
