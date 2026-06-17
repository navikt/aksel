import { Meta, StoryFn, StoryObj } from "@storybook/react-vite";
import React, { useEffect, useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@navikt/aksel-icons";
import { Button } from "../button";
import { Box } from "../primitives/box";
import { HStack } from "../primitives/stack";
import { renderStoriesForChromatic } from "../utils/renderStoriesForChromatic";
import { Collapsible } from "./root/CollapsibleRoot";

const meta: Meta<typeof Collapsible> = {
  title: "Utilities/Collapsible",
  component: Collapsible,
  parameters: {
    chromatic: { disable: true },
  },
};

export default meta;

type Story = StoryObj<typeof Collapsible>;

function DemoContent(props: React.HTMLAttributes<HTMLDivElement>) {
  useEffect(() => {
    console.log("Content mounted");
    return () => console.log("Content unmounted");
  }, []);

  return (
    <Box {...props} padding="space-16" background="info-soft">
      <div>lorem ipsum</div>
    </Box>
  );
}

export const Default: Story = {
  render: (props) => (
    <Collapsible {...props}>
      <Collapsible.Trigger>Trigger</Collapsible.Trigger>
      <Collapsible.Content>
        <DemoContent />
      </Collapsible.Content>
    </Collapsible>
  ),
  args: {
    defaultOpen: false,
  },
  argTypes: {
    open: {
      control: "boolean",
    },
    hidingMethod: {
      control: "select",
      options: ["unmount", "hidden", "hiddenUntilFound"],
    },
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

export const Animated: StoryFn<typeof Collapsible> = (props) => (
  <Collapsible {...props}>
    <Collapsible.Trigger asChild>
      <Button size="small" variant="secondary">
        Animer åpne/lukk
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
Animated.argTypes = {
  hidingMethod: {
    control: "radio",
    options: ["hidden", "hiddenUntilFound"],
  },
};
Animated.decorators = [
  (Story) => (
    <div style={{ height: 300 }}>
      <style>{`
      .collapsible {
        display: grid;
        grid-template-rows: 0fr;
        overflow: hidden;
        transition: grid-template-rows 1s ease-in-out;
        content-visibility: visible;
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
  <Collapsible hidingMethod="unmount">
    <Collapsible.Trigger>Trigger</Collapsible.Trigger>
    <Collapsible.Content>
      <DemoContent />
    </Collapsible.Content>
  </Collapsible>
);

export const AsChild: StoryFn<typeof Collapsible> = () => (
  <Collapsible>
    <Collapsible.Trigger asChild>
      <Button>Button</Button>
    </Collapsible.Trigger>
    <Collapsible.Content asChild>
      <DemoContent />
    </Collapsible.Content>
  </Collapsible>
);

export const DefaultOpen: StoryFn<typeof Collapsible> = () => (
  <Collapsible defaultOpen>
    <Collapsible.Trigger asChild>
      <Button>Button</Button>
    </Collapsible.Trigger>
    <Collapsible.Content asChild>
      <DemoContent />
    </Collapsible.Content>
  </Collapsible>
);

export const ControlledOpen: StoryFn<typeof Collapsible> = () => (
  <Collapsible open>
    <Collapsible.Trigger asChild>
      <Button>Button</Button>
    </Collapsible.Trigger>
    <Collapsible.Content asChild>
      <DemoContent />
    </Collapsible.Content>
  </Collapsible>
);

export const Disabled = ({ open = false }) => (
  <Collapsible open={open}>
    <Collapsible.Trigger asChild disabled>
      <Button>Button</Button>
    </Collapsible.Trigger>
    <Collapsible.Content asChild>
      <DemoContent />
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
