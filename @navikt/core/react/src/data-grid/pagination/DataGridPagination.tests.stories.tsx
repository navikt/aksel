import type { Meta, StoryObj } from "@storybook/react-vite";
import React, { useState } from "react";
import { expect, userEvent, within } from "storybook/test";
import { DataGrid } from "../root/DataGridRoot";
import { DataGridPagination } from "./index";

const meta: Meta<typeof DataGridPagination> = {
  title: "ds-react/DataGrid/Pagination/tests",
  component: DataGridPagination,
  parameters: {
    layout: "padded",
    chromatic: { disable: true },
    a11y: { test: "error" },
  },
};

export default meta;

type Story = StoryObj<typeof DataGridPagination>;

type Row = { id: number; name: string };

const ROWS: Row[] = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  name: `Person ${i + 1}`,
}));

const columns: DataGrid.Columns<Row> = [
  { id: "name", header: "Navn", bodyCell: (row) => row.name },
];

const getRowId = (row: Row) => String(row.id);

export const TestUncontrolledNavigation: Story = {
  render: () => (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        event.currentTarget.dataset.submitted = "true";
      }}
    >
      <DataGridPagination
        data={ROWS.slice(0, 10)}
        defaultPageSize={10}
        totalRows={25}
      />
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

export const TestSummaryWidth: Story = {
  render: () => (
    <DataGridPagination data={ROWS.slice(0, 10)} totalRows={137}>
      <DataGridPagination.Summary data-testid="summary" />
      <DataGridPagination.PageSize />
      <DataGridPagination.Navigation />
    </DataGridPagination>
  ),
  play: testSummaryWidth,
};

export const TestUnknownTotalSummaryWidth: Story = {
  render: () => (
    <DataGridPagination data={ROWS.slice(0, 10)} defaultPage={98} hasNextPage>
      <DataGridPagination.Summary data-testid="summary" />
      <DataGridPagination.PageSize />
      <DataGridPagination.Navigation />
    </DataGridPagination>
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
          data={ROWS.slice(page * pageSize, (page + 1) * pageSize)}
          getRowId={getRowId}
        >
          <DataGrid.Table />
          <DataGridPagination
            data={ROWS.slice(page * pageSize, (page + 1) * pageSize)}
            page={page}
            onPageChange={(nextPage) => {
              setLastPageChange(nextPage);
              setPage(nextPage);
            }}
            pageSize={pageSize}
            onPageSizeChange={(nextPageSize) => {
              setLastPageSizeChange(nextPageSize);
              setPageSize(nextPageSize);
            }}
            pageSizeOptions={[5, 10]}
            totalRows={ROWS.length}
          />
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
    expect(
      canvasElement.querySelector(
        '.aksel-data-grid__pagination > [aria-live="polite"]',
      ),
    ).toHaveTextContent(
      "Viser 1–5 av 25 rader. Side 1 av 5. Rader per side: 5",
    );
  },
};

