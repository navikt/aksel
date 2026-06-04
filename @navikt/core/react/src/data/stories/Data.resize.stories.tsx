import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { expect, within } from "storybook/test";
import { DataGrid } from "../../data-grid";
import { DataGridTable } from "../table";

const meta: Meta<typeof DataGridTable> = {
  title: "ds-react/Data/Resize",
  component: DataGridTable,
  parameters: {
    chromatic: { disable: true },
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj<DataGrid.Props<Row>>;

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
        <DataGrid.Table />
      </DataGrid>
    );
  },
  args: {
    data: testData,
    columns: [
      {
        id: "left",
        header: "Left",
        align: "left",
        bodyCell: (row) => row.left,
      },
      {
        id: "center",
        header: "Center",
        align: "center",
        bodyCell: (row) => row.center,
      },
      {
        id: "right",
        header: "Right",
        align: "right",
        bodyCell: (row) => row.right,
      },
    ],
  },
};

export const ResizeMinMax: Story = {
  args: {
    data: testData,
    columns: [
      {
        id: "left",
        header: "Left",
        align: "left",
        width: {
          defaultValue: 250,
          resizeMin: 100,
          resizeMax: 200,
        },
        bodyCell: (row) => row.left,
      },
      {
        id: "center",
        header: "Center",
        align: "center",
        width: {
          resizeMin: 50,
          resizeMax: 400,
        },
        bodyCell: (row) => row.center,
      },
      {
        id: "right",
        header: "Right",
        align: "right",
        width: {
          defaultValue: 150,
          resizeMin: 200,
          resizeMax: 400,
        },
        bodyCell: (row) => row.right,
      },
    ],
  },
};

export const ResizeDefaultStaticWidth: Story = {
  args: {
    data: testData,
    columns: [
      {
        id: "left",
        header: "Left",
        align: "left",
        width: { defaultValue: "300px" },
        bodyCell: (row) => row.left,
      },
      {
        id: "center",
        header: "Center",
        align: "center",
        width: { defaultValue: "300px" },
        bodyCell: (row) => row.center,
      },
      {
        id: "right",
        header: "Right",
        align: "right",
        width: { defaultValue: "300px" },
        bodyCell: (row) => row.right,
      },
    ],
  },
};

export const ResizeDefaultDynamicWidth: Story = {
  args: {
    data: testData,
    columns: [
      {
        id: "left",
        header: "Left",
        align: "left",
        width: { defaultValue: "100%" },
        bodyCell: (row) => row.left,
      },
      {
        id: "center",
        header: "Center",
        align: "center",
        width: { defaultValue: "100%" },
        bodyCell: (row) => row.center,
      },
      {
        id: "right",
        header: "Right",
        align: "right",
        width: { defaultValue: "100%" },
        bodyCell: (row) => row.right,
      },
    ],
  },
};

export const ResizeAuto: Story = {
  args: {
    data: testData,
    columns: [
      {
        id: "nested",
        header: "Nested",
        width: {
          defaultValue: 200,
          autoResizeOnce: true,
        },
        bodyCell: () => "Nested",
      },
      {
        id: "left",
        header: "L",
        align: "left",
        width: {
          defaultValue: 200,
          autoResizeOnce: true,
        },
        bodyCell: (row) => row.left,
      },
      {
        id: "center",
        header: "C",
        align: "center",
        width: {
          defaultValue: 200,
          autoResizeOnce: true,
        },
        bodyCell: (row) => row.center,
      },
      {
        id: "right",
        header: "R",
        align: "right",
        width: {
          defaultValue: 200,
          autoResizeOnce: true,
        },
        bodyCell: (row) => row.right,
      },
      {
        id: "headingIsWidest",
        header: "Heading is widest",
        width: {
          defaultValue: 50,
          autoResizeOnce: true,
        },
        bodyCell: () => "Test",
      },
      {
        id: "headingIsWidestSortable",
        header: "Heading is widest + sortable",
        width: {
          defaultValue: 50,
          autoResizeOnce: true,
        },
        isSortable: true,
        bodyCell: () => "Test",
      },
      {
        id: "blockContent",
        header: "Block content",
        width: {
          defaultValue: 300,
          autoResizeOnce: true,
        },
        bodyCell: () => <div>This is inside a div</div>,
      },
    ],
    getRowId: (row) => row.left,
  },
  render: (props) => {
    const [showTable, setShowTable] = React.useState(false);
    return showTable ? (
      <DataGrid {...props}>
        <DataGrid.Table<Row>
          subRows={{
            getRows: (row) =>
              row.left.includes(".")
                ? []
                : [
                    {
                      left: `${row.left}.1`,
                      center: "Yes",
                      right: "100",
                    },
                  ],
          }}
        />
      </DataGrid>
    ) : (
      <button onClick={() => setShowTable(true)}>Show table</button>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: "Show table" });
    await canvasElement.ownerDocument.fonts.ready;
    await button.click();

    const headers = canvas.getAllByRole("columnheader");

    expect(headers.length).toBe(7);
    expect(headers[0]).toHaveStyle({ width: "126px" });
    expect(headers[1]).toHaveStyle({ width: "80px" });
    expect(headers[2]).toHaveStyle({ width: "82px" });
    expect(headers[3]).toHaveStyle({ width: "103px" });
    expect(headers[4]).toHaveStyle({ width: "168px" });
    expect(headers[5]).toHaveStyle({ width: "248px" });
    expect(headers[6]).toHaveStyle({ width: "168px" });
  },
};
