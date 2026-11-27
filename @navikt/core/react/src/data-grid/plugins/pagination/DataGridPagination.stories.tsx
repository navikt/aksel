import type { Meta, StoryObj } from "@storybook/react-vite";
import React, { useMemo, useRef, useState } from "react";
import { VStack } from "../../../primitives/stack";
import { BodyLong } from "../../../typography";
import { DataGrid } from "../../root/DataGridRoot";
import type { UseDataGridPaginationConfig } from "./DataGridPagination.types";
import { paginateData } from "./helpers/paginate-data";
import { useDataGridPagination } from "./useDataGridPagination";

const meta: Meta<typeof DataGrid> = {
  title: "ds-react/DataGrid/Pagination",
  component: DataGrid,
  parameters: {
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj<typeof DataGrid>;

type Row = { id: number; name: string; role: string };

function createRows(count: number): Row[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `Person ${i + 1}`,
    role: ["Utvikler", "Designer", "Leder"][i % 3],
  }));
}

const ROWS = createRows(137);

const columns: DataGrid.Columns<Row> = [
  { id: "id", header: "Id", bodyCell: (row) => row.id, align: "right" },
  { id: "name", header: "Navn", bodyCell: (row) => row.name },
  { id: "role", header: "Rolle", bodyCell: (row) => row.role },
];

const getRowId = (row: Row) => String(row.id);

function StoryPage({
  description,
  children,
}: {
  description: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <VStack gap="space-16">
      <BodyLong style={{ maxWidth: "70ch" }}>{description}</BodyLong>
      {children}
    </VStack>
  );
}

function ClientPagedGrid({
  data = ROWS,
  initialPageSize = 10,
  position,
  align,
}: {
  data?: Row[];
  initialPageSize?: number;
  position?: UseDataGridPaginationConfig["position"];
  align?: UseDataGridPaginationConfig["align"];
}) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const pagination = useDataGridPagination({
    page,
    onPageChange: setPage,
    pageSize,
    onPageSizeChange: (nextSize) => {
      setPageSize(nextSize);
      setPage(1);
    },
    totalRows: data.length,
    position,
    align,
  });

  const pageRows = useMemo(
    () => paginateData(data, page, pageSize),
    [data, page, pageSize],
  );

  return (
    <DataGrid
      columns={columns}
      data={pageRows}
      getRowId={getRowId}
      plugins={{ pagination }}
    >
      <DataGrid.Table aria-label="Personer" />
    </DataGrid>
  );
}

export const Default: Story = {
  render: () => (
    <StoryPage description="Paginering på klientsiden med paginateData. 137 rader, 10 rader per side. Hold Shift og klikk eller trykk Enter/mellomrom på en sideknapp for å gå til første eller siste side.">
      <ClientPagedGrid />
    </StoryPage>
  ),
};

export const ServerSideWithLoading: Story = {
  render: function ServerSideWithLoadingStory() {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [rows, setRows] = useState(() => paginateData(ROWS, 1, 10));
    const [isLoading, setIsLoading] = useState(false);
    const request = useRef({ page: 1, pageSize: 10 });
    const timer = useRef<number | undefined>(undefined);

    const fetchPage = (next: Partial<typeof request.current>) => {
      request.current = { ...request.current, ...next };
      setPage(request.current.page);
      setPageSize(request.current.pageSize);
      /* Set isLoading in the same update as the page request so announcements wait for the new rows */
      setIsLoading(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => {
        const { page: p, pageSize: size } = request.current;
        setRows(paginateData(ROWS, p, size));
        setIsLoading(false);
      }, 1500);
    };

    const pagination = useDataGridPagination({
      page,
      onPageChange: (nextPage) => fetchPage({ page: nextPage }),
      pageSize,
      onPageSizeChange: (nextSize) =>
        fetchPage({ page: 1, pageSize: nextSize }),
      totalRows: ROWS.length,
    });

    return (
      <StoryPage description="Paginering på serversiden med simulert henting av data. Bytte av side eller antall rader per side gir 1,5 sekunder lasting.">
        <DataGrid
          columns={columns}
          data={rows}
          getRowId={getRowId}
          isLoading={isLoading}
          plugins={{ pagination }}
        >
          <DataGrid.Table aria-label="Personer" />
        </DataGrid>
      </StoryPage>
    );
  },
};

export const UnknownTotal: Story = {
  render: function UnknownTotalStory() {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const pagination = useDataGridPagination({
      page,
      onPageChange: setPage,
      pageSize,
      onPageSizeChange: (nextSize) => {
        setPageSize(nextSize);
        setPage(1);
      },
      hasNextPage: page * pageSize < ROWS.length,
    });

    return (
      <StoryPage description="Paginering uten kjent totalt antall rader (hasNextPage).">
        <DataGrid
          columns={columns}
          data={paginateData(ROWS, page, pageSize)}
          getRowId={getRowId}
          plugins={{ pagination }}
        >
          <DataGrid.Table aria-label="Personer" />
        </DataGrid>
      </StoryPage>
    );
  },
};

export const FixedPageSize: Story = {
  render: function FixedPageSizeStory() {
    const [page, setPage] = useState(1);
    const pageSize = 25;

    const pagination = useDataGridPagination({
      page,
      onPageChange: setPage,
      pageSize,
      allowPageSizeChange: false,
      totalRows: ROWS.length,
    });

    return (
      <StoryPage description="Fast antall rader per side (allowPageSizeChange: false). 25 rader per side.">
        <DataGrid
          columns={columns}
          data={paginateData(ROWS, page, pageSize)}
          getRowId={getRowId}
          plugins={{ pagination }}
        >
          <DataGrid.Table aria-label="Personer" />
        </DataGrid>
      </StoryPage>
    );
  },
};

export const PositionAboveAndBoth: Story = {
  render: () => (
    <StoryPage description="Paginering både over og under tabellen (position: 'both', align: 'start').">
      <ClientPagedGrid position="both" align="start" />
    </StoryPage>
  ),
};

export const NarrowContainer: Story = {
  render: () => (
    <StoryPage description="Tabellen ligger i en container på 20rem. Under 22rem skjules sidefeltet og «Side X av Y».">
      <div style={{ maxWidth: "20rem" }}>
        <ClientPagedGrid />
      </div>
    </StoryPage>
  ),
};
