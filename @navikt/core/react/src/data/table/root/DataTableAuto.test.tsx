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

const deepNestedData: TestRow[] = [
  {
    id: "root",
    name: "Root",
    subRows: [
      {
        id: "child",
        name: "Child",
        subRows: [{ id: "grandchild", name: "Grandchild" }],
      },
    ],
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
        subRows={{ getSubRows: (row) => row.subRows ?? [] }}
        selection={{ selectionMode: "multiple" }}
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
        subRows={{
          getSubRows: (row) => row.subRows ?? [],
          defaultExpandedSubRowIds: [0],
        }}
        selection={{ selectionMode: "multiple" }}
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

  test("parent row selection follows visible nested rows", () => {
    render(
      <DataTableAuto
        columnDefinitions={columns}
        data={data}
        getRowId={(row) => row.id}
        subRows={{ getSubRows: (row) => row.subRows ?? [] }}
        selection={{ selectionMode: "multiple" }}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Vis under-rader" }));

    const getCheckboxes = () =>
      screen.getAllByRole("checkbox") as HTMLInputElement[];

    fireEvent.click(getCheckboxes()[2]);

    expect(getCheckboxes()[1].checked).toBe(false);
    expect(getCheckboxes()[1].indeterminate).toBe(true);

    fireEvent.click(getCheckboxes()[1]);

    expect(getCheckboxes()[1].checked).toBe(true);
    expect(getCheckboxes()[2].checked).toBe(true);

    fireEvent.click(getCheckboxes()[1]);

    expect(getCheckboxes()[1].checked).toBe(false);
    expect(getCheckboxes()[2].checked).toBe(false);
  });

  test("collapsed parent selection includes hidden descendants and can clear them again", () => {
    render(
      <DataTableAuto
        columnDefinitions={columns}
        data={deepNestedData}
        getRowId={(row) => row.id}
        subRows={{ getSubRows: (row) => row.subRows ?? [] }}
        selection={{ selectionMode: "multiple" }}
      />,
    );

    const getCheckboxes = () =>
      screen.getAllByRole("checkbox") as HTMLInputElement[];

    fireEvent.click(getCheckboxes()[1]);

    fireEvent.click(screen.getByRole("button", { name: "Vis under-rader" }));

    expect(getCheckboxes()[1].checked).toBe(true);
    expect(getCheckboxes()[2].checked).toBe(true);

    fireEvent.click(screen.getByRole("button", { name: "Vis under-rader" }));

    expect(getCheckboxes()[3].checked).toBe(true);

    fireEvent.click(
      screen.getAllByRole("button", { name: "Skjul under-rader" })[0],
    );
    fireEvent.click(getCheckboxes()[1]);

    fireEvent.click(screen.getByRole("button", { name: "Vis under-rader" }));

    expect(getCheckboxes()[1].checked).toBe(false);
    expect(getCheckboxes()[2].checked).toBe(false);
    expect(getCheckboxes()[3].checked).toBe(false);
  });

  test("select-all includes hidden descendants for collapsed parents and clears them again", () => {
    render(
      <DataTableAuto
        columnDefinitions={columns}
        data={deepNestedData}
        getRowId={(row) => row.id}
        subRows={{ getSubRows: (row) => row.subRows ?? [] }}
        selection={{ selectionMode: "multiple" }}
      />,
    );

    const getCheckboxes = () =>
      screen.getAllByRole("checkbox") as HTMLInputElement[];

    fireEvent.click(
      screen.getByRole("checkbox", { name: "Velg alle synlige rader" }),
    );

    fireEvent.click(screen.getByRole("button", { name: "Vis under-rader" }));

    expect(getCheckboxes()[1].checked).toBe(true);
    expect(getCheckboxes()[2].checked).toBe(true);

    fireEvent.click(screen.getByRole("button", { name: "Vis under-rader" }));

    expect(getCheckboxes()[3].checked).toBe(true);

    fireEvent.click(
      screen.getByRole("checkbox", { name: "Fjern alle synlige valgte rader" }),
    );

    expect(getCheckboxes()[0].checked).toBe(false);

    fireEvent.click(
      screen.getAllByRole("button", { name: "Skjul under-rader" })[0],
    );
    fireEvent.click(screen.getByRole("button", { name: "Vis under-rader" }));

    expect(getCheckboxes()[1].checked).toBe(false);
    expect(getCheckboxes()[2].checked).toBe(false);
    expect(getCheckboxes()[3].checked).toBe(false);
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
