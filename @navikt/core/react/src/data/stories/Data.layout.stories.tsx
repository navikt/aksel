import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { DataTable, type DataTableProps } from "../table";
import type { ColumnDefinitions } from "../table/root/DataTable.types";
import { type PersonInfo, sampleData } from "./dummy-data";

const meta: Meta<typeof DataTable> = {
  title: "ds-react/Data/Layout",
  component: DataTable,
  parameters: {
    chromatic: { disable: true },
    layout: "padded",
  },
};

export default meta;

const columnDefinitions: ColumnDefinitions<PersonInfo> = [
  { id: "id", label: "Id", cell: (row) => row.name },
  { id: "name", label: "Name", cell: (row) => row.name },
  { id: "nationalId", label: "National id", cell: (row) => row.nationalId },
  { id: "dayJob", label: "Day job", cell: (row) => row.dayJob },
  { id: "supervisor", label: "Supervisor", cell: (row) => row.supervisor },
  {
    id: "dateReceived",
    label: "Date received",
    cell: (row) => row.dateReceived,
  },
  {
    id: "message",
    label: "Message",
    cell: (row) => row.message,
  },
  { id: "age", label: "Age", cell: (row) => row.age },
  {
    id: "forceSensitive",
    label: "Force sensitive",
    cell: (row) => (row.forceSensitive ? "Yes" : "No"),
  },
  { id: "homeSystem", label: "Home system", cell: (row) => row.homeSystem },
  {
    id: "skills",
    label: "Skills",
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
  { id: "col1", label: "Column 1", cell: (row) => row.col1 },
  { id: "col2", label: "Column 2", cell: (row) => row.col2 },
  { id: "col3", label: "Column 3", cell: (row) => row.col3 },
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

export const AutoLayoutMinimal: StoryObj<DataTableProps<MinimalRow>> = {
  args: {
    layout: "auto",
    data: minimalData,
    columnDefinitions: minimalColumns,
  },
};

export const AutoLayoutOverflowX: StoryObj<DataTableProps<PersonInfo>> = {
  args: {
    layout: "auto",
    truncateContent: true,
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
};

export const AutoLayoutNoCellTruncation: StoryObj<DataTableProps<PersonInfo>> =
  {
    args: {
      layout: "auto",
      truncateContent: false,
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
  };

export const AutoLayoutSortable: StoryObj<DataTableProps<SortableRow>> = {
  args: {
    layout: "auto",
    data: sortableData,
    columnDefinitions: [
      {
        id: "left",
        label: "Left",
        sortable: true,
        cell: (row) => row.left,
      },
      {
        id: "center",
        label: "Center",
        sortable: true,
        cell: (row) => row.center,
      },
      {
        id: "right",
        label: "Right",
        sortable: true,
        cell: (row) => row.right,
      },
    ],
  },
};

export const FixedLayoutMinimal: StoryObj<DataTableProps<MinimalRow>> = {
  args: {
    layout: "fixed",
    data: minimalData,
    columnDefinitions: minimalColumns,
  },
};

export const FixedLayoutDynamicWidth: StoryObj<DataTableProps<MinimalRow>> = {
  args: {
    layout: "fixed",
    data: minimalData,
    columnDefinitions: minimalColumns.map((col) => ({
      ...col,
      defaultWidth: "100%",
    })),
  },
};
