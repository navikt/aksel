import { Meta, StoryObj } from "@storybook/react-vite";
import { format, setYear } from "date-fns";
import { nb } from "date-fns/locale";
import React from "react";
import { expect, fn, userEvent, within } from "storybook/test";
import MonthPicker from "./MonthPicker";

export default {
  title: "ds-react/Monthpicker/Tests",
  component: MonthPicker,
  parameters: {
    chromatic: { disable: true },
  },
} satisfies Meta<typeof MonthPicker>;

type Story = StoryObj<typeof MonthPicker>;

const currentDate = new Date();
const previousYear = setYear(currentDate, currentDate.getFullYear() - 1);
const nextYear = setYear(currentDate, currentDate.getFullYear() + 1);

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
export const PreviousYearView: Story = {
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
 * Validate that the monthpicker shows the next year when `year`-prop is set to the next year
 */
export const NextYearView: Story = {
  render: () => <MonthPicker.Standalone year={nextYear} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const label = canvas.getByText(`${nextYear.getFullYear()}`);

    expect(label).toBeInTheDocument();

    const todayButton = canvas.getByRole("button", {
      name: format(nextYear, "LLLL", { locale: nb }),
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

/**
 * Validate that the monthpicker handles `disabled` prop correctly
 */
export const DisabledMonths: Story = {
  render: () => (
    <MonthPicker.Standalone
      year={new Date("2022")}
      disabled={[
        { from: new Date("Feb 1 2022"), to: new Date("May 6 2022") },
        new Date("Sep 5 2022"),
      ]}
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const disabledButtons = [
      canvas.getByRole("button", {
        name: format(new Date("Feb 1 2023"), "LLLL", { locale: nb }),
      }),
      canvas.getByRole("button", {
        name: format(new Date("Mar 1 2023"), "LLLL", { locale: nb }),
      }),
      canvas.getByRole("button", {
        name: format(new Date("Apr 1 2023"), "LLLL", { locale: nb }),
      }),
      canvas.getByRole("button", {
        name: format(new Date("May 1 2023"), "LLLL", { locale: nb }),
      }),
      canvas.getByRole("button", {
        name: format(new Date("Sep 1 2023"), "LLLL", { locale: nb }),
      }),
    ];

    disabledButtons.forEach((button) => {
      expect(button).toBeDisabled();
    });
  },
};

/**
 * Validate that the monthpicker handles `dropdownCaption` prop correctly
 */
export const LabelCaptionView: Story = {
  render: () => {
    const [year, setLocalYear] = React.useState(new Date("2025"));

    return (
      <MonthPicker.Standalone
        fromDate={new Date("Feb 10 2022")}
        toDate={new Date("Sep 27 2028")}
        year={year}
        onYearChange={(y) => y && setLocalYear(y)}
      />
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const label = canvas.getByText("2025");

    expect(label).toBeInTheDocument();

    await userEvent.keyboard("{Tab}");
    await userEvent.keyboard("{Enter}");

    expect(label.textContent).toBe("2024");

    await userEvent.keyboard("{Tab}");
    await userEvent.keyboard("{Enter}");
    await userEvent.keyboard("{Enter}");
    expect(label.textContent).toBe("2026");
  },
};

/**
 * Validate that the monthpicker handles `dropdownCaption` prop correctly
 */
export const DropdownCaptionView: Story = {
  render: () => {
    const [year, setLocalYear] = React.useState(new Date("2025"));

    return (
      <MonthPicker.Standalone
        dropdownCaption
        fromDate={new Date("Feb 10 2022")}
        toDate={new Date("Sep 27 2028")}
        year={year}
        onYearChange={(y) => y && setLocalYear(y)}
      />
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const dropdown = canvas.getByDisplayValue("2025");

    expect(dropdown).toBeInTheDocument();

    await userEvent.selectOptions(dropdown, "2023");
    expect((dropdown as HTMLSelectElement).value).toBe("2023");

    await userEvent.keyboard("{Tab}");
    await userEvent.keyboard("{Enter}");

    expect((dropdown as HTMLSelectElement).value).toBe("2024");

    await userEvent.selectOptions(dropdown, "2028");

    expect((dropdown as HTMLSelectElement).value).toBe("2028");

    await userEvent.keyboard("{Tab}");
    await userEvent.keyboard("{Enter}");

    expect((dropdown as HTMLSelectElement).value).toBe("2028");

    await userEvent.selectOptions(dropdown, "2022");
    expect((dropdown as HTMLSelectElement).value).toBe("2022");

    await userEvent.tab({ shift: true });
    await userEvent.keyboard("{Enter}");
    expect((dropdown as HTMLSelectElement).value).toBe("2022");
  },
};

/**
 * Validate that the monthpicker handles `dropdownCaption` prop correctly
 */
export const MonthSelect: StoryObj<{
  onMonthSelect: ReturnType<typeof fn>;
}> = {
  args: {
    onMonthSelect: fn(),
  },
  render: (props) => {
    const [year, setLocalYear] = React.useState(new Date("2025"));

    return (
      <MonthPicker.Standalone
        dropdownCaption
        fromDate={new Date("Feb 10 2022")}
        toDate={new Date("Sep 27 2028")}
        year={year}
        onYearChange={(y) => y && setLocalYear(y)}
        {...props}
      />
    );
  },
  play: async ({ canvasElement, args }) => {
    args.onMonthSelect.mockClear();
    const canvas = within(canvasElement);

    const dropdown = canvas.getByDisplayValue("2025");
    expect(dropdown).toBeInTheDocument();

    let febButton = canvas.getByRole("button", {
      name: format(new Date("Feb 01 2025"), "LLLL", { locale: nb }),
    });
    expect(febButton).toBeInTheDocument();

    await userEvent.click(febButton);

    expect(args.onMonthSelect).toBeCalledTimes(1);
    expect(args.onMonthSelect.mock.calls[0][0].toString()).toEqual(
      new Date("Feb 01 2025").toString(),
    );

    await userEvent.selectOptions(dropdown, "2023");

    febButton = canvas.getByRole("button", {
      name: format(new Date("Feb 01 2023"), "LLLL", { locale: nb }),
    });
    expect(febButton).toBeInTheDocument();
    await userEvent.click(febButton);

    expect(args.onMonthSelect).toBeCalledTimes(2);
    expect(args.onMonthSelect.mock.calls[1][0].toString()).toEqual(
      new Date("Feb 01 2023").toString(),
    );

    await userEvent.click(febButton);

    expect(args.onMonthSelect).toBeCalledTimes(3);
    expect(args.onMonthSelect.mock.calls[2][0]).toBeUndefined();
  },
};