export const TestPageSizeMissingFromOptions: Story = {
  render: () => (
    <DataGridPagination
      data={ROWS.slice(0, 7)}
      defaultPageSize={7}
      pageSizeOptions={[10, 25]}
      totalRows={ROWS.length}
    />
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
  render: () => {
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const data = ROWS.slice(page * pageSize, (page + 1) * pageSize);
    const pagination: DataGridPagination.Props = {
      data,
      page,
      onPageChange: setPage,
      pageSize,
      onPageSizeChange: setPageSize,
      totalRows: ROWS.length,
    };

    return (
      <DataGrid columns={columns} data={data} getRowId={getRowId}>
        <DataGridPagination {...pagination} announcePageChanges={false}>
          <DataGridPagination.Summary />
          <DataGridPagination.PageSize />
          <DataGridPagination.Navigation aria-label="Personer: sidenavigering over tabellen" />
        </DataGridPagination>
        <DataGrid.Table />
        <DataGridPagination {...pagination}>
          <DataGridPagination.Summary />
          <DataGridPagination.PageSize />
          <DataGridPagination.Navigation aria-label="Personer: sidenavigering under tabellen" />
        </DataGridPagination>
      </DataGrid>
    );
  },
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
    const data = ROWS.slice(dataPage * 10, (dataPage + 1) * 10);
    const pagination: DataGridPagination.Props = {
      data,
      page,
      onPageChange: (nextPage) => {
        setPage(nextPage);
        setIsLoading(true);
      },
      isLoading,
      defaultPageSize: 10,
      hasNextPage: true,
    };

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
        <DataGridPagination {...pagination} announcePageChanges={false} />
        <DataGridPagination {...pagination} />
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
    const liveRegions = canvasElement.querySelectorAll(
      '.aksel-data-grid__pagination > [aria-live="polite"]',
    );

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
    expect(
      canvasElement.querySelectorAll(
        '.aksel-data-grid__pagination > [aria-live="polite"]',
      ),
    ).toHaveLength(1);
  },
};

export const TestUnknownTotalNavigation: Story = {
  render: () => {
    const [page, setPage] = useState(0);

    return (
      <DataGridPagination
        data={ROWS.slice(0, 10)}
        page={page}
        onPageChange={setPage}
        defaultPageSize={10}
        hasNextPage={page === 0}
      />
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
  render: () => {
    const [page, setPage] = useState(0);

    return (
      <DataGridPagination
        data={[]}
        page={page}
        onPageChange={setPage}
        hasNextPage
      />
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const liveRegion = canvasElement.querySelector(
      '.aksel-data-grid__pagination > [aria-live="polite"]',
    );

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
    <DataGridPagination
      data={ROWS.slice(20)}
      defaultPage={4}
      defaultPageSize={10}
      totalRows={25}
    />
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
        <DataGridPagination
          data={ROWS.slice(20)}
          page={page}
          onPageChange={(nextPage) => {
            setPageChangeCount((count) => count + 1);
            setPage(nextPage);
          }}
          defaultPageSize={10}
          totalRows={25}
        />
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
    <>
      <DataGridPagination
        data={ROWS.slice(0, 10)}
        totalRows={ROWS.length}
        data-testid="custom-bar"
      >
        <span>Egendefinert innhold</span>
      </DataGridPagination>
      <DataGridPagination
        data={ROWS.slice(0, 10)}
        totalRows={ROWS.length}
        data-testid="summary-bar"
      >
        <DataGridPagination.Summary />
      </DataGridPagination>
    </>
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

export const TestIndependentPagination: Story = {
  render: () => (
    <>
      <DataGridPagination
        data={ROWS.slice(0, 10)}
        totalRows={25}
        aria-label="First dataset"
      >
        <DataGridPagination.Summary />
        <DataGridPagination.PageSize />
        <DataGridPagination.Navigation aria-label="First dataset navigation" />
      </DataGridPagination>
      <DataGridPagination
        data={ROWS.slice(0, 5)}
        totalRows={5}
        aria-label="Second dataset"
      >
        <DataGridPagination.Summary />
        <DataGridPagination.PageSize />
        <DataGridPagination.Navigation aria-label="Second dataset navigation" />
      </DataGridPagination>
    </>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const first = within(canvas.getByLabelText("First dataset"));
    const second = within(canvas.getByLabelText("Second dataset"));

    await userEvent.click(first.getByRole("button", { name: "Neste side" }));
    expect(first.getByText("Side 2 av 3")).toBeInTheDocument();
    expect(second.getByText("Side 1 av 1")).toBeInTheDocument();
    expect(first.getByText(/Side 2.*Rader per side/)).toHaveAttribute(
      "aria-live",
      "polite",
    );
    expect(
      second.getByText("", { selector: '[aria-live="polite"].aksel-sr-only' }),
    ).toBeEmptyDOMElement();
  },
};
