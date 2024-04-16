import { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@navikt/aksel-icons";
import { Button } from "../button";
import { HStack } from "../layout/stack";
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

export const InContext: Story = {
  render: () => {
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
  },
};
