import { Meta, StoryObj } from "@storybook/react/*";
import React, { useEffect } from "react";
import { Button } from "../../button";
import {
  DialogPrimitive,
  DialogPrimitiveClose,
  DialogPrimitiveContent,
  DialogPrimitiveTitle,
  DialogPrimitiveTrigger,
} from "./DialogPrimitive";

export default {
  title: "Utilities/DialogPrimitive",
  parameters: {
    layout: "padded",
    chromatic: { disable: true },
  },
} satisfies Meta<typeof DialogPrimitive>;

type Story = StoryObj<typeof DialogPrimitive>;

export const Demo: Story = {
  render: () => {
    return (
      <DialogPrimitive>
        <DialogPrimitiveTrigger>
          <Button>Open Dialog</Button>
        </DialogPrimitiveTrigger>
        <DialogPrimitiveContent>
          <DialogPrimitiveTitle>Dialog Content</DialogPrimitiveTitle>
          <p>This is a simple dialog primitive example.</p>
          <DialogPrimitiveClose>
            <Button>Close</Button>
          </DialogPrimitiveClose>
        </DialogPrimitiveContent>
      </DialogPrimitive>
    );
  },
};

export const DefaultOpen: Story = {
  render: () => {
    return (
      <DialogPrimitive defaultOpen>
        <DialogPrimitiveTrigger>
          <Button>Open Dialog</Button>
        </DialogPrimitiveTrigger>
        <DialogPrimitiveContent>
          <h1>Dialog Content</h1>
          <p>This is a simple dialog primitive example.</p>
        </DialogPrimitiveContent>
      </DialogPrimitive>
    );
  },
};

export const ControlledOpen: Story = {
  render: () => {
    return (
      <DialogPrimitive open onOpenChange={() => null}>
        <DialogPrimitiveTrigger>
          <Button>Open Dialog</Button>
        </DialogPrimitiveTrigger>
        <DialogPrimitiveContent>
          <h1>Dialog Content</h1>
          <p>This is a simple dialog primitive example.</p>
        </DialogPrimitiveContent>
      </DialogPrimitive>
    );
  },
};

export const AlternatingOpen: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    useEffect(() => {
      const interval = setInterval(() => {
        setOpen((prevOpen) => !prevOpen);
      }, 2000);
      return () => clearInterval(interval);
    }, []);

    return (
      <DialogPrimitive open={open}>
        <DialogPrimitiveTrigger>
          <Button>Open Dialog</Button>
        </DialogPrimitiveTrigger>
        <DialogPrimitiveContent>
          <h1>Dialog Content</h1>
          <p>This is a simple dialog primitive example.</p>
        </DialogPrimitiveContent>
      </DialogPrimitive>
    );
  },
};
