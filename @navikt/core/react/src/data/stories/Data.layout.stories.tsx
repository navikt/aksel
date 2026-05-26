import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { DataGrid } from "../../data-grid";
import { DataGridTable } from "../table";
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

const columns: ColumnDefinitions<PersonInfo> = [
  { id: "id", header: "Id", bodyCell: (row) => row.name },
  { id: "name", header: "Name", bodyCell: (row) => row.name },
  {
    id: "nationalId",
    header: "National id",
    bodyCell: (row) => row.nationalId,
  },
  { id: "dayJob", header: "Day job", bodyCell: (row) => row.dayJob },
  { id: "supervisor", header: "Supervisor", bodyCell: (row) => row.supervisor },
  {
    id: "dateReceived",
    header: "Date received",
    bodyCell: (row) => row.dateReceived,
  },
  {
    id: "message",
    header: "Message",
    bodyCell: (row) => row.message,
  },
  { id: "age", header: "Age", bodyCell: (row) => row.age },
  {
    id: "forceSensitive",
    header: "Force sensitive",
    bodyCell: (row) => (row.forceSensitive ? "Yes" : "No"),
  },
  {
    id: "homeSystem",
    header: "Home system",
    bodyCell: (row) => row.homeSystem,
  },
  {
    id: "skills",
    header: "Skills",
    bodyCell: (row) => row.skills.join(", "),
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
  { id: "col1", header: "Column 1", bodyCell: (row) => row.col1 },
  { id: "col2", header: "Column 2", bodyCell: (row) => row.col2 },
  { id: "col3", header: "Column 3", bodyCell: (row) => row.col3 },
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
  table: DataGrid.Table.Props<MinimalRow>;
  grid: Omit<DataGrid.Props<MinimalRow>, "children">;
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
    grid: { data: minimalData, columns: minimalColumns },
  },
};

export const AutoLayoutOverflowX: StoryObj<{
  table: DataGrid.Table.Props<PersonInfo>;
  grid: Omit<DataGrid.Props<PersonInfo>, "children">;
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
      settings: { truncateContent: true },
      data: sampleData.slice(0, 4),
      columns: columns.map((col) =>
        col.id === "message"
          ? {
              ...col,
              bodyCell: (row: PersonInfo) => (
                <div style={{ maxWidth: 200 }}>{row.message}</div>
              ),
            }
          : col,
      ),
    },
  },
};

export const AutoLayoutNoCellTruncation: StoryObj<{
  table: DataGrid.Table.Props<PersonInfo>;
  grid: Omit<DataGrid.Props<PersonInfo>, "children">;
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
      settings: { truncateContent: false },
      data: sampleData.slice(0, 3),
      columns: columns.map((col) =>
        col.id === "message"
          ? {
              ...col,
              bodyCell: (row: PersonInfo) =>
                row.message.split(" ").slice(0, 4).join(" ") + ".",
            }
          : col,
      ),
    },
  },
};

export const AutoLayoutSortable: StoryObj<{
  table: DataGrid.Table.Props<SortableRow>;
  grid: Omit<DataGrid.Props<SortableRow>, "children">;
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
      columns: [
        {
          id: "left",
          header: "Left",
          isSortable: true,
          bodyCell: (row) => row.left,
        },
        {
          id: "center",
          header: "Center",
          isSortable: true,
          bodyCell: (row) => row.center,
        },
        {
          id: "right",
          header: "Right",
          isSortable: true,
          bodyCell: (row) => row.right,
        },
      ],
    },
  },
};

export const FixedLayoutMinimal: StoryObj<{
  table: DataGrid.Table.Props<MinimalRow>;
  grid: Omit<DataGrid.Props<MinimalRow>, "children">;
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
    grid: { data: minimalData, columns: minimalColumns },
  },
};

export const FixedLayoutDynamicWidth: StoryObj<{
  table: DataGrid.Table.Props<MinimalRow>;
  grid: Omit<DataGrid.Props<MinimalRow>, "children">;
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
      columns: minimalColumns.map((col) => ({
        ...col,
        defaultWidth: "100%",
      })),
    },
  },
};
