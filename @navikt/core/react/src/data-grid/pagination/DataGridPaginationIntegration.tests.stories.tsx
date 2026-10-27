import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { expect, userEvent, within } from "storybook/test";
import { DataGrid } from "../root/DataGridRoot";

const meta: Meta<typeof DataGrid> = {
  title: "ds-react/DataGrid/Pagination/Integration tests",
  component: DataGrid,
  parameters: {
    layout: "padded",
    chromatic: { disable: true },
  },
};

export default meta;

type Story = StoryObj<typeof DataGrid>;
type Row = { id: number; name: string };

const rows: Row[] = Array.from({ length: 53 }, (_, index) => ({
  id: index + 1,
  name: `Person ${index + 1}`,
}));

const columns: DataGrid.Columns<Row> = [
  { id: "id", header: "Id", bodyCell: (row) => row.id },
  { id: "name", header: "Navn", bodyCell: (row) => row.name },
];

function FixedHeightGrid() {
  return (
    <div style={{ display: "flex", height: 400 }}>
      <DataGrid
        columns={columns}
        data={rows}
        getRowId={(row) => String(row.id)}
        pagination={{ defaultPageSize: 20, pageSizeOptions: [10, 20, 50] }}
      >
        <DataGrid.Table aria-label="Personer" />
        <DataGrid.Pagination />
      </DataGrid>
    </div>
  );
}

export const KeyboardCellClampedOnShorterLastPage: Story = {
  render: () => (
    <>
      <button type="button">Før tabellen</button>
      <FixedHeightGrid />
    </>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const table = canvas.getByRole("table", { name: "Personer" });
    const lastPage = canvas.getByRole("button", { name: "Siste side" });
    const beforeTable = canvas.getByRole("button", { name: "Før tabellen" });

    await userEvent.click(beforeTable);
    await userEvent.tab();
    await userEvent.keyboard("{Control>}{End}{/Control}");
    expect(canvas.getByRole("cell", { name: "Person 20" })).toHaveFocus();

    await userEvent.click(lastPage);

    expect(canvas.getByText("Side 3 av 3")).toBeInTheDocument();
    expect(within(table).getAllByRole("row")).toHaveLength(14);
    expect(lastPage).toHaveFocus();

    await userEvent.click(beforeTable);
    await userEvent.tab();
    expect(canvas.getByRole("cell", { name: "Person 53" })).toHaveFocus();

    await userEvent.keyboard("{ArrowUp}");
    expect(canvas.getByRole("cell", { name: "Person 52" })).toHaveFocus();
    await userEvent.keyboard("{ArrowLeft}");
    expect(canvas.getByRole("cell", { name: "52" })).toHaveFocus();
  },
};
