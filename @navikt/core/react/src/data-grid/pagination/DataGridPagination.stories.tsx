import type { Meta, StoryObj } from "@storybook/react-vite";
import React, { useRef, useState } from "react";
import { VStack } from "../../primitives/stack";
import { BodyLong } from "../../typography";
import { DataGrid } from "../root/DataGridRoot";

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

function PagedGrid({
  data = ROWS,
  paginationAbove = false,
}: {
  data?: Row[];
  paginationAbove?: boolean;
}) {
  return (
    <DataGrid
      columns={columns}
      data={data}
      getRowId={getRowId}
      pagination={{ defaultPageSize: 10 }}
    >
      <DataGrid.Table
        aria-label="Personer"
        topContent={paginationAbove ? <DataGrid.Pagination /> : undefined}
        bottomContent={<DataGrid.Pagination />}
      />
    </DataGrid>
  );
}

export const Default: Story = {
  render: () => (
    <StoryPage description="Paginering på klientsiden. 137 rader, 10 rader per side. Hold Shift og klikk eller trykk Enter eller mellomrom på en sideknapp for å gå til første eller siste side.">
      <PagedGrid />
    </StoryPage>
  ),
};

export const ClientSideLoading: Story = {
  render: () => {
    const [isLoading, setIsLoading] = useState(true);

    return (
      <StoryPage description="Paginering på klientsiden med lasting. Starter i lastetilstand uten data, med side 3 som startside (defaultPage: 2). Knappen veksler mellom lasting og ferdig lastet data.">
        <div>
          <button type="button" onClick={() => setIsLoading((value) => !value)}>
            {isLoading ? "Fullfør lasting" : "Last inn på nytt"}
          </button>
        </div>
        <DataGrid
          columns={columns}
          data={isLoading ? [] : ROWS}
          getRowId={getRowId}
          isLoading={isLoading}
          pagination={{ defaultPage: 2 }}
        >
          <DataGrid.Table
            aria-label="Personer"
            bottomContent={<DataGrid.Pagination />}
          />
        </DataGrid>
      </StoryPage>
    );
  },
};

export const ServerSide: Story = {
  render: () => {
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    return (
      <StoryPage description="Paginering på serversiden med kjent antall rader (totalRows). Tabellen får bare radene for gjeldende side.">
        <DataGrid
          columns={columns}
          data={ROWS.slice(page * pageSize, (page + 1) * pageSize)}
          getRowId={getRowId}
          pagination={{
            mode: "server",
            page,
            onPageChange: setPage,
            pageSize,
            onPageSizeChange: setPageSize,
            totalRows: ROWS.length,
          }}
        >
          <DataGrid.Table
            aria-label="Personer"
            bottomContent={<DataGrid.Pagination />}
          />
        </DataGrid>
      </StoryPage>
    );
  },
};

export const ServerSideWithLoading: Story = {
  render: () => {
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [rows, setRows] = useState(() => ROWS.slice(0, 10));
    const [isLoading, setIsLoading] = useState(false);
    const request = useRef({ page: 0, pageSize: 10 });
    const timer = useRef<number>(undefined);

    const fetchPage = (next: Partial<typeof request.current>) => {
      request.current = { ...request.current, ...next };
      setPage(request.current.page);
      setPageSize(request.current.pageSize);
      /* Set isLoading in the same update as the page request, so the announcement waits for the new rows */
      setIsLoading(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => {
        const { page: p, pageSize: size } = request.current;
        setRows(ROWS.slice(p * size, (p + 1) * size));
        setIsLoading(false);
      }, 1500);
    };

    return (
      <StoryPage description="Paginering på serversiden med simulert henting av data. Bytte av side eller antall rader per side gir 1,5 sekunder lasting.">
        <DataGrid
          columns={columns}
          data={rows}
          getRowId={getRowId}
          isLoading={isLoading}
          pagination={{
            mode: "server",
            page,
            onPageChange: (nextPage) => fetchPage({ page: nextPage }),
            pageSize,
            onPageSizeChange: (nextSize) =>
              fetchPage({ page: 0, pageSize: nextSize }),
            totalRows: ROWS.length,
          }}
        >
          <DataGrid.Table
            aria-label="Personer"
            bottomContent={<DataGrid.Pagination />}
          />
        </DataGrid>
      </StoryPage>
    );
  },
};

