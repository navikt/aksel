import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { DataTable, type DataTableProps } from "../table";

const meta: Meta<typeof DataTable> = {
  title: "ds-react/Data/Resize",
  component: DataTable,
  parameters: {
    chromatic: { disable: true },
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj<DataTableProps<Row>>;

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
        minWidth: 100,
        maxWidth: 200,
        defaultWidth: 250,
        cell: (row) => row.left,
      },
      {
        id: "center",
        label: "Center",
        align: "center",
        minWidth: 50,
        maxWidth: 400,
        cell: (row) => row.center,
      },
      {
        id: "right",
        label: "Right",
        align: "right",
        minWidth: 200,
        maxWidth: 400,
        defaultWidth: 150,
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
        defaultWidth: "300px",
        cell: (row) => row.left,
      },
      {
        id: "center",
        label: "Center",
        align: "center",
        defaultWidth: "300px",
        cell: (row) => row.center,
      },
      {
        id: "right",
        label: "Right",
        align: "right",
        defaultWidth: "300px",
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
        defaultWidth: "100%",
        cell: (row) => row.left,
      },
      {
        id: "center",
        label: "Center",
        align: "center",
        defaultWidth: "100%",
        cell: (row) => row.center,
      },
      {
        id: "right",
        label: "Right",
        align: "right",
        defaultWidth: "100%",
        cell: (row) => row.right,
      },
    ],
  },
};

export const ResizeAutoWidth: Story = {
  args: {
    data: testData,
    columnDefinitions: [
      {
        id: "left",
        label: "L",
        align: "left",
        defaultWidth: 200,
        autoWidth: true,
        cell: (row) => row.left,
      },
      {
        id: "center",
        label: "C",
        align: "center",
        defaultWidth: 200,
        autoWidth: true,
        cell: (row) => row.center,
      },
      {
        id: "right",
        label: "R",
        align: "right",
        defaultWidth: 200,
        autoWidth: true,
        cell: (row) => row.right,
      },
      {
        id: "headingIsWidest",
        label: "Heading is widest",
        defaultWidth: 50,
        autoWidth: true,
        cell: () => "Test",
      },
      {
        id: "headingIsWidest",
        label: "Heading is widest + sortable",
        defaultWidth: 50,
        autoWidth: true,
        sortable: true,
        cell: () => "Test",
      },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const headers = canvas.getAllByRole("columnheader");
    expect(headers.length).toBe(5);
    expect(headers[0].getBoundingClientRect().width).toBe(74);
    expect(headers[1].getBoundingClientRect().width).toBe(76);
    expect(headers[2].getBoundingClientRect().width).toBe(95);
    expect(headers[3].getBoundingClientRect().width).toBe(153);
    expect(headers[4].getBoundingClientRect().width).toBe(224);
  },
};
