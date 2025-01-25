import { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "@storybook/test";
import { format, setYear } from "date-fns";
import { nb } from "date-fns/locale";
import React from "react";
import MonthPicker from "./MonthPicker";

export default {
  title: "ds-react/Monthpicker/Tests",
  component: MonthPicker,
  parameters: {
    chromatic: { disable: true },
  },
} satisfies Meta<typeof MonthPicker>;

type Story = StoryObj<typeof MonthPicker>;

/* function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
} */

const currentDate = new Date();
const previousYear = setYear(currentDate, currentDate.getFullYear() - 1);
/* const nextYear = setYear(currentDate, currentDate.getFullYear() + 1); */

/**
 * Validate that the monthpicker shows the current year by default
 */
export const InitialDefaultView: Story = {
  render: () => <MonthPicker.Standalone />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const label = canvas.getByText(`${new Date().getFullYear()}`);

    expect(label).toBeInTheDocument();

    const todayButton = canvas.getByRole("button", {
      name: format(new Date(), "LLLL", { locale: nb }),
    });

    expect(todayButton.getAttribute("data-current-month")).toBe("true");
  },
};

/**
 * Validate that the monthpicker shows the previous year when `year`-prop is set to the previous year
 */
export const InitialOffsetView: Story = {
  render: () => <MonthPicker.Standalone year={previousYear} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const label = canvas.getByText(`${previousYear.getFullYear()}`);

    expect(label).toBeInTheDocument();

    const todayButton = canvas.getByRole("button", {
      name: format(previousYear, "LLLL", { locale: nb }),
    });

    expect(todayButton.getAttribute("data-current-month")).toBe("false");
  },
};

/**
 * Validate that the monthpicker shows the previous year when initial `selected` is set to the previous year
 */
export const InitialControlledView: Story = {
  render: () => <MonthPicker.Standalone selected={previousYear} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const label = canvas.getByText(`${previousYear.getFullYear()}`);

    expect(label).toBeInTheDocument();

    const todayButton = canvas.getByRole("button", {
      name: format(previousYear, "LLLL", { locale: nb }),
    });

    expect(todayButton.getAttribute("data-current-month")).toBe("false");
  },
};

/**
 * Validate that the monthpicker shows the previous year when initial `defaultSelected` is set to the previous year
 */
export const InitialDefaultControlledView: Story = {
  render: () => <MonthPicker.Standalone defaultSelected={previousYear} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const label = canvas.getByText(`${previousYear.getFullYear()}`);

    expect(label).toBeInTheDocument();

    const todayButton = canvas.getByRole("button", {
      name: format(previousYear, "LLLL", { locale: nb }),
    });

    expect(todayButton.getAttribute("data-current-month")).toBe("false");
  },
};
