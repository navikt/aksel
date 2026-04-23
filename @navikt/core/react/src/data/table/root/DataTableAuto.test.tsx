import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, test } from "vitest";
import { DataTableColumnHeader } from "../column-header/DataTableColumnHeader";
import type { ColumnDefinitions } from "./DataTable.types";
import { DataTableAuto } from "./DataTableAuto";
import { DataTable } from "./DataTableRoot";

type TestRow = {
  id: string;
  name: string;
  subRows?: TestRow[];
};

const data: TestRow[] = [
  {
    id: "root",
    name: "Root",
    subRows: [{ id: "child", name: "Child" }],
  },
];

const fallbackIdData: TestRow[] = [
  {
    id: "unused-root-1",
    name: "Root",
    subRows: [{ id: "unused-child", name: "Child" }],
  },
  {
    id: "unused-root-2",
    name: "Sibling",
  },
];

const columns: ColumnDefinitions<TestRow> = [
  {
    id: "name",
    label: "Name",
    header: "Name",
    cell: (row) => row.name,
  },
];

describe("DataTableAuto", () => {
  test("renders expanded child rows and includes them in select-all", () => {
    render(
      <DataTableAuto
        columnDefinitions={columns}
        data={data}
        getRowId={(row) => row.id}
        getSubRows={(row) => row.subRows ?? []}
        selectionMode="multiple"
      />,
    );

    expect(screen.queryByText("Child")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Vis under-rader" }));

    expect(screen.getByText("Child")).toBeInTheDocument();
    expect(screen.getAllByRole("checkbox")).toHaveLength(3);

    fireEvent.click(
      screen.getByRole("checkbox", { name: "Velg alle synlige rader" }),
    );

    expect(
      screen
        .getAllByRole("checkbox")
        .every((checkbox) => (checkbox as HTMLInputElement).checked),
    ).toBe(true);
  });

  test("select-all checks all visible rows when fallback ids are used", () => {
    render(
      <DataTableAuto
        columnDefinitions={columns}
        data={fallbackIdData}
        getSubRows={(row) => row.subRows ?? []}
        defaultExpandedSubRowIds={[0]}
        selectionMode="multiple"
      />,
    );

    fireEvent.click(
      screen.getByRole("checkbox", { name: "Velg alle synlige rader" }),
    );

    const rowCheckboxes = screen
      .getAllByRole("checkbox")
      .slice(1) as HTMLInputElement[];

    expect(rowCheckboxes).toHaveLength(3);
    expect(rowCheckboxes.every((checkbox) => checkbox.checked)).toBe(true);
  });

  test("does not render expansion controls in the manual table variant", () => {
    render(
      <DataTable>
        <DataTable.Thead>
          <DataTable.Tr>
            <DataTableColumnHeader>Name</DataTableColumnHeader>
          </DataTable.Tr>
        </DataTable.Thead>
        <DataTable.Tbody>
          <DataTable.Tr>
            <DataTable.Td>Root</DataTable.Td>
          </DataTable.Tr>
        </DataTable.Tbody>
      </DataTable>,
    );

    expect(screen.getByText("Root")).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /vis detaljer|skjul detaljer/i }),
    ).not.toBeInTheDocument();
  });
});
