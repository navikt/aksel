import type { Meta, StoryObj } from "@storybook/react-vite";
import React, { useState } from "react";
import { expect, userEvent, within } from "storybook/test";
import { DataGrid } from "../root/DataGridRoot";

const meta: Meta<typeof DataGrid.Pagination> = {
  title: "ds-react/DataGrid/Pagination/tests",
  component: DataGrid.Pagination,
  parameters: {
    layout: "padded",
    chromatic: { disable: true },
  },
};

export default meta;

type Story = StoryObj<typeof DataGrid.Pagination>;

type Row = { id: number; name: string };

const ROWS: Row[] = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  name: `Person ${i + 1}`,
}));

const columns: DataGrid.Columns<Row> = [
  { id: "name", header: "Navn", bodyCell: (row) => row.name },
];

const getRowId = (row: Row) => String(row.id);

function PaginationGrid({
  children,
  pagination,
}: {
  children: React.ReactNode;
  pagination: DataGrid.Pagination.Options;
}) {
  return (
    <DataGrid
      columns={columns}
      data={ROWS.slice(0, 10)}
      getRowId={getRowId}
      pagination={pagination}
    >
      {children}
    </DataGrid>
  );
}

export const TestKnownTotal: Story = {
  render: () => (
    <DataGrid
      columns={columns}
      data={ROWS.slice(10, 20)}
      getRowId={getRowId}
      pagination={{ defaultPage: 1, totalRows: ROWS.length }}
    >
      <DataGrid.Table />
      <DataGrid.Pagination />
    </DataGrid>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText("Viser 11–20 av 25 rader")).toBeInTheDocument();
  },
};

export const TestUncontrolledNavigation: Story = {
  render: () => (
    <PaginationGrid
      pagination={{ defaultPage: 0, defaultPageSize: 10, totalRows: 25 }}
    >
      <DataGrid.Pagination />
    </PaginationGrid>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(canvas.getByText("Side 1 av 3")).toBeInTheDocument();
    await userEvent.click(canvas.getByRole("button", { name: "Neste side" }));
    expect(canvas.getByText("Side 2 av 3")).toBeInTheDocument();
    await userEvent.click(canvas.getByRole("button", { name: "Forrige side" }));
    expect(canvas.getByText("Side 1 av 3")).toBeInTheDocument();
    await userEvent.click(canvas.getByRole("button", { name: "Siste side" }));
    expect(canvas.getByText("Side 3 av 3")).toBeInTheDocument();
    await userEvent.click(canvas.getByRole("button", { name: "Første side" }));
    expect(canvas.getByText("Side 1 av 3")).toBeInTheDocument();
  },
};

export const TestControlledNavigation: Story = {
  render: () => {
    const [page, setPage] = useState(0);

    return (
      <PaginationGrid
        pagination={{
          page,
          onPageChange: setPage,
          defaultPageSize: 10,
          totalRows: 25,
        }}
      >
        <DataGrid.Pagination />
      </PaginationGrid>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole("button", { name: "Neste side" }));
    expect(canvas.getByText("Side 2 av 3")).toBeInTheDocument();
    expect(canvas.getByText("Viser 11–20 av 25 rader")).toBeInTheDocument();
  },
};

export const TestNavigationBounds: Story = {
  render: () => (
    <PaginationGrid
      pagination={{ defaultPage: 0, defaultPageSize: 10, totalRows: 25 }}
    >
      <DataGrid.Pagination />
    </PaginationGrid>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const firstButton = canvas.getByRole("button", { name: "Første side" });

    expect(firstButton).toHaveAttribute("aria-disabled", "true");
    firstButton.focus();
    await userEvent.click(firstButton);
    expect(firstButton).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    await userEvent.keyboard("{Space}");
    expect(canvas.getByText("Side 1 av 3")).toBeInTheDocument();

    const nextButton = canvas.getByRole("button", { name: "Neste side" });
    await userEvent.click(nextButton);
    await userEvent.click(nextButton);
    expect(canvas.getByText("Side 3 av 3")).toBeInTheDocument();
    expect(nextButton).toHaveAttribute("aria-disabled", "true");
    nextButton.focus();
    await userEvent.keyboard("{Enter}");
    await userEvent.keyboard("{Space}");
    expect(nextButton).toHaveFocus();
    expect(canvas.getByText("Side 3 av 3")).toBeInTheDocument();
  },
};

export const TestNavigationDoesNotSubmitForm: Story = {
  render: () => (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        event.currentTarget.dataset.submitted = "true";
      }}
    >
      <PaginationGrid
        pagination={{ defaultPage: 0, defaultPageSize: 10, totalRows: 25 }}
      >
        <DataGrid.Pagination />
      </PaginationGrid>
    </form>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole("button", { name: "Neste side" }));
    expect(canvasElement.querySelector("form")).not.toHaveAttribute(
      "data-submitted",
      "true",
    );
    expect(canvas.getByText("Side 2 av 3")).toBeInTheDocument();
  },
};

