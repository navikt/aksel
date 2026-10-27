import type { Meta, StoryObj } from "@storybook/react-vite";
import React, { useState } from "react";
import { expect, userEvent, within } from "storybook/test";
import { DataGrid } from "../root/DataGridRoot";

const meta: Meta<typeof DataGrid> = {
  title: "ds-react/DataGrid/Pagination/tests",
  component: DataGrid,
  parameters: {
    layout: "padded",
    chromatic: { disable: true },
    a11y: { test: "error" },
  },
};

export default meta;

type Story = StoryObj<typeof DataGrid>;

type Row = { id: number; name: string };

const ROWS: Row[] = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  name: `Person ${i + 1}`,
}));

const columns: DataGrid.Columns<Row> = [
  { id: "name", header: "Navn", bodyCell: (row) => row.name },
];

const getRowId = (row: Row) => String(row.id);

const LIVE_REGION = '.aksel-data-grid > [aria-live="polite"]';

export const TestUncontrolledNavigation: Story = {
  render: () => (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        event.currentTarget.dataset.submitted = "true";
      }}
    >
      <DataGrid
        columns={columns}
        data={ROWS}
        getRowId={getRowId}
        pagination={{ defaultPageSize: 10 }}
      >
        <DataGrid.Pagination />
      </DataGrid>
    </form>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const first = canvas.getByRole("button", { name: "Første side" });
    const next = canvas.getByRole("button", { name: "Neste side" });

    expect(canvas.getByText("Side 1 av 3")).toBeInTheDocument();
    expect(first).toHaveAttribute("aria-disabled", "true");
    first.focus();
    await userEvent.keyboard("{Enter}");
    expect(first).toHaveFocus();
    expect(canvas.getByText("Side 1 av 3")).toBeInTheDocument();

    await userEvent.click(next);
    expect(canvas.getByText("Side 2 av 3")).toBeInTheDocument();
    expect(canvas.getByText("Viser 11–20 av 25 rader")).toBeInTheDocument();
    expect(canvasElement.querySelector("form")).not.toHaveAttribute(
      "data-submitted",
    );
    await userEvent.click(canvas.getByRole("button", { name: "Forrige side" }));
    expect(canvas.getByText("Side 1 av 3")).toBeInTheDocument();
    await userEvent.click(canvas.getByRole("button", { name: "Siste side" }));
    expect(canvas.getByText("Side 3 av 3")).toBeInTheDocument();
    expect(next).toHaveAttribute("aria-disabled", "true");
    next.focus();
    await userEvent.keyboard(" ");
    expect(next).toHaveFocus();
    expect(canvas.getByText("Side 3 av 3")).toBeInTheDocument();
    await userEvent.click(first);
    expect(canvas.getByText("Side 1 av 3")).toBeInTheDocument();
  },
};

const testSummaryWidth: Story["play"] = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await canvasElement.ownerDocument.fonts.ready;
  const getBounds = () =>
    [
      canvas.getByTestId("summary"),
      canvas.getByRole("combobox", { name: "Rader per side" }),
      ...canvas.getAllByRole("button"),
    ].map((element) => {
      const { x, y, width, height } = element.getBoundingClientRect();
      return { x, y, width, height };
    });
  const bounds = getBounds();

  for (let page = 1; page < 14; page++) {
    await userEvent.click(canvas.getByRole("button", { name: "Neste side" }));
    expect(getBounds()).toEqual(bounds);
  }
};

function SummaryWidthBar() {
  return (
    <DataGrid.Pagination>
      <DataGrid.Pagination.Summary data-testid="summary" />
      <DataGrid.Pagination.PageSize />
      <DataGrid.Pagination.Navigation />
    </DataGrid.Pagination>
  );
}

export const TestSummaryWidth: Story = {
  render: () => (
    <DataGrid
      columns={columns}
      data={ROWS.slice(0, 10)}
      getRowId={getRowId}
      pagination={{ mode: "server", totalRows: 137 }}
    >
      <SummaryWidthBar />
    </DataGrid>
  ),
  play: testSummaryWidth,
};

