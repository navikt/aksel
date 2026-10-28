import type { Meta, StoryObj } from "@storybook/react-vite";
import React, { useState } from "react";
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

/**
 * When paginating, the number of rows on the last page may be less than the page size, and the keyboard navigation should correctly clamp to the available cells.
 * This means:
 * - If focus is on last row/cell (lets say 20)
 * - We paginate to next page that only has 14 rows
 * - The focus should clamp to the last available row
 */
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

function ServerLoadingGrid({
  loadingContent,
}: {
  loadingContent?: DataGrid.Table.LoadingContent;
}) {
  const [page, setPage] = useState(0);
  const [loadedPage, setLoadedPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <button type="button">Før tabellen</button>
      <DataGrid
        columns={columns}
        data={rows.slice(loadedPage * 20, (loadedPage + 1) * 20)}
        getRowId={(row) => String(row.id)}
        isLoading={isLoading}
        pagination={{
          mode: "server",
          page,
          onPageChange: (nextPage) => {
            setPage(nextPage);
            setIsLoading(true);
          },
          defaultPageSize: 20,
          pageSizeOptions: [20],
          totalRows: rows.length,
        }}
      >
        <DataGrid.Table aria-label="Personer" loadingContent={loadingContent} />
        <DataGrid.Pagination />
      </DataGrid>
      <button
        type="button"
        onClick={() => {
          setLoadedPage(page);
          setIsLoading(false);
        }}
      >
        Complete request
      </button>
    </>
  );
}

const testKeyboardCellThroughLoading: Story["play"] = async ({
  canvasElement,
}) => {
  const canvas = within(canvasElement);
  const before = canvas.getByRole("button", { name: "Før tabellen" });
  const complete = canvas.getByRole("button", { name: "Complete request" });

  await userEvent.click(before);
  await userEvent.tab();
  await userEvent.keyboard("{Control>}{End}{/Control}");
  expect(canvas.getByRole("cell", { name: "Person 20" })).toHaveFocus();

  const next = canvas.getByRole("button", { name: "Neste side" });
  await userEvent.click(next);
  expect(next).toHaveFocus();
  await userEvent.click(complete);
  await userEvent.click(before);
  await userEvent.tab();
  expect(canvas.getByRole("cell", { name: "Person 40" })).toHaveFocus();

  await userEvent.click(canvas.getByRole("button", { name: "Siste side" }));
  await userEvent.click(complete);
  await userEvent.click(before);
  await userEvent.tab();
  expect(canvas.getByRole("cell", { name: "Person 53" })).toHaveFocus();
  await userEvent.keyboard("{ArrowUp}");
  expect(canvas.getByRole("cell", { name: "Person 52" })).toHaveFocus();
};

export const KeyboardCellPreservedThroughSkeletonLoading: Story = {
  render: () => <ServerLoadingGrid />,
  play: testKeyboardCellThroughLoading,
};

export const KeyboardCellPreservedThroughContentLoading: Story = {
  render: () => (
    <ServerLoadingGrid
      loadingContent={{ variant: "content", content: "Loading rows" }}
    />
  ),
  play: testKeyboardCellThroughLoading,
};

export const KeyboardCellPreservedThroughOverlayLoading: Story = {
  render: () => <ServerLoadingGrid loadingContent={{ variant: "overlay" }} />,
  play: testKeyboardCellThroughLoading,
};
