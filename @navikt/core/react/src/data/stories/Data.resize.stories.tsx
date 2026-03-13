import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
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

type Story = StoryObj<typeof DataTable>;

const DATA = [
  { name: "Arne", age: 42, city: "Oslo" },
  { name: "Bjørg", age: 31, city: "Bergen" },
  { name: "Carl", age: 55, city: "Trondheim" },
  { name: "Diana", age: 28, city: "Stavanger" },
];

export const Resize: Story = {
  render: () => (
    <DataTable withKeyboardNav>
      <DataTable.Thead>
        <DataTable.Tr>
          <DataTable.Th
            maxWidth="400px"
            minWidth="100px"
            defaultWidth="100%"
            textAlign="left"
          >
            Left
          </DataTable.Th>
          <DataTable.Th
            maxWidth="400px"
            minWidth="50px"
            defaultWidth="100%"
            textAlign="center"
          >
            Center
          </DataTable.Th>
          <DataTable.Th
            maxWidth="400px"
            minWidth="200px"
            defaultWidth="100%"
            textAlign="right"
          >
            Right
          </DataTable.Th>
        </DataTable.Tr>
      </DataTable.Thead>
      <DataTable.Tbody>
        <DataTable.Tr>
          <DataTable.Td>Data 1</DataTable.Td>
          <DataTable.Td textAlign="center">Yes</DataTable.Td>
          <DataTable.Td textAlign="right">100 500</DataTable.Td>
        </DataTable.Tr>
        <DataTable.Tr>
          <DataTable.Td>Data 2</DataTable.Td>
          <DataTable.Td textAlign="center">No</DataTable.Td>
          <DataTable.Td textAlign="right">2 000 200</DataTable.Td>
        </DataTable.Tr>
        <DataTable.Tr>
          <DataTable.Td>Data 3</DataTable.Td>
          <DataTable.Td textAlign="center">Maybe</DataTable.Td>
          <DataTable.Td textAlign="right">1 000 200</DataTable.Td>
        </DataTable.Tr>
      </DataTable.Tbody>
    </DataTable>
  ),
};

export const FrAutoSizing: Story = {
  render: () => (
    <DataTable style={{ width: "800px" }}>
      <DataTable.Thead>
        <DataTable.Tr>
          <DataTable.Th>Auto 1fr</DataTable.Th>
          <DataTable.Th>Auto 1fr</DataTable.Th>
          <DataTable.Th>Auto 1fr</DataTable.Th>
        </DataTable.Tr>
      </DataTable.Thead>
      <DataTable.Tbody>
        {DATA.map((row) => (
          <DataTable.Tr key={row.name}>
            <DataTable.Td>{row.name}</DataTable.Td>
            <DataTable.Td>{row.age}</DataTable.Td>
            <DataTable.Td>{row.city}</DataTable.Td>
          </DataTable.Tr>
        ))}
      </DataTable.Tbody>
    </DataTable>
  ),
};

export const MixedFrAndFixed: Story = {
  render: () => (
    <DataTable style={{ width: "800px" }}>
      <DataTable.Thead>
        <DataTable.Tr>
          <DataTable.Th defaultWidth={100}>Fixed 100px</DataTable.Th>
          <DataTable.Th defaultWidth="2fr">2fr</DataTable.Th>
          <DataTable.Th defaultWidth="1fr">1fr</DataTable.Th>
        </DataTable.Tr>
      </DataTable.Thead>
      <DataTable.Tbody>
        {DATA.map((row) => (
          <DataTable.Tr key={row.name}>
            <DataTable.Td>{row.name}</DataTable.Td>
            <DataTable.Td>{row.age}</DataTable.Td>
            <DataTable.Td>{row.city}</DataTable.Td>
          </DataTable.Tr>
        ))}
      </DataTable.Tbody>
    </DataTable>
  ),
};

export const UnequalFr: Story = {
  render: () => (
    <DataTable style={{ width: "800px" }}>
      <DataTable.Thead>
        <DataTable.Tr>
          <DataTable.Th defaultWidth="1fr">1fr</DataTable.Th>
          <DataTable.Th defaultWidth="2fr">2fr</DataTable.Th>
          <DataTable.Th defaultWidth="3fr">3fr</DataTable.Th>
        </DataTable.Tr>
      </DataTable.Thead>
      <DataTable.Tbody>
        {DATA.map((row) => (
          <DataTable.Tr key={row.name}>
            <DataTable.Td>{row.name}</DataTable.Td>
            <DataTable.Td>{row.age}</DataTable.Td>
            <DataTable.Td>{row.city}</DataTable.Td>
          </DataTable.Tr>
        ))}
      </DataTable.Tbody>
    </DataTable>
  ),
};
