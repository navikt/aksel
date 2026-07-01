import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { DataGridPreferences } from ".";
import { DataGrid } from "../data-grid";
import { Tag } from "../tag";

const meta: Meta<typeof DataGridPreferences> = {
  title: "ds-react/DataGrid/Preferences",
  component: DataGridPreferences,
  parameters: {
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj<typeof DataGridPreferences>;

export const Default: Story = {
  render: () => {
    return (
      <DataGrid columns={demoColumnDef} data={generateDemoData(5)}>
        {/* Div should be a separate "header" or "toolbar" component */}
        <div style={{ display: "flex", padding: "0.75rem 0.5rem" }}>
          <DataGridPreferences defaultOpen />
        </div>
        <DataGrid.Table />
      </DataGrid>
    );
  },
};

export const HiddenFields: Story = {
  render: () => {
    return (
      <DataGrid columns={demoColumnDef} data={generateDemoData(5)}>
        <div style={{ display: "flex", padding: "0.75rem 0.5rem" }}>
          <DataGridPreferences
            fields={{ textSize: false, zebraStripes: false }}
            defaultOpen
          />
        </div>
        <DataGrid.Table />
      </DataGrid>
    );
  },
};

export const AlwaysVisibleColumn: Story = {
  render: () => {
    return (
      <DataGrid
        columns={demoColumnDef}
        data={generateDemoData(5)}
        defaultSettings={{
          columnDisplay: demoColumnDef.map((col) => ({
            id: col.id,
            visible: col.id === "id" ? "always" : true,
          })),
        }}
      >
        <div style={{ display: "flex", padding: "0.75rem 0.5rem" }}>
          <DataGridPreferences defaultOpen />
        </div>
        <DataGrid.Table />
      </DataGrid>
    );
  },
};

export const ControlledOpenState: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <DataGrid
        columns={demoColumnDef}
        data={generateDemoData(5)}
        defaultSettings={{ zebraStripes: true }}
      >
        <div style={{ display: "flex", padding: "0.75rem 0.5rem" }}>
          <DataGridPreferences open={open} onOpenChange={setOpen} />
        </div>
        <DataGrid.Table />
      </DataGrid>
    );
  },
  parameters: {
    chromatic: { disable: true },
  },
};

type DemoRow = {
  id: number;
  foo: string;
  bar: string;
  on: boolean;
  time: Date;
};

const demoColumnDef: DataGrid.Columns<DemoRow> = [
  {
    id: "id",
    header: "Id",
    bodyCell: ({ id }) => id,
    align: "right",
    width: { defaultValue: "100px" },
  },
  {
    id: "foo",
    header: "Foo",
    bodyCell: ({ foo }) => foo,
  },
  {
    id: "bar",
    header: "Bar",
    bodyCell: ({ bar }) => (
      <Tag variant="strong" size="xsmall">
        {bar}
      </Tag>
    ),
  },
  {
    id: "on",
    header: "Boolean demo",
    bodyCell: ({ on }) => (on ? "Yes" : "No"),
  },
  {
    id: "time",
    header: "Time",
    bodyCell: ({ time }) => time.toISOString(),
  },
];

function generateDemoData(count: number, countFrom: number = 0): DemoRow[] {
  const num = (index: number) => (countFrom ? index + countFrom : index + 1);

  return Array.from({ length: count }, (_, i) => ({
    id: num(i) + 1,
    foo: `foo${num(i) + 1}`,
    bar: `bar${num(i) + 1}`,
    on: num(i) % 2 === 0,
    time: new Date(),
  }));
}
