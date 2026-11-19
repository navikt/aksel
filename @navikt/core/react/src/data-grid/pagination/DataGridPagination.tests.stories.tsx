import type { Meta, StoryObj } from "@storybook/react-vite";
import React, { useState } from "react";
import { expect, fireEvent, userEvent, waitFor, within } from "storybook/test";
import type { SortEntry } from "../../data/table/root/DataGridTable.types";
import { DataGrid } from "../root/DataGridRoot";

const meta: Meta<typeof DataGrid> = {
  title: "ds-react/DataGrid/Pagination/tests",
  component: DataGrid,
  parameters: {
    layout: "padded",
    chromatic: { disable: true },
  },
};

export default meta;

type Story = StoryObj<typeof DataGrid>;
type Row = { id: number; name: string };

const getRowId = (row: Row) => String(row.id);

const manyRows: Row[] = Array.from({ length: 60 }, (_, index) => ({
  id: index + 1,
  name: `Person ${String(index + 1).padStart(2, "0")}`,
}));

const columns: DataGrid.Columns<Row> = [
  { id: "name", header: "Name", bodyCell: (row) => row.name },
];

const sortableColumns: DataGrid.Columns<Row> = [
  { id: "name", header: "Name", bodyCell: (row) => row.name, isSortable: true },
];

function expectPage(
  canvas: ReturnType<typeof within>,
  page: number,
  pageCount: number,
) {
  expect(canvas.getByRole("textbox", { name: "Gå til side" })).toHaveValue(
    String(page),
  );
  expect(canvas.getByText(`av ${pageCount}`)).toBeInTheDocument();
}

export const ClientPaginationFlow: Story = {
  render: () => (
    <DataGrid
      columns={columns}
      data={manyRows}
      getRowId={getRowId}
      pagination={{ defaultPageSize: 20, pageSizeOptions: [10, 20] }}
    >
      <DataGrid.Table bottomContent={<DataGrid.Pagination />} />
    </DataGrid>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    const user = userEvent.setup();
    const previous = canvas.getByRole("button", { name: "Forrige side" });
    const next = canvas.getByRole("button", { name: "Neste side" });
    const input = canvas.getByRole("textbox", { name: "Gå til side" });

    expectPage(canvas, 1, 3);

    /* Shift elsewhere does not preview jump; Shift+hover/focus previews & jumps */
    await user.keyboard("{Shift>}");
    expect(next).toHaveAccessibleName("Neste side");
    await user.hover(next);
    expect(next).toHaveAccessibleName("Siste side");
    expect(previous).toHaveAccessibleName("Forrige side");
    await user.click(next);
    expectPage(canvas, 3, 3);

    await user.hover(previous);
    expect(previous).toHaveAccessibleName("Første side");
    await user.click(previous);
    expectPage(canvas, 1, 3);
    await user.keyboard("{/Shift}");

    await user.click(next);
    expectPage(canvas, 2, 3);
    await user.unhover(next);
    expect(next).toHaveFocus();
    await user.keyboard("{Shift>}");
    expect(next).toHaveAccessibleName("Siste side");
    await user.keyboard("{/Shift}");
    expect(next).toHaveAccessibleName("Neste side");

    /* Shift+Tab must preview the same jump as keyboard activation. */
    await user.clear(input);
    await user.keyboard("3{Enter}{Shift>}{Tab}");
    expect(previous).toHaveFocus();
    expect(previous).toHaveAccessibleName("Første side");
    await user.keyboard("{Enter}");
    expectPage(canvas, 1, 3);
    await user.keyboard("{/Shift}");
    expect(previous).toHaveAccessibleName("Forrige side");

    await user.tab();
    await user.tab();
    expect(next).toHaveFocus();
    await user.keyboard("{Shift>}");
    expect(next).toHaveAccessibleName("Siste side");
    /* Releasing one Shift while the other is held keeps the modifier active. */
    await fireEvent.keyUp(next, {
      key: "Shift",
      code: "ShiftLeft",
      shiftKey: true,
    });
    expect(next).toHaveAccessibleName("Siste side");
    await user.keyboard(" ");
    expectPage(canvas, 3, 3);

    await user.keyboard("{Tab}{Tab}");
    expect(previous).toHaveFocus();
    expect(previous).toHaveAccessibleName("Første side");
    await user.keyboard(" ");
    expectPage(canvas, 1, 3);
    await user.keyboard("{/Shift}");
    expect(previous).toHaveAccessibleName("Forrige side");
    await user.tab();
    await user.tab();
    await user.keyboard(" ");
    expectPage(canvas, 2, 3);

    /* Typed page: Enter submit, clamping, non-digit strip, Escape discard, blur commit */
    await user.clear(input);
    await user.keyboard("99{Enter}");
    expectPage(canvas, 3, 3);

    await user.clear(input);
    await user.keyboard("0{Enter}");
    expectPage(canvas, 1, 3);

    await user.clear(input);
    await user.keyboard("a2b");
    expect(input).toHaveValue("2");
    await user.keyboard("{Escape}");
    expectPage(canvas, 1, 3);

    await user.clear(input);
    await user.keyboard("3");
    await user.tab();
    expectPage(canvas, 3, 3);
    expect(canvas.getByRole("cell", { name: "Person 41" })).toBeInTheDocument();

    /* Page-size ActionMenu resets to page 1 */
    await user.click(
      canvas.getByRole("button", {
        name: "Fra 41 til 60 av 60, velg antall rader per side, 20 valgt",
      }),
    );
    expect(
      body.getByRole("menuitemradio", { name: "20 per side" }),
    ).toBeChecked();
    await user.click(body.getByRole("menuitemradio", { name: "10 per side" }));

    expectPage(canvas, 1, 6);
    expect(
      canvas.getByRole("button", {
        name: "Fra 1 til 10 av 60, velg antall rader per side, 10 valgt",
      }),
    ).toBeInTheDocument();
  },
};

