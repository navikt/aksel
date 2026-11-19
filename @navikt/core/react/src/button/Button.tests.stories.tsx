import type { Meta, StoryObj } from "@storybook/react-vite";
import React, { forwardRef } from "react";
import { expect, fn, userEvent, within } from "storybook/test";
import { Button } from "./index";

const meta: Meta<typeof Button> = {
  title: "ds-react/Button/tests",
  component: Button,
  parameters: {
    chromatic: { disable: true },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

const CustomButton = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>((props, ref) => <button type="button" {...props} ref={ref} />);

const onClick = fn((event: React.MouseEvent) => event.preventDefault());

export const KeyboardActivation: Story = {
  args: {
    onClick,
  },
  render: (args) => (
    <>
      <Button {...args}>Native button</Button>
      <Button {...args} as={CustomButton}>
        Custom native button
      </Button>
      <Button {...args} as="a" href="#">
        Link button
      </Button>
    </>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    for (const name of ["Native button", "Custom native button"]) {
      await user.click(canvas.getByRole("button", { name }));
      onClick.mockClear();
      await user.keyboard("{Shift>} {/Shift}");
      expect(onClick).toHaveBeenCalledTimes(1);
      expect(onClick).toHaveBeenLastCalledWith(
        expect.objectContaining({ shiftKey: true }),
      );

      onClick.mockClear();
      await user.keyboard(" ");
      expect(onClick).toHaveBeenCalledTimes(1);
      expect(onClick).toHaveBeenLastCalledWith(
        expect.objectContaining({ shiftKey: false }),
      );
    }

    await user.click(canvas.getByRole("button", { name: "Link button" }));
    onClick.mockClear();
    await user.keyboard(" ");
    expect(onClick).toHaveBeenCalledTimes(1);
  },
};
