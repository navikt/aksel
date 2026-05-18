import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { expect, within } from "storybook/test";
import { DataGrid, type DataGridProps } from "../data-grid";
import { DataTable } from "../table";

const meta: Meta<typeof DataTable> = {
  title: "ds-react/Data/Resize",
  component: DataTable,
  parameters: {
    chromatic: { disable: true },
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj<DataGridProps<Row>>;

type Row = {
  left: string;
  center: string;
  right: string;
};

const testData = [
  {
    left: "Data 1",
    center: "Yes",
    right: "100 500",
  },
  {
    left: "Data 2",
    center: "No",
    right: "2 000 200",
  },
  {
    left: "Data 3",
    center: "Maybe",
    right: "1 000 200",
  },
];

export const Resize: Story = {
  render: (args) => {
    return (
      <DataGrid {...args}>
        <DataTable />
      </DataGrid>
    );
  },
  args: {
    data: testData,
    columnDefinitions: [
      {
        id: "left",
        label: "Left",
        align: "left",
        cell: (row) => row.left,
      },
      {
        id: "center",
        label: "Center",
        align: "center",
        cell: (row) => row.center,
      },
      {
        id: "right",
        label: "Right",
        align: "right",
        cell: (row) => row.right,
      },
    ],
  },
};

export const ResizeMinMax: Story = {
  args: {
    data: testData,
    columnDefinitions: [
      {
        id: "left",
        label: "Left",
        align: "left",
        width: {
          default: 250,
          resizeMin: 100,
          resizeMax: 200,
        },
        cell: (row) => row.left,
      },
      {
        id: "center",
        label: "Center",
        align: "center",
        width: {
          resizeMin: 50,
          resizeMax: 400,
        },
        cell: (row) => row.center,
      },
      {
        id: "right",
        label: "Right",
        align: "right",
        width: {
          default: 150,
          resizeMin: 200,
          resizeMax: 400,
        },
        cell: (row) => row.right,
      },
    ],
  },
};

export const ResizeDefaultStaticWidth: Story = {
  args: {
    data: testData,
    columnDefinitions: [
      {
        id: "left",
        label: "Left",
        align: "left",
        width: { default: "300px" },
        cell: (row) => row.left,
      },
      {
        id: "center",
        label: "Center",
        align: "center",
        width: { default: "300px" },
        cell: (row) => row.center,
      },
      {
        id: "right",
        label: "Right",
        align: "right",
        width: { default: "300px" },
        cell: (row) => row.right,
      },
    ],
  },
};

export const ResizeDefaultDynamicWidth: Story = {
  args: {
    data: testData,
    columnDefinitions: [
      {
        id: "left",
        label: "Left",
        align: "left",
        width: { default: "100%" },
        cell: (row) => row.left,
      },
      {
        id: "center",
        label: "Center",
        align: "center",
        width: { default: "100%" },
        cell: (row) => row.center,
      },
      {
        id: "right",
        label: "Right",
        align: "right",
        width: { default: "100%" },
        cell: (row) => row.right,
      },
    ],
  },
};

export const ResizeAuto: Story = {
  args: {
    data: testData,
    columnDefinitions: [
      {
        id: "left",
        label: "L",
        align: "left",
        width: {
          default: 200,
          autoResizeOnce: true,
        },
        cell: (row) => row.left,
      },
      {
        id: "center",
        label: "C",
        align: "center",
        width: {
          default: 200,
          autoResizeOnce: true,
        },
        cell: (row) => row.center,
      },
      {
        id: "right",
        label: "R",
        align: "right",
        width: {
          default: 200,
          autoResizeOnce: true,
        },
        cell: (row) => row.right,
      },
      {
        id: "headingIsWidest",
        label: "Heading is widest",
        width: {
          default: 50,
          autoResizeOnce: true,
        },
        cell: () => "Test",
      },
      {
        id: "headingIsWidestSortable",
        label: "Heading is widest + sortable",
        width: {
          default: 50,
          autoResizeOnce: true,
        },
        sortable: true,
        cell: () => "Test",
      },
    ],
  },
  render: (props) => {
    const [showTable, setShowTable] = React.useState(false);
    return showTable ? (
      <DataGrid {...props}>
        <DataTable />
      </DataGrid>
    ) : (
      <button onClick={() => setShowTable(true)}>Show table</button>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await new Promise((r) => setTimeout(r, 200)); // Wait for font to load, so that correct widths are calculated.
    const button = canvas.getByRole("button", { name: "Show table" });
    button.click();
    await new Promise((r) => setTimeout(r, 100)); // Make sure auto resize has happened
    const headers = canvas.getAllByRole("columnheader");
    expect(headers.length).toBe(5);
    expect(headers[0]).toHaveStyle({ width: "80px" });
    expect(headers[1]).toHaveStyle({ width: "82px" });
    expect(headers[2]).toHaveStyle({ width: "102px" });
    expect(headers[3]).toHaveStyle({ width: "168px" });
    expect(headers[4]).toHaveStyle({ width: "248px" });
  },
};
