import { Meta, StoryObj } from "@storybook/react-vite";
import { addMonths, format } from "date-fns";
import { nb } from "date-fns/locale";
import React from "react";
import { expect, userEvent, within } from "storybook/test";
import { HStack } from "../../layout/stack";
import DatePicker from "./DatePicker";
import { useDatepicker } from "./hooks/useDatepicker";
import { useRangeDatepicker } from "./hooks/useRangeDatepicker";

export default {
  title: "ds-react/DatePicker/Tests",
  component: DatePicker,
  parameters: {
    chromatic: { disable: true },
  },
  /* TODO: Temp disabled CI-tests */
  tags: ["!play-fn", "skip-test"],
} satisfies Meta<typeof DatePicker>;

type Story = StoryObj<typeof DatePicker>;

const currentDate = new Date();
const previousMonth = addMonths(currentDate, -1);
const nextMonth = addMonths(currentDate, 1);

/**
 * Validate that the monthpicker shows the current year by default
 * and that the navigation buttons work as expected
 */
export const LabelCaptionNavigation: Story = {
  render: () => <DatePicker.Standalone />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const label = canvas.getByText(
      format(currentDate, "LLLL y", { locale: nb }),
    );

    expect(label).toBeInTheDocument();

    const todayButton = canvas.getByRole("button", {
      name: format(currentDate, "cccc d", {
        locale: nb,
      }),
    });

    expect(todayButton.getAttribute("data-today")).toBe("true");

    await userEvent.tab();
    await userEvent.keyboard("{Enter}");

    expect(
      canvas.getByText(format(previousMonth, "LLLL y", { locale: nb })),
    ).toBeInTheDocument();

    await userEvent.tab();
    await userEvent.keyboard("{Enter}");
    await userEvent.keyboard("{Enter}");

    expect(
      canvas.getByText(format(nextMonth, "LLLL y", { locale: nb })),
    ).toBeInTheDocument();
  },
};

/**
 * Validate that the monthpicker shows the current year by default
 * and that the navigation selects work as expected
 */
export const DropdownCaptionNavigation: Story = {
  render: () => (
    <DatePicker.Standalone
      dropdownCaption
      fromDate={new Date("05 May 2021")}
      toDate={new Date("05 Apr 2029")}
      defaultMonth={new Date("03 Jan 2025")}
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    let dropdown = canvas.getByDisplayValue("2025");

    await userEvent.selectOptions(dropdown, "2021");

    expect(
      canvas.getByRole("button", {
        name: format(new Date("04 May 2021"), "cccc d", { locale: nb }),
      }),
    ).toBeDisabled();

    dropdown = canvas.getByDisplayValue("2021");

    await userEvent.selectOptions(dropdown, "2029");

    expect(
      canvas.getByRole("button", {
        name: format(new Date("06 Apr 2029"), "cccc d", { locale: nb }),
      }),
    ).toBeDisabled();
  },
};

