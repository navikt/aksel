import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Table,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useState } from "react";
import { expect, userEvent, within } from "storybook/test";
import { DataTable } from "../table";
import { DataTableProfiler } from "./DataTableProfiler";
import { PersonInfo, columns, sampleData } from "./dummy-data";

const meta: Meta<typeof DataTable> = {
  title: "ds-react/Data/Keyboard Navigation",
  component: DataTable,
  parameters: {
    chromatic: { disable: true },
    layout: "padded",
  },
  decorators: [(Story) => <DataTableProfiler>{Story()}</DataTableProfiler>],
};

export default meta;

type Story = StoryObj<typeof DataTable>;

export const TanstackDemo: Story = {
  render: () => {
    const table = useReactTable({
      columns,
      data: sampleData,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      globalFilterFn: "includesString",
      getPaginationRowModel: getPaginationRowModel(),
      initialState: {
        pagination: {
          pageIndex: 1,
          pageSize: 5,
        },
      },
      state: {},
      columnResizeMode: "onChange",
    });

    const columnSizeVars = () => {
      const headers = table.getFlatHeaders();
      const colSizes: { [key: string]: `${number}px` } = {};
      for (let i = 0; i < headers.length; i++) {
        const header = headers[i];
        colSizes[`--header-${header.id}-size`] = `${header.getSize()}px`;
        colSizes[`--col-${header.column.id}-size`] =
          `${header.column.getSize()}px`;
      }
      return colSizes;
    };

    return (
      <div style={{ padding: "4rem", display: "grid", gap: "2rem" }}>
        <button>Focuable before</button>
        <DataTable withKeyboardNav style={columnSizeVars()}>
          <DataTable.Thead>
            {table.getHeaderGroups().map((headerGroup) => {
              return (
                <DataTable.Tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <DataTable.Th
                        key={header.id}
                        style={{ width: `var(--header-${header.id}-size)` }}
                        resizeHandler={header.getResizeHandler()}
                        sortDirection={header.column.getIsSorted() || "none"}
                        onSortChange={(_, event) => {
                          const handler =
                            header.column.getToggleSortingHandler();
                          handler?.(event);
                        }}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </DataTable.Th>
                    );
                  })}
                </DataTable.Tr>
              );
            })}
          </DataTable.Thead>

          <MemoizedTableBody table={table} />
        </DataTable>
        <button>Focuable after</button>
      </div>
    );
  },
};

export const Spans: Story = {
  render: () => (
    <div style={{ padding: "4rem", display: "grid", gap: "2rem" }}>
      <DataTable style={{ width: "100%" }} withKeyboardNav>
        <DataTable.Thead>
          <DataTable.Tr>
            <DataTable.Th colSpan={2}>Group A</DataTable.Th>
            <DataTable.Th colSpan={2}>Group B</DataTable.Th>
          </DataTable.Tr>
          <DataTable.Tr>
            <DataTable.Th>Col 1</DataTable.Th>
            <DataTable.Th>Col 2</DataTable.Th>
            <DataTable.Th>Col 3</DataTable.Th>
            <DataTable.Th>Col 4</DataTable.Th>
          </DataTable.Tr>
        </DataTable.Thead>
        <DataTable.Tbody>
          <DataTable.Tr>
            <DataTable.Td rowSpan={2}>Rowspan 2-1</DataTable.Td>
            <DataTable.Td>R1C2</DataTable.Td>
            <DataTable.Td colSpan={2}>Colspan 2-1</DataTable.Td>
          </DataTable.Tr>
          <DataTable.Tr>
            <DataTable.Td>R2C2</DataTable.Td>
            <DataTable.Td>R2C3</DataTable.Td>
            <DataTable.Td>R2C4</DataTable.Td>
          </DataTable.Tr>
          <DataTable.Tr>
            <DataTable.Td>R3C1</DataTable.Td>
            <DataTable.Td colSpan={2}>Colspan 2-2</DataTable.Td>
            <DataTable.Td>R3C4</DataTable.Td>
          </DataTable.Tr>
          <DataTable.Tr>
            <DataTable.Td rowSpan={2}>Rowspan 2-2</DataTable.Td>
            <DataTable.Td>R4C2</DataTable.Td>
            <DataTable.Td>R4C3</DataTable.Td>
            <DataTable.Td>R4C4</DataTable.Td>
          </DataTable.Tr>
          <DataTable.Tr>
            <DataTable.Td colSpan={3}>Colspan 3</DataTable.Td>
          </DataTable.Tr>
        </DataTable.Tbody>
      </DataTable>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const { expectNodeFocus, right, left, down, up } = keyboardUtils();

    const step = async (action: () => Promise<any>, text: string) => {
      await action();
      expectNodeFocus(text);
    };

    const table = canvas.getByRole("table");
    expect(table).toBeInTheDocument();

    table.focus();

    expectNodeFocus("Group A");
    await step(right, "Group B");
    await step(down, "Col 3");
    await step(up, "Group B");
    await down();
    await step(right, "Col 4");
    await left();
    await step(left, "Col 2");
    await step(down, "R1C2");
    await step(down, "R2C2");
    await step(right, "R2C3");
    await step(down, "Colspan 2-2");
    await step(up, "R2C2");
    await step(down, "Colspan 2-2");
    await step(left, "R3C1");
    await step(up, "Rowspan 2-1");
    await step(right, "R1C2");
    await left();
    await down();
    await step(down, "Rowspan 2-2");
    await step(right, "R4C2");
    await step(right, "R4C3");
    await step(right, "R4C4");
    await step(down, "Colspan 3");
    await step(left, "Rowspan 2-2");
    await step(right, "R4C2");
  },
};

