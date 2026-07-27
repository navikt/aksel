import type { Meta, StoryObj } from "@storybook/react-vite";
import React, { useState } from "react";
import { expect, userEvent, within } from "storybook/test";
import { DataGrid } from "../../data-grid";
import type { ColumnDefinitions } from "../table/root/DataGridTable.types";
import { DataGridTable } from "../table/root/DataGridTableRoot";

const meta: Meta<typeof DataGridTable> = {
  title: "ds-react/Data/Keyboard Navigation",
  component: DataGridTable,
  parameters: {
    chromatic: { disable: true },
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj<typeof DataGridTable>;

type InputRow = { id: 1 | 2 | 3 };

const inputsData: InputRow[] = [{ id: 1 }, { id: 2 }, { id: 3 }];

const inputsColumnDef: ColumnDefinitions<InputRow> = [
  {
    id: "col1",
    header: "Col 1",
    bodyCell: ({ id }) =>
      id === 1 ? (
        <input type="checkbox" data-testid="checkbox-1" />
      ) : (
        <input type="checkbox" />
      ),
  },
  {
    id: "col2",
    header: "Col 2",
    bodyCell: ({ id }) => {
      if (id === 1)
        return (
          <input type="text" placeholder="Col 2" data-testid="input-col-2" />
        );
      if (id === 2)
        return (
          <input
            type="text"
            placeholder="Col 2"
            defaultValue="Test"
            data-testid="input-2"
          />
        );
      return <textarea placeholder="Col 2" data-testid="textarea-col-2" />;
    },
  },
  {
    id: "col3",
    header: "Col 3",
    bodyCell: ({ id }) =>
      id === 2 ? (
        <select data-testid="select">
          <option value="">Select</option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
        </select>
      ) : (
        "Col 3"
      ),
  },
  {
    id: "col4",
    header: "Col 4",
    bodyCell: () => "Col 4",
  },
];

export const Inputs: Story = {
  render: () => (
    <DataGrid
      columns={inputsColumnDef}
      data={inputsData}
      getRowId={(row) => row.id.toString()}
    >
      <DataGrid.Table style={{ width: "100%" }} layout="auto" />
    </DataGrid>
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

type DisabledRow = { id: 1 | 2 | 3 };

const disabledData: DisabledRow[] = [{ id: 1 }, { id: 2 }, { id: 3 }];

const disabledColumnDef: ColumnDefinitions<DisabledRow> = [
  {
    id: "col1",
    header: "Col 1",
    bodyCell: ({ id }) => {
      if (id === 2)
        return (
          <button type="button" disabled>
            Disabled button
          </button>
        );
      if (id === 3)
        return (
          <button type="button" aria-disabled="true">
            Aria-Disabled button
          </button>
        );
      return "Row 1 Col 1";
    },
  },
  {
    id: "col2",
    header: "Col 2",
    bodyCell: ({ id }) => {
      if (id === 2)
        return (
          <input
            type="text"
            disabled
            defaultValue="Disabled input"
            data-testid="disabled-input"
          />
        );
      if (id === 3) return "Aria Disabled 2";
      return "Row 1 Col 2";
    },
  },
  {
    id: "col3",
    header: "Col 3",
    bodyCell: ({ id }) => {
      if (id === 2)
        return (
          <select disabled data-testid="disabled-select">
            <option>Disabled select</option>
          </select>
        );
      if (id === 3) return "Aria Disabled 3";
      return "Row 1 Col 3";
    },
  },
  {
    id: "col4",
    header: "Col 4",
    bodyCell: ({ id }) => {
      if (id === 2)
        return (
          <textarea
            disabled
            defaultValue="Disabled textarea"
            data-testid="disabled-textarea"
          />
        );
      if (id === 3) return "Aria Disabled 4";
      return "Row 1 Col 4";
    },
  },
];

export const DisabledCells: Story = {
  render: () => (
    <DataGrid
      columns={disabledColumnDef}
      data={disabledData}
      getRowId={(row) => row.id.toString()}
    >
      <DataGrid.Table layout="auto" />
    </DataGrid>
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
    await step(down, "Row 1 Col 1");
    await step(right, "Row 1 Col 2");

    await left();
    await stepCell(down, "Disabled button");
    await right();
    expect(canvas.getByTestId("disabled-input").closest("td")).toHaveFocus();
    await right();
    expect(canvas.getByTestId("disabled-select").closest("td")).toHaveFocus();
    await right();
    expect(canvas.getByTestId("disabled-textarea").closest("td")).toHaveFocus();
    await left();
    expect(canvas.getByTestId("disabled-select").closest("td")).toHaveFocus();
    await left();
    expect(canvas.getByTestId("disabled-input").closest("td")).toHaveFocus();
    await left();
    expectCellFocus("Disabled button");
    await stepCell(down, "Aria-Disabled button");
    await step(right, "Aria Disabled 2");
    await step(right, "Aria Disabled 3");
    await step(right, "Aria Disabled 4");
  },
};

type CacheRow = { id: number; col1: string };

const cacheColumnDef: ColumnDefinitions<CacheRow> = [
  { id: "col1", header: "Col 1", bodyCell: ({ col1 }) => col1 },
  { id: "col2", header: "Col 2", bodyCell: () => "Col 2" },
  {
    id: "col3",
    header: "Col 3",
    bodyCell: ({ id }) => (id === 1 ? <input type="checkbox" /> : "Col 3"),
  },
  { id: "col4", header: "Col 4", bodyCell: () => "Col 4" },
];

export const Cache: Story = {
  render: () => {
    const [showThatSingleRow, setShowThatSingleRow] = useState(true);

    const data: CacheRow[] = [
      { id: 1, col1: "Row 1" },
      ...(showThatSingleRow ? [{ id: 2, col1: "Custom row" }] : []),
      { id: 3, col1: "Row 3" },
    ];

    return (
      <div style={{ padding: "4rem", display: "grid", gap: "2rem" }}>
        <button type="button" onClick={() => setShowThatSingleRow((s) => !s)}>
          Toggle single row: {showThatSingleRow ? "ON" : "OFF"}
        </button>
        <DataGrid
          columns={cacheColumnDef}
          data={data}
          getRowId={(row) => row.id.toString()}
        >
          <DataGrid.Table layout="auto" />
        </DataGrid>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const { down, up, expectNodeFocus } = keyboardUtils();

    const table = canvas.getByRole("table");
    const toggleButton = canvas.getByRole("button", {
      name: /toggle single row/i,
    });

    table.focus();
    await down();
    expectNodeFocus("Row 1");
    await down();
    expectNodeFocus("Custom row");

    await userEvent.click(toggleButton);
    table.focus();
    await down();
    expectNodeFocus("Row 1");
    await down();
    expectNodeFocus("Row 3");

    await userEvent.click(toggleButton);
    table.focus();
    await down();
    expectNodeFocus("Row 3");
    await up();
    expectNodeFocus("Custom row");
  },
};

type FocusRow = { id: string };

const focusData: FocusRow[] = [{ id: "1" }, { id: "2" }];

const focusColumnDef: ColumnDefinitions<FocusRow> = [
  { id: "col1", header: "Col 1", bodyCell: () => "Col 1" },
  {
    id: "col2",
    header: "Col 2",
    bodyCell: ({ id }) =>
      id === "1" ? <button type="button">Focusable button</button> : "Col 2",
  },
  {
    id: "col3",
    header: "Col 3",
    bodyCell: () => "Col 3",
    isRowHeader: true,
  },
  { id: "col4", header: "Col 4", bodyCell: () => "Col 4" },
];

export const FocusElementInsideTable: Story = {
  render: () => (
    <DataGrid
      columns={focusColumnDef}
      data={focusData}
      getRowId={(row) => row.id}
    >
      <DataGrid.Table layout="auto" />
    </DataGrid>
  ),
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