export const Required: Story = {
  render: () => {
    const { datepickerProps } = useDatepicker({
      defaultSelected: new Date("Apr 10 2024"),
      required: true,
    });

    return (
      <div style={{ height: "20rem" }}>
        <DatePicker.Standalone {...datepickerProps} />
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const button10 = canvas.getByRole("button", { pressed: true });

    await userEvent.click(button10);

    expect(button10.ariaPressed).toBe("true");

    const button17 = canvas.getByText("17").closest("button");

    expect(button17?.ariaPressed).toBe("false");

    if (button17) {
      await userEvent.click(button17);
    }

    expect(canvas.getByText("17").closest("button")?.ariaPressed).toBe("true");
    expect(canvas.getByText("10").closest("button")?.ariaPressed).toBe("false");
  },
};

export const DomStructure: Story = {
  render: () => (
    <DatePicker.Standalone
      data-testid="date-table"
      selected={new Date("3 Jan 2025")}
      defaultMonth={new Date("03 Jan 2025")}
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const picker = canvas.getByTestId("date-table");

    expect(picker.className).toEqual("rdp navds-date");

    const months = picker.firstChild;
    expect(months).toBeInTheDocument();

    if (months) {
      expect(
        (months as HTMLDivElement).className.startsWith("rdp-months"),
      ).toBeTruthy();
      expect(months.nodeName).toBe("DIV");
    }

    const month = months?.firstChild;
    expect(month).toBeInTheDocument();

    if (month) {
      expect(
        (month as HTMLDivElement).className.startsWith("rdp-month"),
      ).toBeTruthy();
      expect(month.nodeName).toBe("DIV");
    }

    const table = month?.lastChild;
    expect(table).toBeInTheDocument();

    if (table) {
      const typedTable = table as HTMLTableElement;
      expect(typedTable.className.startsWith("rdp-table")).toBeTruthy();
      expect((table as HTMLTableElement).nodeName).toBe("TABLE");

      expect(typedTable.role).toEqual("grid");
    }

    const tHead = table?.firstChild;
    expect(tHead).toBeInTheDocument();

    if (tHead) {
      expect(tHead.nodeName).toBe("THEAD");
      expect((tHead as HTMLElement).className).toEqual("rdp-head");
      expect((tHead as HTMLElement).ariaHidden).toBe("true");
    }

    const tBody = table?.lastChild;
    expect(tBody).toBeInTheDocument();

    if (tBody) {
      expect(tBody.nodeName).toBe("TBODY");
      expect((tBody as HTMLElement).className).toEqual("rdp-tbody");
    }

    const row = tBody?.firstChild;
    expect(row).toBeInTheDocument();

    if (row) {
      expect(row.nodeName).toBe("TR");
      expect((row as HTMLElement).className).toEqual("rdp-row");
    }

    const cells = row?.childNodes;

    /**
     * Since default selected date is 3 Jan 2025:
     * - node 0 and 1 is "invisible"
     * - node 2 and 3 is unselected
     * - node 4 is selected
     * - node 5 and 6 is unselected
     */
    if (cells) {
      expect(cells.length).toBe(7);

      cells.forEach((cell, index) => {
        expect(cell.nodeName).toBe("TD");
        expect((cell as HTMLElement).className).toEqual("rdp-cell");

        const button = cell.firstChild;

        expect(button).toBeInTheDocument();

        if (button) {
          const typedButton = button as HTMLButtonElement;
          expect(button.nodeName).toBe("BUTTON");
          expect(typedButton.type).toBe("button");
          expect(typedButton.classList.contains("rdp-button")).toBeTruthy();
          expect(typedButton.ariaLabel).toBeTruthy();

          if (index <= 1) {
            expect(typedButton.ariaHidden).toBe("true");
          }

          if (index !== 4) {
            expect(typedButton.ariaPressed).toBe("false");
            expect(typedButton.tabIndex).toBe(-1);
          } else {
            expect(
              typedButton.classList.contains("rdp-day_selected"),
            ).toBeTruthy();
            expect(typedButton.ariaPressed).toBe("true");
            expect(typedButton.tabIndex).toBe(0);
          }
        }
      });
    }
  },
};

const oldDate = new Date("Oct 23 2022");

export const HookDefaultMonth: Story = {
  render: () => {
    const { datepickerProps, inputProps } = useDatepicker({
      fromDate: new Date("Aug 23 2019"),
      defaultMonth: oldDate,
    });

    return (
      <div style={{ display: "flex", gap: "1rem" }}>
        <DatePicker {...datepickerProps}>
          <DatePicker.Input {...inputProps} label="Velg dato" />
        </DatePicker>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const button = canvas.getByLabelText("Åpne datovelger");

    expect(button).toBeInTheDocument();

    await userEvent.click(button);
    const dialog = canvas.getByRole("dialog");

    expect(dialog).toBeVisible();
    expect(dialog.ariaHidden).toBe("false");

    const label = within(dialog).getByText(
      format(oldDate, "LLLL y", { locale: nb }),
      {},
    );

    expect(label).toBeInTheDocument();
  },
};

export const HookDefaultMonthWhenSelected: Story = {
  render: () => {
    const { datepickerProps, inputProps } = useDatepicker({
      fromDate: new Date("Aug 23 2019"),

      defaultSelected: oldDate,
    });

    return (
      <div style={{ display: "flex", gap: "1rem" }}>
        <DatePicker {...datepickerProps}>
          <DatePicker.Input {...inputProps} label="Velg dato" />
        </DatePicker>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const button = canvas.getByLabelText("Åpne datovelger");

    expect(button).toBeInTheDocument();

    await userEvent.click(button);
    const dialog = canvas.getByRole("dialog");

    expect(dialog).toBeVisible();
    expect(dialog.ariaHidden).toBe("false");

    const label = within(dialog).getByText(
      format(oldDate, "LLLL y", { locale: nb }),
      {},
    );

    expect(label).toBeInTheDocument();

    const selectedButton = within(dialog).getByRole("button", {
      pressed: true,
    });

    expect(selectedButton.ariaLabel).toEqual("søndag 23");
  },
};

const RangedDatepicker = () => {
  const { datepickerProps, fromInputProps, toInputProps } =
    useRangeDatepicker();

  return (
    <div style={{ display: "flex", gap: "1rem" }}>
      <DatePicker {...datepickerProps} open>
        <div style={{ display: "flex", gap: "1rem" }}>
          <DatePicker.Input {...fromInputProps} label="Fra" />
          <DatePicker.Input {...toInputProps} label="Til" />
        </div>
      </DatePicker>
    </div>
  );
};

export const RangeHookCanSelectWithOnlyFrom: Story = {
  render: () => <RangedDatepicker />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const fromInput = canvas.getByLabelText("Fra");

    await userEvent.type(fromInput, "23.10.2022");

    const beforeButton = within(canvas.getByRole("dialog")).getByLabelText(
      "onsdag 19",
    );
    expect(beforeButton).toBeInTheDocument();

    await userEvent.click(beforeButton);
    expect(beforeButton.ariaPressed).toBe("true");

    const toInput = canvas.getByLabelText("Til");
    expect(fromInput).toHaveValue("19.10.2022");
    expect(toInput).toHaveValue("23.10.2022");
  },
};

export const RangeHookCanSelectBeforeWithOnlyTo: Story = {
  render: () => <RangedDatepicker />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const fromInput = canvas.getByLabelText("Fra");
    const toInput = canvas.getByLabelText("Til");

    await userEvent.type(toInput, "23.10.2022");

    const beforeButton = within(canvas.getByRole("dialog")).getByLabelText(
      "onsdag 19",
    );
    expect(beforeButton).toBeInTheDocument();

    await userEvent.click(beforeButton);
    expect(beforeButton.ariaPressed).toBe("true");

    expect(fromInput).toHaveValue("19.10.2022");
    expect(toInput).toHaveValue("23.10.2022");
  },
};

export const RangeHookCanSelectAfterWithOnlyTo: Story = {
  render: () => <RangedDatepicker />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const fromInput = canvas.getByLabelText("Fra");
    const toInput = canvas.getByLabelText("Til");

    await userEvent.type(toInput, "23.10.2022");

    const beforeButton = within(canvas.getByRole("dialog")).getByLabelText(
      "onsdag 26",
    );
    expect(beforeButton).toBeInTheDocument();

    await userEvent.click(beforeButton);
    expect(beforeButton.ariaPressed).toBe("true");

    expect(fromInput).toHaveValue("23.10.2022");
    expect(toInput).toHaveValue("26.10.2022");
  },
};