export const Inputs: Story = {
  render: () => (
    <div style={{ padding: "4rem", display: "grid", gap: "2rem" }}>
      <DataTable style={{ width: "100%" }} withKeyboardNav>
        <DataTable.Thead>
          <DataTable.Tr>
            <DataTable.Th>Col 1</DataTable.Th>
            <DataTable.Th>Col 2</DataTable.Th>
            <DataTable.Th>Col 3</DataTable.Th>
            <DataTable.Th>Col 4</DataTable.Th>
          </DataTable.Tr>
        </DataTable.Thead>
        <DataTable.Tbody>
          <DataTable.Tr>
            <DataTable.Td>
              <input type="checkbox" data-testid="checkbox-1" />
            </DataTable.Td>
            <DataTable.Td>
              <input
                type="text"
                placeholder="Col 2"
                data-testid="input-col-2"
              />
            </DataTable.Td>
            <DataTable.Td>Col 3</DataTable.Td>
            <DataTable.Td>Col 4</DataTable.Td>
          </DataTable.Tr>
          <DataTable.Tr>
            <DataTable.Td>
              <input type="checkbox" />
            </DataTable.Td>
            <DataTable.Td>
              <input
                type="text"
                placeholder="Col 2"
                defaultValue="Test"
                data-testid="input-2"
              />
            </DataTable.Td>
            <DataTable.Td>
              <select data-testid="select">
                <option value="">Select</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
              </select>
            </DataTable.Td>
            <DataTable.Td>Col 4</DataTable.Td>
          </DataTable.Tr>
          <DataTable.Tr>
            <DataTable.Td>
              <input type="checkbox" />
            </DataTable.Td>
            <DataTable.Td>
              <textarea placeholder="Col 2" data-testid="textarea-col-2" />
            </DataTable.Td>
            <DataTable.Td>Col 3</DataTable.Td>
            <DataTable.Td>Col 4</DataTable.Td>
          </DataTable.Tr>
        </DataTable.Tbody>
      </DataTable>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const { expectNodeFocus, right, left, down, up } = keyboardUtils();

    const table = canvas.getByRole("table");
    expect(table).toBeInTheDocument();

    table.focus();

    await right();
    await down();
    await left();
    expect(canvas.getByTestId("checkbox-1")).toHaveFocus();
    await right();
    expect(canvas.getByTestId("input-col-2")).toHaveFocus();
    await right();
    expectNodeFocus("Col 3");

    await userEvent.type(canvas.getByTestId("input-col-2"), "Hello");
    await right();
    expectNodeFocus("Col 3");
    await left();

    /* Avoid navigating away from input when "walking" the caret trough text */
    await left();
    await left();
    await left();
    await left();
    await left();
    expect(canvas.getByTestId("input-col-2")).toHaveFocus();
    await left();
    expect(canvas.getByTestId("checkbox-1")).toHaveFocus();

    await down();
    await right();
    await right();
    expect(canvas.getByTestId("select")).toHaveFocus();
    await down();
    expect(canvas.getByTestId("select")).toHaveFocus();
    await up();
    expect(canvas.getByTestId("select")).toHaveFocus();
    await right();
    expectNodeFocus("Col 4");

    await userEvent.type(canvas.getByTestId("textarea-col-2"), "Hello\nline");
    await left();
    await left();
    await left();
    await left();
    await left();
    expect(canvas.getByTestId("textarea-col-2")).toHaveFocus();
    await down();
    expect(canvas.getByTestId("textarea-col-2")).toHaveFocus();
    await left();
    await left();
    await left();
    await left();
    await left();
    await up();
    expect(canvas.getByTestId("input-2")).toHaveFocus();
  },
};