export const UnknownTotal: Story = {
  render: () => {
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    return (
      <StoryPage description="Paginering på serversiden uten kjent totalt antall rader (hasNextPage).">
        <DataGrid
          columns={columns}
          data={ROWS.slice(page * pageSize, (page + 1) * pageSize)}
          getRowId={getRowId}
          pagination={{
            mode: "server",
            page,
            onPageChange: setPage,
            pageSize,
            onPageSizeChange: setPageSize,
            hasNextPage: (page + 1) * pageSize < ROWS.length,
          }}
        >
          <DataGrid.Table
            aria-label="Personer"
            bottomContent={<DataGrid.Pagination />}
          />
        </DataGrid>
      </StoryPage>
    );
  },
};

export const FixedPageSize: Story = {
  render: () => (
    <StoryPage description="Fast antall rader per side (allowPageSizeChange: false). 25 rader per side.">
      <DataGrid
        columns={columns}
        data={ROWS}
        getRowId={getRowId}
        pagination={{ defaultPageSize: 25, allowPageSizeChange: false }}
      >
        <DataGrid.Table
          aria-label="Personer"
          bottomContent={<DataGrid.Pagination />}
        />
      </DataGrid>
    </StoryPage>
  ),
};

export const PaginationAboveAndBelow: Story = {
  render: () => (
    <StoryPage description="Paginering både over og under tabellen.">
      <PagedGrid paginationAbove />
    </StoryPage>
  ),
};

export const NarrowContainer: Story = {
  render: () => (
    <StoryPage description="Tabellen ligger i en container på 20rem. Under 22rem skjules sidefeltet og «Side X av Y».">
      <div style={{ maxWidth: "20rem" }}>
        <PagedGrid />
      </div>
    </StoryPage>
  ),
};

export const SinglePage: Story = {
  render: () => (
    <StoryPage description="7 rader, alle på én side.">
      <PagedGrid data={ROWS.slice(0, 7)} />
    </StoryPage>
  ),
};

export const EmptyData: Story = {
  render: () => (
    <StoryPage description="Ingen rader og ingen lasting.">
      <PagedGrid data={[]} />
    </StoryPage>
  ),
};

export const ManyPages: Story = {
  render: () => (
    <StoryPage description="1000 rader fordelt på 100 sider.">
      <PagedGrid data={MANY_ROWS} />
    </StoryPage>
  ),
};

export const WithRowSelection: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>([]);

    return (
      <StoryPage
        description={`Flervalg av rader med paginering. «Velg alle» velger bare radene på gjeldende side. Valgte rader: ${selected.length}.`}
      >
        <DataGrid
          columns={columns}
          data={ROWS}
          getRowId={getRowId}
          pagination={{ defaultPageSize: 10 }}
          selection={{
            mode: "multiple",
            onSelectedRowIdsChange: (ids) => setSelected([...ids]),
          }}
        >
          <DataGrid.Table
            aria-label="Personer"
            bottomContent={<DataGrid.Pagination />}
          />
        </DataGrid>
      </StoryPage>
    );
  },
};

export const ResetPageOnSort: Story = {
  render: () => {
    const [sort, setSort] = useState<DataGrid.Table.SortEntry[]>([]);
    const direction = sort[0]?.direction;
    const sortedRows = [...ROWS].sort((a, b) =>
      direction === "desc" ? b.id - a.id : a.id - b.id,
    );

    return (
      <StoryPage description="Paginering på klientsiden går tilbake til første side når sorteringen endres. Id-kolonnen kan sorteres.">
        <DataGrid
          columns={sortableColumns}
          data={sortedRows}
          getRowId={getRowId}
          pagination={{ defaultPageSize: 10 }}
        >
          <DataGrid.Table
            aria-label="Personer"
            sorting={{
              sortOrder: sort,
              onSortOrderChange: setSort,
              allowMultiSort: false,
            }}
            bottomContent={<DataGrid.Pagination />}
          />
        </DataGrid>
      </StoryPage>
    );
  },
};