export const RangeHookResetsOnSameDayClick: Story = {
  render: () => <RangedDatepicker />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const fromInput = canvas.getByLabelText("Fra");
    const toInput = canvas.getByLabelText("Til");

    await userEvent.type(toInput, "23.10.2022");

    const beforeButton = within(canvas.getByRole("dialog")).getByLabelText(
      "søndag 23",
    );
    expect(beforeButton).toBeInTheDocument();

    await userEvent.click(beforeButton);
    expect(beforeButton.ariaPressed).toBe("false");

    expect(fromInput).toHaveValue("");
    expect(toInput).toHaveValue("");
  },
};

const fallbackToFromDate = new Date("Aug 23 2019");

export const HookFallbackToFromDate: Story = {
  render: () => {
    const { datepickerProps, inputProps } = useDatepicker({
      fromDate: fallbackToFromDate,
      onDateChange: console.log,
      defaultMonth: new Date("Oct 23 2010"),
    });

    return (
      <div style={{ display: "flex", gap: "1rem" }}>
        <DatePicker {...datepickerProps}>
          <DatePicker.Input {...inputProps} label="Velg dato" />
        </DatePicker>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const button = canvas.getByLabelText("Åpne datovelger");

    expect(button).toBeInTheDocument();

    await userEvent.click(button);
    const dialog = canvas.getByRole("dialog");

    expect(dialog).toBeVisible();
    expect(dialog.ariaHidden).toBe("false");

    const label = within(dialog).getByText(
      format(fallbackToFromDate, "LLLL y", { locale: nb }),
      {},
    );

    expect(label).toBeInTheDocument();
  },
};

const fallbackToToDate = new Date("Aug 23 2028");

export const HookFallbackToDate: Story = {
  render: () => {
    const { datepickerProps, inputProps } = useDatepicker({
      toDate: fallbackToToDate,
      onDateChange: console.log,
      defaultMonth: new Date("Oct 23 2030"),
    });

    return (
      <div style={{ display: "flex", gap: "1rem" }}>
        <DatePicker {...datepickerProps}>
          <DatePicker.Input {...inputProps} label="Velg dato" />
        </DatePicker>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const button = canvas.getByLabelText("Åpne datovelger");

    expect(button).toBeInTheDocument();

    await userEvent.click(button);
    const dialog = canvas.getByRole("dialog");

    expect(dialog).toBeVisible();
    expect(dialog.ariaHidden).toBe("false");

    const label = within(dialog).getByText(
      format(fallbackToToDate, "LLLL y", { locale: nb }),
      {},
    );

    expect(label).toBeInTheDocument();
  },
};

export const SelectSameRangedDate: Story = {
  render: () => {
    const { datepickerProps, toInputProps, fromInputProps } =
      useRangeDatepicker({
        defaultSelected: {
          from: new Date("Aug 23 2025"),
        },
      });

    return (
      <DatePicker {...datepickerProps}>
        <HStack wrap gap="space-16" justify="center">
          <DatePicker.Input {...fromInputProps} label="Fra" />
          <DatePicker.Input {...toInputProps} label="Til" />
        </HStack>
      </DatePicker>
    );
  },

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const fromInput = canvas.getByLabelText("Fra");
    const toInput = canvas.getByLabelText("Til");

    expect(fromInput).toHaveValue("23.08.2025");
    expect(toInput).toHaveValue("");

    await userEvent.click(fromInput);
    await userEvent.tab();
    await userEvent.keyboard("{Enter}");

    const currentSelected = within(canvas.getByRole("dialog")).getByLabelText(
      "lørdag 23",
    );

    expect(currentSelected).toBeInTheDocument();
    expect(currentSelected.ariaPressed).toBe("true");

    await userEvent.click(currentSelected);

    expect(fromInput).toHaveValue("23.08.2025");
    expect(toInput).toHaveValue("23.08.2025");
  },
};
