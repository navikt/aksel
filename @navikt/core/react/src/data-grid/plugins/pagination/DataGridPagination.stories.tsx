import type { Meta, StoryObj } from "@storybook/react-vite";
import React, { useMemo, useRef, useState } from "react";
import { VStack } from "../../../primitives/stack";
import { BodyLong } from "../../../typography";
import { DataGrid } from "../../root/DataGridRoot";
import type { UseDataGridPaginationConfig } from "./DataGridPagination.types";
import { paginateData } from "./helpers/paginateData";
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
const MANY_ROWS = createRows(1000);

const columns: DataGrid.Columns<Row> = [
  { id: "id", header: "Id", bodyCell: (row) => row.id, align: "right" },
  { id: "name", header: "Navn", bodyCell: (row) => row.name },
  { id: "role", header: "Rolle", bodyCell: (row) => row.role },
];

const sortableColumns: DataGrid.Columns<Row> = columns.map((column) => ({
  ...column,
  isSortable: column.id === "id",
}));

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
  withPreferences = false,
}: {
  data?: Row[];
  initialPageSize?: number;
  position?: UseDataGridPaginationConfig["position"];
  align?: UseDataGridPaginationConfig["align"];
  withPreferences?: boolean;
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
      {withPreferences && <DataGrid.Preferences />}
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

export const ClientSideLoading: Story = {
  render: function ClientSideLoadingStory() {
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(3);
    const [pageSize, setPageSize] = useState(10);

    const pagination = useDataGridPagination({
      page,
      onPageChange: setPage,
      pageSize,
      onPageSizeChange: (nextSize) => {
        setPageSize(nextSize);
        setPage(1);
      },
      totalRows: isLoading ? 0 : ROWS.length,
    });

    const pageRows = useMemo(
      () => (isLoading ? [] : paginateData(ROWS, page, pageSize)),
      [isLoading, page, pageSize],
    );

    return (
      <StoryPage description="Paginering på klientsiden med lasting. Starter i lastetilstand uten data, med side 3 som startside. Knappen veksler mellom lasting og ferdig lastet data.">
        <div>
          <button type="button" onClick={() => setIsLoading((value) => !value)}>
            {isLoading ? "Fullfør lasting" : "Last inn på nytt"}
          </button>
        </div>
        <DataGrid
          columns={columns}
          data={pageRows}
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

export const ServerSide: Story = {
  render: function ServerSideStory() {
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
      totalRows: ROWS.length,
    });

    return (
      <StoryPage description="Paginering på serversiden med kjent antall rader (totalRows). Tabellen får bare radene for gjeldende side.">
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

export const WithPreferences: Story = {
  render: () => (
    <StoryPage description="Paginering kombinert med DataGrid.Preferences.">
      <ClientPagedGrid withPreferences />
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

export const SinglePage: Story = {
  render: () => (
    <StoryPage description="7 rader, alle på én side — pagineringslinjen skjules automatisk.">
      <ClientPagedGrid data={ROWS.slice(0, 7)} />
    </StoryPage>
  ),
};

export const EmptyData: Story = {
  render: () => (
    <StoryPage description="Ingen rader og ingen lasting — pagineringslinjen skjules automatisk.">
      <ClientPagedGrid data={[]} />
    </StoryPage>
  ),
};

export const ManyPages: Story = {
  render: () => (
    <StoryPage description="1000 rader fordelt på 100 sider.">
      <ClientPagedGrid data={MANY_ROWS} />
    </StoryPage>
  ),
};

export const WithRowSelection: Story = {
  render: function WithRowSelectionStory() {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [selected, setSelected] = useState<string[]>([]);

    const pagination = useDataGridPagination({
      page,
      onPageChange: setPage,
      pageSize,
      onPageSizeChange: (nextSize) => {
        setPageSize(nextSize);
        setPage(1);
      },
      totalRows: ROWS.length,
    });

    const pageRows = useMemo(
      () => paginateData(ROWS, page, pageSize),
      [page, pageSize],
    );

    return (
      <StoryPage
        description={`Flervalg av rader med paginering. «Velg alle» velger bare radene på gjeldende side. Valgte rader: ${selected.length}.`}
      >
        <DataGrid
          columns={columns}
          data={pageRows}
          getRowId={getRowId}
          plugins={{ pagination }}
          selection={{
            mode: "multiple",
            onSelectedRowIdsChange: (ids) => setSelected([...ids]),
          }}
        >
          <DataGrid.Table aria-label="Personer" />
        </DataGrid>
      </StoryPage>
    );
  },
};

export const ResetPageOnSort: Story = {
  render: function ResetPageOnSortStory() {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [sort, setSort] = useState<DataGrid.Table.SortEntry[]>([]);
    const direction = sort[0]?.direction;

    const sortedRows = useMemo(
      () =>
        [...ROWS].sort((a, b) =>
          direction === "desc" ? b.id - a.id : a.id - b.id,
        ),
      [direction],
    );

    const pagination = useDataGridPagination({
      page,
      onPageChange: setPage,
      pageSize,
      onPageSizeChange: (nextSize) => {
        setPageSize(nextSize);
        setPage(1);
      },
      totalRows: sortedRows.length,
    });

    const pageRows = useMemo(
      () => paginateData(sortedRows, page, pageSize),
      [sortedRows, page, pageSize],
    );

    return (
      <StoryPage description="Tilbakestilling til side 1 ved sortering håndteres i onSortOrderChange. Id-kolonnen kan sorteres.">
        <DataGrid
          columns={sortableColumns}
          data={pageRows}
          getRowId={getRowId}
          plugins={{ pagination }}
        >
          <DataGrid.Table
            aria-label="Personer"
            sorting={{
              sortOrder: sort,
              onSortOrderChange: (nextSort) => {
                setSort(nextSort);
                setPage(1);
              },
              allowMultiSort: false,
            }}
          />
        </DataGrid>
      </StoryPage>
    );
  },
};