function ServerUnknownTotalGrid() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setIsLoading((prev) => !prev)}>
        Toggle loading
      </button>
      <DataGrid
        columns={columns}
        data={isLoading ? [] : manyRows.slice(0, 20)}
        getRowId={getRowId}
        isLoading={isLoading}
        pagination={{
          mode: "server",
          defaultPageSize: 20,
          allowPageSizeChange: false,
          hasNextPage: true,
        }}
      >
        <DataGrid.Table bottomContent={<DataGrid.Pagination />} />
      </DataGrid>
    </>
  );
}

export const ServerAndUnknownTotal: Story = {
  render: () => <ServerUnknownTotalGrid />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    /* Plain summary text when allowPageSizeChange is false; no page textbox when total is unknown */
    expect(canvas.getByText("Rad 1–20")).toBeInTheDocument();
    expect(
      canvas.queryByRole("button", { name: /rader per side/i }),
    ).not.toBeInTheDocument();
    expect(
      canvas.queryByRole("textbox", { name: "Gå til side" }),
    ).not.toBeInTheDocument();
    expect(canvas.getByText("Side 1")).toBeInTheDocument();

    /* Shift+click with unknown total steps +1 instead of jumping to last */
    const next = canvas.getByRole("button", { name: "Neste side" });
    await user.hover(next);
    await user.keyboard("{Shift>}");
    expect(next).toHaveAccessibleName("Neste side");
    await user.click(next);
    await user.keyboard("{/Shift}");
    expect(canvas.getByText("Side 2")).toBeInTheDocument();
    expect(canvas.getByText("Rad 21–40")).toBeInTheDocument();

    /* Loading preserves summary and aria-disables navigation buttons */
    await user.click(canvas.getByRole("button", { name: "Toggle loading" }));
    expect(canvas.getByText("Rad 21–40")).toBeInTheDocument();
    expect(next).toHaveAttribute("aria-disabled", "true");
    await user.click(next);
    expect(canvas.getByText("Side 2")).toBeInTheDocument();
  },
};