export const TestMultipleBarsStayInSync: Story = {
  render: () => (
    <PaginationGrid
      pagination={{ defaultPage: 0, defaultPageSize: 10, totalRows: 25 }}
    >
      <DataGrid.Pagination />
      <DataGrid.Table />
      <DataGrid.Pagination />
    </PaginationGrid>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const navigation = canvas.getAllByRole("navigation", {
      name: "Sidenavigering",
    });

    await userEvent.click(
      within(navigation[0]).getByRole("button", { name: "Neste side" }),
    );
    expect(canvas.getAllByText("Side 2 av 3")).toHaveLength(2);
    expect(canvas.getAllByText("Viser 11–20 av 25 rader")).toHaveLength(2);
  },
};

export const TestUnknownTotalNavigation: Story = {
  render: () => {
    const [page, setPage] = useState(0);

    return (
      <PaginationGrid
        pagination={{
          page,
          onPageChange: setPage,
          defaultPageSize: 10,
          hasNextPage: page === 0,
        }}
      >
        <DataGrid.Pagination />
      </PaginationGrid>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(canvas.getByText("Side 1")).toBeInTheDocument();
    expect(canvas.queryByRole("button", { name: "Siste side" })).toBeNull();
    await userEvent.click(canvas.getByRole("button", { name: "Neste side" }));
    expect(canvas.getByText("Side 2")).toBeInTheDocument();
    expect(canvas.queryByText(/av/)).toBeNull();
    expect(canvas.getByRole("button", { name: "Neste side" })).toHaveAttribute(
      "aria-disabled",
      "true",
    );
  },
};

export const TestUncontrolledPageIsClamped: Story = {
  render: () => (
    <PaginationGrid
      pagination={{ defaultPage: 4, defaultPageSize: 10, totalRows: 25 }}
    >
      <DataGrid.Pagination />
    </PaginationGrid>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(await canvas.findByText("Side 3 av 3")).toBeInTheDocument();
    await userEvent.click(canvas.getByRole("button", { name: "Forrige side" }));
    expect(canvas.getByText("Side 2 av 3")).toBeInTheDocument();
  },
};

export const TestControlledPageIsClampedOnce: Story = {
  render: () => {
    const [page, setPage] = useState(4);
    const [pageChangeCount, setPageChangeCount] = useState(0);

    return (
      <>
        <output data-testid="page-change-count">{pageChangeCount}</output>
        <PaginationGrid
          pagination={{
            page,
            onPageChange: (nextPage) => {
              setPageChangeCount((count) => count + 1);
              setPage(nextPage);
            },
            defaultPageSize: 10,
            totalRows: 25,
          }}
        >
          <DataGrid.Pagination />
        </PaginationGrid>
      </>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(await canvas.findByText("Side 3 av 3")).toBeInTheDocument();
    expect(await canvas.findByTestId("page-change-count")).toHaveTextContent(
      "1",
    );
  },
};

export const TestUnknownTotal: Story = {
  render: () => (
    <DataGrid
      columns={columns}
      data={ROWS.slice(0, 10)}
      getRowId={getRowId}
      pagination={{ hasNextPage: true }}
    >
      <DataGrid.Table />
      <DataGrid.Pagination />
    </DataGrid>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText("Viser rad 1–10")).toBeInTheDocument();
    expect(canvas.queryByText(/ av /)).not.toBeInTheDocument();
  },
};

export const TestZeroRows: Story = {
  render: () => (
    <DataGrid
      columns={columns}
      data={[]}
      getRowId={getRowId}
      pagination={{ totalRows: 0 }}
    >
      <DataGrid.Table />
      <DataGrid.Pagination />
    </DataGrid>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText("Ingen rader")).toBeInTheDocument();
  },
};

export const TestCustomLayout: Story = {
  render: () => (
    <DataGrid
      columns={columns}
      data={ROWS.slice(0, 10)}
      getRowId={getRowId}
      pagination={{ totalRows: ROWS.length }}
    >
      <DataGrid.Pagination data-testid="custom-bar">
        <span>Egendefinert innhold</span>
      </DataGrid.Pagination>
      <DataGrid.Table />
      <DataGrid.Pagination data-testid="summary-bar">
        <DataGrid.Pagination.Summary />
      </DataGrid.Pagination>
    </DataGrid>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const customBar = within(canvas.getByTestId("custom-bar"));
    const summaryBar = within(canvas.getByTestId("summary-bar"));

    expect(customBar.getByText("Egendefinert innhold")).toBeInTheDocument();
    expect(customBar.queryByText(/Viser/)).not.toBeInTheDocument();
    expect(summaryBar.getByText("Viser 1–10 av 25 rader")).toBeInTheDocument();
    expect(canvas.getAllByText(/Viser/)).toHaveLength(1);
  },
};

export const TestWithoutPaginationProp: Story = {
  render: () => (
    <DataGrid columns={columns} data={ROWS.slice(0, 5)} getRowId={getRowId}>
      <DataGrid.Table />
      <DataGrid.Pagination data-testid="bar" />
    </DataGrid>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.queryByTestId("bar")).not.toBeInTheDocument();
  },
};