export const DisabledCells: Story = {
  render: () => (
    <div style={{ padding: "4rem", display: "grid", gap: "2rem" }}>
      <DataTable style={{ width: "100%" }} withKeyboardNav>
        <DataTable.Thead>
          <DataTable.Tr>
            <DataTable.Th>Col 1</DataTable.Th>
            <DataTable.Th>Col 2</DataTable.Th>
            <DataTable.Th>Col 3</DataTable.Th>
            <DataTable.Th>Col 4</DataTable.Th>
          </DataTable.Tr>
        </DataTable.Thead>
        <DataTable.Tbody>
          <DataTable.Tr>
            <DataTable.Td>Hidden 1</DataTable.Td>
            <DataTable.Td>Hidden 2</DataTable.Td>
            <DataTable.Td style={{ display: "none" }}>Hidden 3</DataTable.Td>
            <DataTable.Td style={{ visibility: "hidden" }}>
              Hidden 4
            </DataTable.Td>
          </DataTable.Tr>
          <DataTable.Tr>
            <DataTable.Td>
              <button disabled>Disabled button</button>
            </DataTable.Td>
            <DataTable.Td data-testid="disabled-input">
              <input type="text" disabled defaultValue="Disabled input" />
            </DataTable.Td>
            <DataTable.Td data-testid="disabled-select">
              <select disabled>
                <option>Disabled select</option>
              </select>
            </DataTable.Td>
            <DataTable.Td data-testid="disabled-textarea">
              <textarea disabled defaultValue="Disabled textarea" />
            </DataTable.Td>
          </DataTable.Tr>
          <DataTable.Tr>
            <DataTable.Td>
              <button aria-disabled="true">Aria-Disabled button</button>
            </DataTable.Td>
            <DataTable.Td>Aria Disabled 2</DataTable.Td>
            <DataTable.Td>Aria Disabled 3</DataTable.Td>
            <DataTable.Td>Aria Disabled 4</DataTable.Td>
          </DataTable.Tr>
          <DataTable.Tr>
            <DataTable.Td>Normal 1</DataTable.Td>
            <DataTable.Td style={{ visibility: "hidden" }}>
              <button disabled>Disabled button</button>
            </DataTable.Td>
            <DataTable.Td>Normal 3</DataTable.Td>
            <DataTable.Td>Normal 4</DataTable.Td>
          </DataTable.Tr>
        </DataTable.Tbody>
      </DataTable>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const { expectNodeFocus, expectCellFocus, right, left, down } =
      keyboardUtils();

    const step = async (action: () => Promise<any>, text: string) => {
      await action();
      expectNodeFocus(text);
    };

    const stepCell = async (action: () => Promise<any>, text: string) => {
      await action();
      expectCellFocus(text);
    };

    const table = canvas.getByRole("table");
    expect(table).toBeInTheDocument();

    table.focus();
    expectNodeFocus("Col 1");
    await step(right, "Col 2");
    await step(left, "Col 1");
    await step(down, "Hidden 1");
    await step(right, "Hidden 2");
    await step(right, "Hidden 2");

    await left();
    await stepCell(down, "Disabled button");
    await right();
    expect(canvas.getByTestId("disabled-input")).toHaveFocus();
    await right();
    expect(canvas.getByTestId("disabled-select")).toHaveFocus();
    await right();
    expect(canvas.getByTestId("disabled-textarea")).toHaveFocus();
    await left();
    expect(canvas.getByTestId("disabled-select")).toHaveFocus();
    await left();
    expect(canvas.getByTestId("disabled-input")).toHaveFocus();
    await left();
    expectCellFocus("Disabled button");
    await stepCell(down, "Aria-Disabled button");
    await step(right, "Aria Disabled 2");
    await step(right, "Aria Disabled 3");
    await step(right, "Aria Disabled 4");
  },
};

