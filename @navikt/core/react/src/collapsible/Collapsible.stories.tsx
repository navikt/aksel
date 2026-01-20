import { Meta, StoryFn, StoryObj } from "@storybook/react-vite";
import React, { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@navikt/aksel-icons";
import { Button } from "../button";
import { Box } from "../layout/box";
import { HStack } from "../layout/stack";
import { renderStoriesForChromatic } from "../utils/renderStoriesForChromatic";
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
      <HStack justify="space-between" gap="space-16" align="center">
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
        <Box padding="space-32" background="info-soft">
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
      <Box padding="space-16" background="info-soft">
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
      <Box padding="space-16" background="info-soft">
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
      <Box padding="space-16" background="info-soft">
        <div>lorem ipsum</div>
      </Box>
    </Collapsible.Content>
  </Collapsible>
);

export const Disabled = ({ open = false }) => (
  <Collapsible open={open}>
    <Collapsible.Trigger asChild disabled>
      <Button>Button</Button>
    </Collapsible.Trigger>
    <Collapsible.Content asChild>
      <Box padding="space-16" background="info-soft">
        <div>lorem ipsum</div>
      </Box>
    </Collapsible.Content>
  </Collapsible>
);

export const Chromatic = renderStoriesForChromatic({
  InContext,
  Animated,
  Lazy,
  AsChild,
  DefaultOpen,
  ControlledOpen,
  Disabled,
  DisabledOpen: () => <Disabled open />,
});
