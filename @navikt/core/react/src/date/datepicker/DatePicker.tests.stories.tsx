import { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import { addMonths, format } from "date-fns";
import { nb } from "date-fns/locale";
import React from "react";
import DatePicker from "./DatePicker";
import { useDatepicker } from "./hooks/useDatepicker";

export default {
  title: "ds-react/DatePicker/Tests",
  component: DatePicker,
  parameters: {
    chromatic: { disable: true },
  },
} satisfies Meta<typeof DatePicker>;

type Story = StoryObj<typeof DatePicker>;

/* function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
} */

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

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

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
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await sleep(50);

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

// /**
//  * Validate that the monthpicker shows the previous year when `year`-prop is set to the previous year
//  */
// export const PreviousYearView: Story = {
//   render: () => <MonthPicker.Standalone year={previousYear} />,
//   play: async ({ canvasElement }) => {
//     const canvas = within(canvasElement);
//
//     const label = canvas.getByText(`${previousYear.getFullYear()}`);
//
//     expect(label).toBeInTheDocument();
//
//     const todayButton = canvas.getByRole("button", {
//       name: format(previousYear, "LLLL", { locale: nb }),
//     });
//
//     expect(todayButton.getAttribute("data-current-month")).toBe("false");
//   },
// };
//
// /**
//  * Validate that the monthpicker shows the next year when `year`-prop is set to the next year
//  */
// export const NextYearView: Story = {
//   render: () => <MonthPicker.Standalone year={nextYear} />,
//   play: async ({ canvasElement }) => {
//     const canvas = within(canvasElement);
//
//     const label = canvas.getByText(`${nextYear.getFullYear()}`);
//
//     expect(label).toBeInTheDocument();
//
//     const todayButton = canvas.getByRole("button", {
//       name: format(nextYear, "LLLL", { locale: nb }),
//     });
//
//     expect(todayButton.getAttribute("data-current-month")).toBe("false");
//   },
// };
//
// /**
//  * Validate that the monthpicker shows the previous year when initial `selected` is set to the previous year
//  */
// export const InitialControlledView: Story = {
//   render: () => <MonthPicker.Standalone selected={previousYear} />,
//   play: async ({ canvasElement }) => {
//     const canvas = within(canvasElement);
//
//     const label = canvas.getByText(`${previousYear.getFullYear()}`);
//
//     expect(label).toBeInTheDocument();
//
//     const todayButton = canvas.getByRole("button", {
//       name: format(previousYear, "LLLL", { locale: nb }),
//     });
//
//     expect(todayButton.getAttribute("data-current-month")).toBe("false");
//   },
// };
//
// /**
//  * Validate that the monthpicker shows the previous year when initial `defaultSelected` is set to the previous year
//  */
// export const InitialDefaultControlledView: Story = {
//   render: () => <MonthPicker.Standalone defaultSelected={previousYear} />,
//   play: async ({ canvasElement }) => {
//     const canvas = within(canvasElement);
//
//     const label = canvas.getByText(`${previousYear.getFullYear()}`);
//
//     expect(label).toBeInTheDocument();
//
//     const todayButton = canvas.getByRole("button", {
//       name: format(previousYear, "LLLL", { locale: nb }),
//     });
//
//     expect(todayButton.getAttribute("data-current-month")).toBe("false");
//   },
// };
//
// /**
//  * Validate that the monthpicker handles `disabled` prop correctly
//  */
// export const DisabledMonths: Story = {
//   render: () => (
//     <MonthPicker.Standalone
//       year={new Date("2022")}
//       disabled={[
//         { from: new Date("Feb 1 2022"), to: new Date("May 6 2022") },
//         new Date("Sep 5 2022"),
//       ]}
//     />
//   ),
//   play: async ({ canvasElement }) => {
//     const canvas = within(canvasElement);
//
//     const disabledButtons = [
//       canvas.getByRole("button", {
//         name: format(new Date("Feb 1 2023"), "LLLL", { locale: nb }),
//       }),
//       canvas.getByRole("button", {
//         name: format(new Date("Mar 1 2023"), "LLLL", { locale: nb }),
//       }),
//       canvas.getByRole("button", {
//         name: format(new Date("Apr 1 2023"), "LLLL", { locale: nb }),
//       }),
//       canvas.getByRole("button", {
//         name: format(new Date("May 1 2023"), "LLLL", { locale: nb }),
//       }),
//       canvas.getByRole("button", {
//         name: format(new Date("Sep 1 2023"), "LLLL", { locale: nb }),
//       }),
//     ];
//
//     disabledButtons.forEach((button) => {
//       expect(button).toBeDisabled();
//     });
//   },
// };
//
// /**
//  * Validate that the monthpicker handles `dropdownCaption` prop correctly
//  */
// export const LabelCaptionView: Story = {
//   render: () => {
//     const [year, setLocalYear] = React.useState(new Date("2025"));
//
//     return (
//       <MonthPicker.Standalone
//         fromDate={new Date("Feb 10 2022")}
//         toDate={new Date("Sep 27 2028")}
//         year={year}
//         onYearChange={(y) => y && setLocalYear(y)}
//       />
//     );
//   },
//   play: async ({ canvasElement }) => {
//     const canvas = within(canvasElement);
//
//     const label = canvas.getByText("2025");
//
//     expect(label).toBeInTheDocument();
//
//     await userEvent.keyboard("{Tab}");
//     await userEvent.keyboard("{Enter}");
//
//     expect(label.textContent).toBe("2024");
//
//     await userEvent.keyboard("{Tab}");
//     await userEvent.keyboard("{Enter}");
//     await userEvent.keyboard("{Enter}");
//     expect(label.textContent).toBe("2026");
//   },
// };
//
// /**
//  * Validate that the monthpicker handles `dropdownCaption` prop correctly
//  */
// export const DropdownCaptionView: Story = {
//   render: () => {
//     const [year, setLocalYear] = React.useState(new Date("2025"));
//
//     return (
//       <MonthPicker.Standalone
//         dropdownCaption
//         fromDate={new Date("Feb 10 2022")}
//         toDate={new Date("Sep 27 2028")}
//         year={year}
//         onYearChange={(y) => y && setLocalYear(y)}
//       />
//     );
//   },
//   play: async ({ canvasElement }) => {
//     const canvas = within(canvasElement);
//
//     const dropdown = canvas.getByDisplayValue("2025");
//
//     expect(dropdown).toBeInTheDocument();
//
//     await userEvent.selectOptions(dropdown, "2023");
//     expect((dropdown as HTMLSelectElement).value).toBe("2023");
//
//     await userEvent.keyboard("{Tab}");
//     await userEvent.keyboard("{Enter}");
//
//     expect((dropdown as HTMLSelectElement).value).toBe("2024");
//
//     await userEvent.selectOptions(dropdown, "2028");
//
//     expect((dropdown as HTMLSelectElement).value).toBe("2028");
//
//     await userEvent.keyboard("{Tab}");
//     await userEvent.keyboard("{Enter}");
//
//     expect((dropdown as HTMLSelectElement).value).toBe("2028");
//
//     await userEvent.selectOptions(dropdown, "2022");
//     expect((dropdown as HTMLSelectElement).value).toBe("2022");
//
//     await userEvent.tab({ shift: true });
//     await userEvent.keyboard("{Enter}");
//     expect((dropdown as HTMLSelectElement).value).toBe("2022");
//   },
// };
//
// /**
//  * Validate that the monthpicker handles `dropdownCaption` prop correctly
//  */
// export const MonthSelect: StoryObj<{
//   onMonthSelect: ReturnType<typeof fn>;
// }> = {
//   args: {
//     onMonthSelect: fn(),
//   },
//   render: (props) => {
//     const [year, setLocalYear] = React.useState(new Date("2025"));
//
//     return (
//       <MonthPicker.Standalone
//         dropdownCaption
//         fromDate={new Date("Feb 10 2022")}
//         toDate={new Date("Sep 27 2028")}
//         year={year}
//         onYearChange={(y) => y && setLocalYear(y)}
//         {...props}
//       />
//     );
//   },
//   play: async ({ canvasElement, args }) => {
//     args.onMonthSelect.mockClear();
//     const canvas = within(canvasElement);
//
//     const dropdown = canvas.getByDisplayValue("2025");
//     expect(dropdown).toBeInTheDocument();
//
//     let febButton = canvas.getByRole("button", {
//       name: format(new Date("Feb 01 2025"), "LLLL", { locale: nb }),
//     });
//     expect(febButton).toBeInTheDocument();
//
//     await userEvent.click(febButton);
//
//     expect(args.onMonthSelect).toBeCalledTimes(1);
//     expect(args.onMonthSelect.mock.calls[0][0].toString()).toEqual(
//       new Date("Feb 01 2025").toString(),
//     );
//
//     await userEvent.selectOptions(dropdown, "2023");
//
//     febButton = canvas.getByRole("button", {
//       name: format(new Date("Feb 01 2023"), "LLLL", { locale: nb }),
//     });
//     expect(febButton).toBeInTheDocument();
//     await userEvent.click(febButton);
//
//     expect(args.onMonthSelect).toBeCalledTimes(2);
//     expect(args.onMonthSelect.mock.calls[1][0].toString()).toEqual(
//       new Date("Feb 01 2023").toString(),
//     );
//
//     await userEvent.click(febButton);
//
//     expect(args.onMonthSelect).toBeCalledTimes(3);
//     expect(args.onMonthSelect.mock.calls[2][0]).toBeUndefined();
//   },
// };
//
