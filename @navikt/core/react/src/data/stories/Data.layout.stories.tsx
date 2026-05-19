import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { DataGrid, type DataGridProps } from "../../data-grid";
import { DataGridTable, type DataTableProps } from "../table";
import type { ColumnDefinitions } from "../table/root/DataGridTable.types";
import { type PersonInfo, sampleData } from "./dummy-data";

const meta: Meta<typeof DataGridTable> = {
  title: "ds-react/Data/Layout",
  component: DataGridTable,
  parameters: {
    chromatic: { disable: true },
    layout: "padded",
  },
};

export default meta;

const columnDefinitions: ColumnDefinitions<PersonInfo> = [
  { id: "id", header: "Id", cell: (row) => row.name },
  { id: "name", header: "Name", cell: (row) => row.name },
  { id: "nationalId", header: "National id", cell: (row) => row.nationalId },
  { id: "dayJob", header: "Day job", cell: (row) => row.dayJob },
  { id: "supervisor", header: "Supervisor", cell: (row) => row.supervisor },
  {
    id: "dateReceived",
    header: "Date received",
    cell: (row) => row.dateReceived,
  },
  {
    id: "message",
    header: "Message",
    cell: (row) => row.message,
  },
  { id: "age", header: "Age", cell: (row) => row.age },
  {
    id: "forceSensitive",
    header: "Force sensitive",
    cell: (row) => (row.forceSensitive ? "Yes" : "No"),
  },
  { id: "homeSystem", header: "Home system", cell: (row) => row.homeSystem },
  {
    id: "skills",
    header: "Skills",
    cell: (row) => row.skills.join(", "),
  },
];

type MinimalRow = {
  col1: string;
  col2: string;
  col3: string;
};

const minimalData: MinimalRow[] = [
  { col1: "Test", col2: "Example", col3: "Demo of small table" },
];

const minimalColumns: ColumnDefinitions<MinimalRow> = [
  { id: "col1", header: "Column 1", cell: (row) => row.col1 },
  { id: "col2", header: "Column 2", cell: (row) => row.col2 },
  { id: "col3", header: "Column 3", cell: (row) => row.col3 },
];

type SortableRow = {
  left: string;
  center: string;
  right: string;
};

const sortableData: SortableRow[] = [
  { left: "Data 1", center: "Yes", right: "100 500" },
  { left: "Data 2", center: "No", right: "2 000 200" },
  { left: "Data 3", center: "Maybe", right: "1 000 200" },
];

export const AutoLayoutMinimal: StoryObj<{
  table: DataTableProps<MinimalRow>;
  grid: Omit<DataGridProps<MinimalRow>, "children">;
}> = {
  render: (args) => {
    return (
      <DataGrid {...args.grid}>
        <DataGrid.Table {...args.table} />
      </DataGrid>
    );
  },
  args: {
    table: {
      layout: "auto",
    },
    grid: { data: minimalData, columnDefinitions: minimalColumns },
  },
};

export const AutoLayoutOverflowX: StoryObj<{
  table: DataTableProps<PersonInfo>;
  grid: Omit<DataGridProps<PersonInfo>, "children">;
}> = {
  render: (args) => {
    return (
      <DataGrid {...args.grid}>
        <DataGrid.Table {...args.table} />
      </DataGrid>
    );
  },
  args: {
    table: { layout: "auto" },
    grid: {
      settings: { defaultValue: { table: { truncateContent: true } } },
      data: sampleData.slice(0, 4),
      columnDefinitions: columnDefinitions.map((col) =>
        col.id === "message"
          ? {
              ...col,
              cell: (row: PersonInfo) => (
                <div style={{ maxWidth: 200 }}>{row.message}</div>
              ),
            }
          : col,
      ),
    },
  },
};

export const AutoLayoutNoCellTruncation: StoryObj<{
  table: DataTableProps<PersonInfo>;
  grid: Omit<DataGridProps<PersonInfo>, "children">;
}> = {
  render: (args) => {
    return (
      <DataGrid {...args.grid}>
        <DataGrid.Table {...args.table} />
      </DataGrid>
    );
  },
  args: {
    table: { layout: "auto" },
    grid: {
      settings: { defaultValue: { table: { truncateContent: false } } },
      data: sampleData.slice(0, 3),
      columnDefinitions: columnDefinitions.map((col) =>
        col.id === "message"
          ? {
              ...col,
              cell: (row: PersonInfo) =>
                row.message.split(" ").slice(0, 4).join(" ") + ".",
            }
          : col,
      ),
    },
  },
};

export const AutoLayoutSortable: StoryObj<{
  table: DataTableProps<SortableRow>;
  grid: Omit<DataGridProps<SortableRow>, "children">;
}> = {
  render: (args) => {
    return (
      <DataGrid {...args.grid}>
        <DataGrid.Table {...args.table} />
      </DataGrid>
    );
  },
  args: {
    table: { layout: "auto" },
    grid: {
      data: sortableData,
      columnDefinitions: [
        {
          id: "left",
          header: "Left",
          sortable: true,
          cell: (row) => row.left,
        },
        {
          id: "center",
          header: "Center",
          sortable: true,
          cell: (row) => row.center,
        },
        {
          id: "right",
          header: "Right",
          sortable: true,
          cell: (row) => row.right,
        },
      ],
    },
  },
};

export const FixedLayoutMinimal: StoryObj<{
  table: DataTableProps<MinimalRow>;
  grid: Omit<DataGridProps<MinimalRow>, "children">;
}> = {
  render: (args) => {
    return (
      <DataGrid {...args.grid}>
        <DataGrid.Table {...args.table} />
      </DataGrid>
    );
  },
  args: {
    table: { layout: "fixed" },
    grid: { data: minimalData, columnDefinitions: minimalColumns },
  },
};

export const FixedLayoutDynamicWidth: StoryObj<{
  table: DataTableProps<MinimalRow>;
  grid: Omit<DataGridProps<MinimalRow>, "children">;
}> = {
  render: (args) => {
    return (
      <DataGrid {...args.grid}>
        <DataGrid.Table {...args.table} />
      </DataGrid>
    );
  },
  args: {
    table: { layout: "fixed" },
    grid: {
      data: minimalData,
      columnDefinitions: minimalColumns.map((col) => ({
        ...col,
        defaultWidth: "100%",
      })),
    },
  },
};
