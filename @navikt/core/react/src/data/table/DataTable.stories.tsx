import { Meta, StoryObj } from "@storybook/react-vite";
import React, { useState } from "react";
import { DataTable } from ".";
import { Checkbox } from "../../form/checkbox";

const meta: Meta<typeof DataTable> = {
  title: "ds-react/Data/DataTable",
  component: DataTable,
  parameters: {
    chromatic: { disable: true },
  },
};

type Story = StoryObj<typeof DataTable>;

export default meta;

export const Default: Story = {
  render: (props) => (
    <DataTable
      rowDensity={props.rowDensity}
      style={{ width: "500px" }}
      zebraStripes={props.zebraStripes}
      truncateContent={props.truncateContent}
    >
      <DataTable.Thead>
        <DataTable.Tr>
          <DataTable.Th>Header 1</DataTable.Th>
          <DataTable.Th>Header 2</DataTable.Th>
        </DataTable.Tr>
      </DataTable.Thead>
      <DataTable.Tbody>
        <DataTable.Tr>
          <DataTable.Td>Data 1</DataTable.Td>
          <DataTable.Td>Data 2</DataTable.Td>
        </DataTable.Tr>
        <DataTable.Tr>
          <DataTable.Td>Data 1</DataTable.Td>
          <DataTable.Td>Data 2</DataTable.Td>
        </DataTable.Tr>
        <DataTable.Tr>
          <DataTable.Td>Data 1</DataTable.Td>
          <DataTable.Td>
            Very long content that should be truncated
          </DataTable.Td>
        </DataTable.Tr>
      </DataTable.Tbody>
    </DataTable>
  ),
  args: {
    rowDensity: "normal",
    zebraStripes: false,
    truncateContent: true,
  },
  argTypes: {
    rowDensity: {
      control: { type: "radio" },
      options: ["condensed", "normal", "spacious"],
      defaultValue: "normal",
    },
    zebraStripes: {
      control: { type: "boolean" },
    },
    truncateContent: {
      control: { type: "boolean" },
    },
  },
};

export const Selected: Story = {
  render: () => {
    const useToggleList = (initialState) => {
      const [list, setList] = useState(initialState);

      return [
        list,
        (value) =>
          setList((oldList) =>
            oldList.includes(value)
              ? oldList.filter((id) => id !== value)
              : [...oldList, value],
          ),
      ];
    };

    const [selectedRows, toggleSelectedRow] = useToggleList(["2"]);

    return (
      <DataTable style={{ width: "500px" }}>
        <DataTable.Thead>
          <DataTable.Tr>
            <DataTable.Th>
              <Checkbox
                size="small"
                indeterminate={
                  selectedRows.length > 0 && selectedRows.length < 3
                }
                onChange={() => {
                  if (selectedRows.length === 3) {
                    selectedRows.forEach((id) => {
                      toggleSelectedRow(id);
                    });
                  } else {
                    ["1", "2", "3"].forEach((id) => {
                      if (!selectedRows.includes(id)) {
                        toggleSelectedRow(id);
                      }
                    });
                  }
                }}
              >
                Velg alle
              </Checkbox>
            </DataTable.Th>
            <DataTable.Th>Header 1</DataTable.Th>
            <DataTable.Th>Header 2</DataTable.Th>
          </DataTable.Tr>
        </DataTable.Thead>
        <DataTable.Tbody>
          <DataTable.Tr selected={selectedRows.includes("1")}>
            <DataTable.Td>
              <Checkbox
                hideLabel
                size="small"
                checked={selectedRows.includes("1")}
                onChange={() => toggleSelectedRow("1")}
              >
                {" "}
              </Checkbox>
            </DataTable.Td>
            <DataTable.Td>Data 1</DataTable.Td>
            <DataTable.Td>Data 2</DataTable.Td>
          </DataTable.Tr>
          <DataTable.Tr selected={selectedRows.includes("2")}>
            <DataTable.Td>
              <Checkbox
                hideLabel
                size="small"
                checked={selectedRows.includes("2")}
                onChange={() => toggleSelectedRow("2")}
                aria-labelledby="test"
              >
                {" "}
              </Checkbox>
            </DataTable.Td>
            <DataTable.Td id="test">Data 1</DataTable.Td>
            <DataTable.Td>Data 2</DataTable.Td>
          </DataTable.Tr>
          <DataTable.Tr selected={selectedRows.includes("3")}>
            <DataTable.Td>
              <Checkbox
                hideLabel
                size="small"
                checked={selectedRows.includes("3")}
                onChange={() => toggleSelectedRow("3")}
              >
                {" "}
              </Checkbox>
            </DataTable.Td>
            <DataTable.Td>Data 1</DataTable.Td>
            <DataTable.Td>Data 2</DataTable.Td>
          </DataTable.Tr>
        </DataTable.Tbody>
      </DataTable>
    );
  },
};