export const TestUnknownTotalSummaryWidth: Story = {
  render: () => (
    <DataGrid
      columns={columns}
      data={ROWS.slice(0, 10)}
      getRowId={getRowId}
      pagination={{ mode: "server", defaultPage: 98, hasNextPage: true }}
    >
      <SummaryWidthBar />
    </DataGrid>
  ),
  play: testSummaryWidth,
};

export const TestPageSizeChange: Story = {
  render: () => {
    const [page, setPage] = useState(2);
    const [pageSize, setPageSize] = useState(10);
    const [lastPageChange, setLastPageChange] = useState<number | null>(null);
    const [lastPageSizeChange, setLastPageSizeChange] = useState<number | null>(
      null,
    );

    return (
      <>
        <output data-testid="last-page-change">{lastPageChange}</output>
        <output data-testid="last-page-size-change">
          {lastPageSizeChange}
        </output>
        <DataGrid
          columns={columns}
          data={ROWS}
          getRowId={getRowId}
          pagination={{
            page,
            onPageChange: (nextPage) => {
              setLastPageChange(nextPage);
              setPage(nextPage);
            },
            pageSize,
            onPageSizeChange: (nextPageSize) => {
              setLastPageSizeChange(nextPageSize);
              setPageSize(nextPageSize);
            },
            pageSizeOptions: [5, 10],
          }}
        >
          <DataGrid.Table />
          <DataGrid.Pagination />
        </DataGrid>
      </>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const pageSize = canvas.getByRole("combobox", { name: "Rader per side" });

    expect(canvas.getByText("Viser 21–25 av 25 rader")).toBeInTheDocument();
    await userEvent.selectOptions(pageSize, "5");
    expect(
      await canvas.findByTestId("last-page-size-change"),
    ).toHaveTextContent("5");
    expect(canvas.getByTestId("last-page-change")).toHaveTextContent("0");
    expect(canvas.getByText("Viser 1–5 av 25 rader")).toBeInTheDocument();
    expect(canvas.getByText("Side 1 av 5")).toBeInTheDocument();
    expect(pageSize).toHaveFocus();
    expect(canvasElement.querySelector(LIVE_REGION)).toHaveTextContent(
      "Viser 1–5 av 25 rader. Side 1 av 5. Rader per side: 5",
    );
  },
};

export const TestPageSizeMissingFromOptions: Story = {
  render: () => (
    <DataGrid
      columns={columns}
      data={ROWS}
      getRowId={getRowId}
      pagination={{ defaultPageSize: 7, pageSizeOptions: [10, 25] }}
    >
      <DataGrid.Pagination />
    </DataGrid>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const pageSize = canvas.getByRole("combobox", { name: "Rader per side" });

    expect(pageSize).toHaveValue("7");
    expect(
      within(pageSize).getByRole("option", { name: "7" }),
    ).toBeInTheDocument();
  },
};

export const TestNavigationAccessibleNames: Story = {
  render: () => (
    <DataGrid
      columns={columns}
      data={ROWS}
      getRowId={getRowId}
      pagination={{ defaultPageSize: 10 }}
    >
      <DataGrid.Pagination>
        <DataGrid.Pagination.Summary />
        <DataGrid.Pagination.PageSize />
        <DataGrid.Pagination.Navigation aria-label="Personer: sidenavigering over tabellen" />
      </DataGrid.Pagination>
      <DataGrid.Table />
      <DataGrid.Pagination>
        <DataGrid.Pagination.Summary />
        <DataGrid.Pagination.PageSize />
        <DataGrid.Pagination.Navigation aria-label="Personer: sidenavigering under tabellen" />
      </DataGrid.Pagination>
    </DataGrid>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const topNavigation = canvas.getByRole("navigation", {
      name: "Personer: sidenavigering over tabellen",
    });
    const bottomNavigation = canvas.getByRole("navigation", {
      name: "Personer: sidenavigering under tabellen",
    });
    const pageSizes = canvas.getAllByRole("combobox", {
      name: "Rader per side",
    });

    expect(pageSizes).toHaveLength(2);
    expect(pageSizes[0].id).not.toBe(pageSizes[1].id);
    for (const pageSize of pageSizes) {
      expect(pageSize).toHaveAccessibleName("Rader per side");
      expect(within(pageSize).getAllByRole("option")).toHaveLength(4);
    }

    pageSizes[0].focus();
    await userEvent.tab();
    expect(
      within(topNavigation).getByRole("button", { name: "Første side" }),
    ).toHaveFocus();
    await userEvent.tab();
    expect(
      within(topNavigation).getByRole("button", { name: "Forrige side" }),
    ).toHaveFocus();
    await userEvent.tab();
    const next = within(topNavigation).getByRole("button", {
      name: "Neste side",
    });
    expect(next).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    expect(next).toHaveFocus();
    expect(within(topNavigation).getByText("Side 2 av 3")).toBeInTheDocument();
    expect(
      within(bottomNavigation).getByText("Side 2 av 3"),
    ).toBeInTheDocument();
  },
};

export const TestLoadingNavigationAndAnnouncement: Story = {
  parameters: {
    a11y: {
      // Both landmarks intentionally provide identical controls for one grid.
      config: { rules: [{ id: "landmark-unique", enabled: false }] },
    },
  },
  render: () => {
    const [page, setPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [renderCount, setRenderCount] = useState(0);
    const dataPage = isLoading ? 0 : page;

    return (
      <>
        <button type="button" onClick={() => setIsLoading(false)}>
          Complete request
        </button>
        <button type="button" onClick={() => setIsLoading(true)}>
          Reload page
        </button>
        <button
          type="button"
          onClick={() => setRenderCount((count) => count + 1)}
        >
          Unrelated render {renderCount}
        </button>
        <DataGrid
          columns={columns}
          data={ROWS.slice(dataPage * 10, (dataPage + 1) * 10)}
          isLoading={isLoading}
          getRowId={getRowId}
          pagination={{
            mode: "server",
            page,
            onPageChange: (nextPage) => {
              setPage(nextPage);
              setIsLoading(true);
            },
            defaultPageSize: 10,
            hasNextPage: true,
          }}
        >
          <DataGrid.Pagination />
          <DataGrid.Pagination />
        </DataGrid>
      </>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const navigation = canvas.getAllByRole("navigation", {
      name: "Sidenavigering",
    });
    const next = within(navigation[0]).getByRole("button", {
      name: "Neste side",
    });
    // Select also owns empty error-message live regions.
    const liveRegions = canvasElement.querySelectorAll(LIVE_REGION);

    expect(liveRegions).toHaveLength(1);
    expect(liveRegions[0]).toBeEmptyDOMElement();
    await userEvent.click(next);
    expect(next).toHaveAttribute("aria-disabled", "true");
    expect(next).toHaveFocus();
    for (const nav of navigation) {
      for (const button of within(nav).getAllByRole("button")) {
        expect(button).toHaveAttribute("aria-disabled", "true");
      }
    }
    expect(
      canvas.getAllByRole("combobox", { name: "Rader per side" })[0],
    ).not.toBeDisabled();
    expect(canvas.getAllByText("Side 2")).toHaveLength(2);
    expect(canvas.getAllByText("Viser rad 1–10")).toHaveLength(2);
    expect(liveRegions[0]).toBeEmptyDOMElement();

    await userEvent.click(next);
    await userEvent.keyboard("{Enter}");
    await userEvent.keyboard(" ");
    expect(next).toHaveFocus();
    expect(canvas.getAllByText("Side 2")).toHaveLength(2);
    await userEvent.click(
      canvas.getByRole("button", { name: "Complete request" }),
    );
    expect(await canvas.findAllByText("Viser rad 11–20")).toHaveLength(2);
    const announcement = "Viser rad 11–20. Side 2. Rader per side: 10";
    await expect(liveRegions[0]).toHaveTextContent(announcement);
    expect(liveRegions[0]).toHaveAttribute("aria-atomic", "true");

    await userEvent.click(
      canvas.getByRole("button", { name: "Unrelated render 0" }),
    );
    expect(liveRegions[0]).toHaveTextContent(announcement);
    await userEvent.click(canvas.getByRole("button", { name: "Reload page" }));
    expect(liveRegions[0]).toHaveTextContent(announcement);
    await userEvent.click(
      canvas.getByRole("button", { name: "Complete request" }),
    );
    expect(liveRegions[0]).toHaveTextContent(announcement);
    expect(canvasElement.querySelectorAll(LIVE_REGION)).toHaveLength(1);
  },
};

export const TestUnknownTotalNavigation: Story = {
  render: () => {
    const [page, setPage] = useState(0);

    return (
      <DataGrid
        columns={columns}
        data={ROWS.slice(0, 10)}
        getRowId={getRowId}
        pagination={{
          mode: "server",
          page,
          onPageChange: setPage,
          defaultPageSize: 10,
          hasNextPage: page === 0,
        }}
      >
        <DataGrid.Pagination />
      </DataGrid>
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

export const TestRepeatedSummaryStillAnnouncesPage: Story = {
  render: () => (
    <DataGrid
      columns={columns}
      data={[]}
      getRowId={getRowId}
      pagination={{ mode: "server", hasNextPage: true }}
    >
      <DataGrid.Pagination />
    </DataGrid>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const liveRegion = canvasElement.querySelector(LIVE_REGION);

    expect(liveRegion).toBeEmptyDOMElement();
    expect(canvas.getByText("Ingen rader")).toBeInTheDocument();

    await userEvent.click(canvas.getByRole("button", { name: "Neste side" }));
    await expect(liveRegion).toHaveTextContent("Side 2");
    expect(canvas.getByText("Ingen rader")).toBeInTheDocument();

    await userEvent.click(canvas.getByRole("button", { name: "Neste side" }));
    await expect(liveRegion).toHaveTextContent("Side 3");
    expect(canvas.getByText("Ingen rader")).toBeInTheDocument();
  },
};

export const TestUncontrolledPageIsClamped: Story = {
  render: () => (
    <DataGrid
      columns={columns}
      data={ROWS}
      getRowId={getRowId}
      pagination={{ defaultPage: 4, defaultPageSize: 10 }}
    >
      <DataGrid.Pagination />
    </DataGrid>
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
        <DataGrid
          columns={columns}
          data={ROWS}
          getRowId={getRowId}
          pagination={{
            page,
            onPageChange: (nextPage) => {
              setPageChangeCount((count) => count + 1);
              setPage(nextPage);
            },
            defaultPageSize: 10,
          }}
        >
          <DataGrid.Pagination />
        </DataGrid>
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

export const TestCustomLayout: Story = {
  render: () => (
    <DataGrid
      columns={columns}
      data={ROWS}
      getRowId={getRowId}
      pagination={{ defaultPageSize: 10 }}
    >
      <DataGrid.Pagination data-testid="custom-bar">
        <span>Egendefinert innhold</span>
      </DataGrid.Pagination>
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

export const TestIndependentGrids: Story = {
  render: () => (
    <>
      <section aria-label="First dataset">
        <DataGrid
          columns={columns}
          data={ROWS}
          getRowId={getRowId}
          pagination={{ defaultPageSize: 10 }}
        >
          <DataGrid.Pagination>
            <DataGrid.Pagination.Summary />
            <DataGrid.Pagination.PageSize />
            <DataGrid.Pagination.Navigation aria-label="First dataset navigation" />
          </DataGrid.Pagination>
        </DataGrid>
      </section>
      <section aria-label="Second dataset">
        <DataGrid
          columns={columns}
          data={ROWS.slice(0, 5)}
          getRowId={getRowId}
          pagination={{ defaultPageSize: 10 }}
        >
          <DataGrid.Pagination>
            <DataGrid.Pagination.Summary />
            <DataGrid.Pagination.PageSize />
            <DataGrid.Pagination.Navigation aria-label="Second dataset navigation" />
          </DataGrid.Pagination>
        </DataGrid>
      </section>
    </>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const firstSection = canvas.getByRole("region", { name: "First dataset" });
    const secondSection = canvas.getByRole("region", {
      name: "Second dataset",
    });
    const first = within(firstSection);
    const second = within(secondSection);

    await userEvent.click(first.getByRole("button", { name: "Neste side" }));
    expect(first.getByText("Side 2 av 3")).toBeInTheDocument();
    expect(second.getByText("Side 1 av 1")).toBeInTheDocument();
    await expect(firstSection.querySelector(LIVE_REGION)).toHaveTextContent(
      /Side 2.*Rader per side/,
    );
    expect(secondSection.querySelector(LIVE_REGION)).toBeEmptyDOMElement();
  },
};