function SortResetGrid() {
  const [mode, setMode] = useState<"client" | "server">("client");
  const [acceptSort, setAcceptSort] = useState(true);
  const [sortOrder, setSortOrder] = useState<SortEntry[]>([]);

  return (
    <>
      <button type="button" onClick={() => setAcceptSort((prev) => !prev)}>
        {acceptSort ? "Reject sort" : "Accept sort"}
      </button>
      <button
        type="button"
        onClick={() =>
          setMode((prev) => (prev === "client" ? "server" : "client"))
        }
      >
        Switch mode
      </button>
      <div style={{ display: "flex", height: 360 }}>
        <DataGrid
          columns={sortableColumns}
          data={mode === "server" ? manyRows.slice(0, 20) : manyRows}
          getRowId={getRowId}
          pagination={
            mode === "server"
              ? {
                  mode: "server",
                  defaultPageSize: 20,
                  pageSizeOptions: [10, 20],
                  totalRows: manyRows.length,
                }
              : { defaultPageSize: 20, pageSizeOptions: [10, 20] }
          }
        >
          <DataGrid.Table
            aria-label="Personer"
            sorting={{
              sortOrder,
              onSortOrderChange: (next) => {
                if (acceptSort) {
                  setSortOrder(next);
                }
              },
            }}
            bottomContent={<DataGrid.Pagination />}
          />
        </DataGrid>
      </div>
    </>
  );
}

export const SortAndScrollReset: Story = {
  render: () => <SortResetGrid />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const wrapper = canvasElement.querySelector<HTMLElement>(
      ".aksel-data-table__scroll-wrapper",
    );
    if (!wrapper) {
      throw new Error("Table scroll wrapper not found");
    }
    const liveRegion = canvasElement.querySelector<HTMLElement>(
      '.aksel-sr-only[aria-live="polite"]',
    );
    const view = canvasElement.ownerDocument.defaultView ?? window;
    const windowScrollY = view.scrollY;

    /* Page change scrolls table container to top and announces in live region */
    wrapper.scrollTop = 150;
    expect(wrapper.scrollTop).toBeGreaterThan(0);
    await userEvent.click(canvas.getByRole("button", { name: "Neste side" }));
    expectPage(canvas, 2, 3);
    await waitFor(() => expect(wrapper.scrollTop).toBe(0));
    await waitFor(() => expect(liveRegion).toHaveTextContent("Side 2 av 3"));

    /* Rejected controlled sort neither resets page nor scrolls */
    await userEvent.click(canvas.getByRole("button", { name: "Reject sort" }));
    wrapper.scrollTop = 150;
    const preservedScroll = wrapper.scrollTop;
    await userEvent.click(canvas.getByRole("button", { name: "Name" }));
    expectPage(canvas, 2, 3);
    expect(wrapper.scrollTop).toBe(preservedScroll);

    /* Accepted client sort resets to page 1 + scrollTop 0 without announcing */
    await userEvent.click(canvas.getByRole("button", { name: "Accept sort" }));
    await userEvent.click(canvas.getByRole("button", { name: "Name" }));
    expectPage(canvas, 1, 3);
    expect(canvas.getByRole("columnheader", { name: "Name" })).toHaveAttribute(
      "aria-sort",
      "ascending",
    );
    await waitFor(() => expect(wrapper.scrollTop).toBe(0));
    expect(liveRegion).toHaveTextContent("Side 2 av 3");

    /* Server-mode sort leaves page untouched */
    await userEvent.click(canvas.getByRole("button", { name: "Switch mode" }));
    await userEvent.click(canvas.getByRole("button", { name: "Neste side" }));
    expectPage(canvas, 2, 3);
    await userEvent.click(canvas.getByRole("button", { name: "Name" }));
    expectPage(canvas, 2, 3);
    expect(view.scrollY).toBe(windowScrollY);
  },
};