export const Cache: Story = {
  render: () => {
    const [showThatSingleRow, setShowThatSingleRow] = useState(true);

    return (
      <div style={{ padding: "4rem", display: "grid", gap: "2rem" }}>
        <button onClick={() => setShowThatSingleRow((s) => !s)}>
          Toggle single row: {showThatSingleRow ? "ON" : "OFF"}
        </button>
        <DataTable style={{ width: "100%" }} withKeyboardNav>
          <DataTable.Thead>
            <DataTable.Tr>
              <DataTable.Th>Col 1</DataTable.Th>
              <DataTable.Th>Col 2</DataTable.Th>
              <DataTable.Th>Col 3</DataTable.Th>
              <DataTable.Th>Col 4</DataTable.Th>
            </DataTable.Tr>
          </DataTable.Thead>
          <DataTable.Tbody>
            <DataTable.Tr>
              <DataTable.Td>Col 1</DataTable.Td>
              <DataTable.Td>Col 2</DataTable.Td>
              <DataTable.Td>
                <input type="checkbox" />
              </DataTable.Td>
              <DataTable.Td>Col 4</DataTable.Td>
            </DataTable.Tr>
            {showThatSingleRow && (
              <DataTable.Tr>
                <DataTable.Td>Custom row</DataTable.Td>
                <DataTable.Td>Col 2</DataTable.Td>
                <DataTable.Td>Col 3</DataTable.Td>
                <DataTable.Td>Col 4</DataTable.Td>
              </DataTable.Tr>
            )}

            <DataTable.Tr>
              <DataTable.Td>Col 1</DataTable.Td>
              <DataTable.Td>Col 2</DataTable.Td>
              <DataTable.Td>Col 3</DataTable.Td>
              <DataTable.Td>Col 4</DataTable.Td>
            </DataTable.Tr>
          </DataTable.Tbody>
        </DataTable>
      </div>
    );
  },
};

export const FocusElementInsideTable: Story = {
  render: () => {
    return (
      <div style={{ padding: "4rem", display: "grid", gap: "2rem" }}>
        <DataTable style={{ width: "100%" }} withKeyboardNav>
          <DataTable.Thead>
            <DataTable.Tr>
              <DataTable.Th>Col 1</DataTable.Th>
              <DataTable.Th>Col 2</DataTable.Th>
              <DataTable.Th>Col 3</DataTable.Th>
              <DataTable.Th>Col 4</DataTable.Th>
            </DataTable.Tr>
          </DataTable.Thead>
          <DataTable.Tbody>
            <DataTable.Tr>
              <DataTable.Td>Col 1</DataTable.Td>
              <DataTable.Td>
                <button>Focusable button</button>
              </DataTable.Td>
              <DataTable.Th>Col 3</DataTable.Th>
              <DataTable.Td>Col 4</DataTable.Td>
            </DataTable.Tr>

            <DataTable.Tr>
              <DataTable.Td>Col 1</DataTable.Td>
              <DataTable.Td>Col 2</DataTable.Td>
              <DataTable.Td>Col 3</DataTable.Td>
              <DataTable.Td>Col 4</DataTable.Td>
            </DataTable.Tr>
          </DataTable.Tbody>
        </DataTable>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const button = canvas.getByText("Focusable button");
    await userEvent.click(button);
    expect(button).toHaveFocus();

    const { expectNodeFocus, expectCellFocus, right, left, down } =
      keyboardUtils();

    await right();
    expectNodeFocus("Col 3");
    await left();
    expect(button).toHaveFocus();
    await down();
    expectCellFocus("Col 2");
  },
};

const TableBody = ({ table }: { table: Table<PersonInfo> }) => (
  <DataTable.Tbody>
    {table.getRowModel().rows.map((row) => {
      return (
        <DataTable.Tr key={row.id}>
          {row.getVisibleCells().map((cell) => {
            return (
              <DataTable.Td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </DataTable.Td>
            );
          })}
        </DataTable.Tr>
      );
    })}
  </DataTable.Tbody>
);

const MemoizedTableBody = React.memo(
  TableBody,
  (_prev, next) => !!next.table.getState().columnSizingInfo.isResizingColumn,
) as typeof TableBody;

function keyboardUtils() {
  return {
    expectNodeFocus(text: string) {
      const focusedElement = document.activeElement;
      const cell = focusedElement?.closest("th, td");
      expect(cell).toHaveFocus();
      expect(cell?.textContent).toContain(text);
    },
    expectCellFocus(text: string) {
      const focusedElement = document.activeElement;
      expect(focusedElement?.textContent).toContain(text);
      expect(focusedElement?.tagName).toMatch(/td|th/i);
    },
    down() {
      return userEvent.keyboard("{ArrowDown}");
    },
    up() {
      return userEvent.keyboard("{ArrowUp}");
    },
    left() {
      return userEvent.keyboard("{ArrowLeft}");
    },
    right() {
      return userEvent.keyboard("{ArrowRight}");
    },
  };
}
