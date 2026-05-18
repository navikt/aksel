import type { Meta, StoryObj } from "@storybook/react-vite";
import React, { useState } from "react";
import { expect, fn, userEvent, within } from "storybook/test";
import { Button } from "../../button";
import { DataGrid } from "../../data-grid";
import { VStack } from "../../primitives/stack";
import { Tag } from "../../tag";
import type {
  ColumnDefinitions,
  SortEntry,
} from "../table/root/DataTable.types";

const meta: Meta<typeof DataGrid.Table> = {
  title: "ds-react/Data/Data Prop",
  component: DataGrid.Table,
  parameters: {
    chromatic: { disable: true },
    layout: "padded",
    a11y: { disable: true },
    controls: { disable: true },
    docs: { disable: true },
  },
};

export default meta;

type Story = StoryObj<typeof DataGrid.Table>;

const selectionControls = {
  args: {
    selection: {
      selectionMode: "multiple",
    },
  },
  parameters: {
    controls: {
      disable: false,
    },
  },
  argTypes: {
    selection: {
      selectionMode: {
        control: { type: "select" },
        options: ["none", "single", "multiple"],
      },
    },
  },
} as const;

type UserDataTest = {
  id: number;
  foo: string;
  bar: string;
  on: boolean;
  time: Date;
};

const userColumnDef: ColumnDefinitions<UserDataTest> = [
  {
    id: "id",
    header: "Id",
    label: "Id",
    cell: ({ id }) => id,
    align: "right",
    width: { default: "100px" },
  },
  {
    id: "foo",
    header: "Foo",
    label: "Foo",
    cell: ({ foo }) => foo,
  },
  {
    id: "bar",
    header: "Bar",
    label: "Bar",
    cell: ({ bar }) => (
      <Tag variant="strong" size="xsmall">
        {bar}
      </Tag>
    ),
  },
  {
    id: "on",
    header: "Boolean demo",
    label: "Boolean demo",
    cell: ({ on }) => (on ? "Yes" : "No"),
  },
  {
    id: "time",
    header: "Time",
    label: "Time",
    cell: ({ time }) => time.toISOString(),
  },
];

const generateUserData = (
  count: number,
  countFrom: number = 0,
): UserDataTest[] => {
  const num = (index: number) => (countFrom ? index + countFrom : index + 1);

  return Array.from({ length: count }, (_, i) => ({
    id: num(i) + 1,
    foo: `foo${num(i) + 1}`,
    bar: `bar${num(i) + 1}`,
    on: num(i) % 2 === 0,
    time: new Date(),
  }));
};

const userData = generateUserData(4);

export const ItemsAsData: Story = {
  render: () => {
    return (
      <DataGrid columnDefinitions={userColumnDef} data={userData}>
        <DataGrid.Table />
      </DataGrid>
    );
  },
};

export const ItemsAsDataWithCustomRowId: Story = {
  render: () => {
    return (
      <DataGrid
        columnDefinitions={userColumnDef}
        data={userData}
        getRowId={(row) => row.foo + row.bar}
      >
        <DataGrid.Table
          selection={{
            selectionMode: "multiple",
            onSelectionChange: console.info,
          }}
        />
      </DataGrid>
    );
  },
};

export const SelectionModeMultiple: Story = {
  render: () => {
    return (
      <DataGrid
        columnDefinitions={userColumnDef}
        data={userData}
        getRowId={(row) => row.foo + row.bar}
      >
        <DataGrid.Table
          selection={{
            selectionMode: "multiple",
            onSelectionChange: console.info,
          }}
          withKeyboardNav
        />
      </DataGrid>
    );
  },
};

export const SelectionModeOnControlsOnly: Story = {
  render: () => {
    return (
      <DataGrid
        columnDefinitions={userColumnDef}
        data={userData}
        getRowId={(row) => row.foo + row.bar}
      >
        <DataGrid.Table
          selection={{
            selectionMode: "multiple",
            onSelectionChange: console.info,
            selectionTrigger: "control",
          }}
          withKeyboardNav
        />
      </DataGrid>
    );
  },
};

export const SelectionModeSingle: Story = {
  render: () => {
    return (
      <DataGrid
        columnDefinitions={userColumnDef}
        data={userData}
        getRowId={(row) => row.foo + row.bar}
      >
        <DataGrid.Table
          selection={{
            selectionMode: "single",
            onSelectionChange: console.info,
          }}
          withKeyboardNav
        />
      </DataGrid>
    );
  },
};

export const SelectionModeSingleWithoutKeyboardNav: Story = {
  render: () => {
    return (
      <DataGrid
        columnDefinitions={userColumnDef}
        data={userData}
        getRowId={(row) => row.foo + row.bar}
      >
        <DataGrid.Table
          selection={{
            selectionMode: "single",
            onSelectionChange: console.info,
          }}
          withKeyboardNav={false}
        />
      </DataGrid>
    );
  },
};

export const SelectionWithDisabledRows: Story = {
  render: () => {
    return (
      <DataGrid
        columnDefinitions={userColumnDef}
        data={userData}
        getRowId={(row) => row.id.toString()}
      >
        <DataGrid.Table
          selection={{
            selectionMode: "multiple",
            onSelectionChange: console.info,
            enableRowSelection: ({ id }) => id !== "2" && id !== "1",
          }}
        />
      </DataGrid>
    );
  },
};

export const ControlledSelection: Story = {
  render: () => {
    const [selectedKeys, setSelectedKeys] = useState<string[]>(["1"]);

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <Button size="small" onClick={() => setSelectedKeys(["1", "2", "3"])}>
            Select all
          </Button>
          <Button size="small" onClick={() => setSelectedKeys([])}>
            Clear selection
          </Button>
        </div>
        <DataGrid
          columnDefinitions={userColumnDef}
          data={userData}
          getRowId={(row) => row.id.toString()}
        >
          <DataGrid.Table
            selection={{
              selectionMode: "multiple",
              onSelectionChange: setSelectedKeys,
              selectedKeys,
            }}
          />
        </DataGrid>
      </div>
    );
  },
};

export const DefaultSelectedKeys: Story = {
  render: () => {
    return (
      <DataGrid
        columnDefinitions={userColumnDef}
        data={userData}
        getRowId={(row) => row.id.toString()}
      >
        <DataGrid.Table
          selection={{
            selectionMode: "multiple",
            onSelectionChange: console.info,
            defaultSelectedKeys: ["1", "3"],
          }}
        />
      </DataGrid>
    );
  },
};

export const SingleSelectionWithDisabledRows: Story = {
  render: () => {
    return (
      <DataGrid
        columnDefinitions={userColumnDef}
        data={userData}
        getRowId={(row) => row.id.toString()}
      >
        <DataGrid.Table
          selection={{
            selectionMode: "multiple",
            onSelectionChange: console.info,
            enableRowSelection: ({ id }) => id !== "2",
          }}
        />
      </DataGrid>
    );
  },
};

export const EmptyData: Story = {
  render: () => {
    return (
      <DataGrid columnDefinitions={userColumnDef} data={[]}>
        <DataGrid.Table
          selection={{
            selectionMode: "multiple",
          }}
        />
      </DataGrid>
    );
  },
};

export const EmptyDataWithEmptyState: Story = {
  render: () => {
    return (
      <DataGrid columnDefinitions={userColumnDef} data={[]}>
        <DataGrid.Table emptyContent="Ingen data å vise" />
      </DataGrid>
    );
  },
};

export const LoadingWithSkeletonRows: Story = {
  render: () => {
    const [isLoading, setIsLoading] = useState(true);
    return (
      <VStack gap="space-12">
        <Button onClick={() => setIsLoading((prev) => !prev)}>
          Toggle loading
        </Button>
        <DataGrid columnDefinitions={userColumnDef} data={[]}>
          <DataGrid.Table
            loading={{ isLoading, variant: "skeleton", rows: 4 }}
          />
        </DataGrid>
      </VStack>
    );
  },
};

export const LoadingWithLoadingState: Story = {
  render: () => {
    const [isLoading, setIsLoading] = useState(true);
    return (
      <VStack gap="space-12">
        <Button onClick={() => setIsLoading((prev) => !prev)}>
          Toggle loading
        </Button>
        <DataGrid columnDefinitions={userColumnDef} data={[]}>
          <DataGrid.Table
            loading={{
              isLoading,
              variant: "content",
              content: "Laster data...",
            }}
          />
        </DataGrid>
      </VStack>
    );
  },
};

export const LoadingWhileKeepingData: Story = {
  render: () => {
    const [isLoading, setIsLoading] = useState(true);
    return (
      <VStack gap="space-12">
        <Button onClick={() => setIsLoading((prev) => !prev)}>
          Toggle loading
        </Button>
        <DataGrid columnDefinitions={userColumnDef} data={userData}>
          <DataGrid.Table
            loading={{ isLoading, variant: "skeleton", rows: 4 }}
          />
        </DataGrid>
      </VStack>
    );
  },
};

export const LoadingWhileKeepingDataNoPlaceholders: Story = {
  render: () => {
    const [isLoading, setIsLoading] = useState(true);
    return (
      <VStack gap="space-12">
        <Button onClick={() => setIsLoading((prev) => !prev)}>
          Toggle loading
        </Button>
        <DataGrid columnDefinitions={userColumnDef} data={userData}>
          <DataGrid.Table
            loading={{
              isLoading,
              variant: "overlay",
              label: "Laster innhold for tabell",
            }}
          />
        </DataGrid>
      </VStack>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(canvas.getAllByText("Laster innhold for tabell")).toHaveLength(1);
    expect(canvas.getByText("foo2")).toBeInTheDocument();
  },
};

const selectionPaginationSpy = fn();

export const SelectionPagination: Story = {
  render: () => {
    const [page, setPage] = useState<"0" | "1">("0");

    const dataToShow =
      page === "0" ? userData.slice(0, 2) : userData.slice(2, 4);

    return (
      <div>
        <button onClick={() => setPage("0")}>Page 1</button>
        <button onClick={() => setPage("1")}>Page 2</button>
        <DataGrid
          columnDefinitions={userColumnDef}
          data={dataToShow}
          getRowId={(row) => row.foo + row.bar}
        >
          <DataGrid.Table
            selection={{
              selectionMode: "multiple",
              onSelectionChange: (keys) => {
                console.info({ keys });
                selectionPaginationSpy(keys);
              },
            }}
          />
        </DataGrid>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    selectionPaginationSpy.mockClear();
    const canvas = within(canvasElement);
    const page1Button = canvas.getByRole("button", { name: "Page 1" });
    const page2Button = canvas.getByRole("button", { name: "Page 2" });

    /* keys */
    await userEvent.click(page1Button);

    /* Page 1 rows: foo1bar1, foo2bar2 */
    let checkboxes = canvas.getAllByRole("checkbox");
    const theadCheckbox = () =>
      canvas.getAllByRole("checkbox")[0] as HTMLInputElement;

    /* Select first row on page 1 */
    await userEvent.click(checkboxes[1]);
    expect(selectionPaginationSpy).toHaveBeenLastCalledWith(["foo2bar2"]);

    /* Thead should be indeterminate (1 of 2 visible rows selected) */
    expect(theadCheckbox().indeterminate).toBe(true);
    expect(theadCheckbox().checked).toBe(false);

    /* Switch to page 2 (rows: foo3bar3, foo4bar4) */
    await userEvent.click(page2Button);

    /* Thead should NOT be indeterminate (no visible rows are selected) */
    expect(theadCheckbox().indeterminate).toBe(false);
    expect(theadCheckbox().checked).toBe(false);

    /* Select first row on page 2 */
    checkboxes = canvas.getAllByRole("checkbox");
    await userEvent.click(checkboxes[1]);

    /* onSelectionChange should include foo1bar1 from page 1 */
    expect(selectionPaginationSpy).toHaveBeenLastCalledWith([
      "foo2bar2",
      "foo4bar4",
    ]);

    /* Thead should be indeterminate (1 of 2 visible rows selected) */
    expect(theadCheckbox().indeterminate).toBe(true);

    /* Click thead checkbox (indeterminate -> select all visible) */
    /* Should preserve selections from other pages */
    await userEvent.click(theadCheckbox());
    expect(selectionPaginationSpy).toHaveBeenLastCalledWith([
      "foo2bar2",
      "foo4bar4",
      "foo5bar5",
    ]);

    /* Thead should now be checked (all visible selected) */
    expect(theadCheckbox().checked).toBe(true);
    expect(theadCheckbox().indeterminate).toBe(false);

    /* Click thead checkbox again (all selected -> unselect all visible) */
    /* Should NOT unselect rows from other pages */
    await userEvent.click(theadCheckbox());
    expect(selectionPaginationSpy).toHaveBeenLastCalledWith(["foo2bar2"]);

    /* Thead should not be checked or indeterminate */
    expect(theadCheckbox().checked).toBe(false);
    expect(theadCheckbox().indeterminate).toBe(false);

    /* Switch back to page 1 - foo1bar1 should still be selected */
    await userEvent.click(page1Button);
    checkboxes = canvas.getAllByRole("checkbox");
    expect(theadCheckbox().indeterminate).toBe(true);
    expect((checkboxes[1] as HTMLInputElement).checked).toBe(true);
    expect((checkboxes[2] as HTMLInputElement).checked).toBe(false);
  },
};

export const StickySelection: Story = {
  render: () => {
    return (
      <DataGrid
        columnDefinitions={userColumnDef.map((col) => ({
          ...col,
          defaultWidth: "350px",
        }))}
        data={userData}
        getRowId={(row) => row.foo + row.bar}
      >
        <DataGrid.Table
          selection={{
            selectionMode: "multiple",
            onSelectionChange: console.info,
          }}
          withKeyboardNav
          stickyColumns={{
            start: "1",
          }}
        />
      </DataGrid>
    );
  },
};

export const StickyLeftOne: Story = {
  render: () => {
    return (
      <DataGrid
        columnDefinitions={userColumnDef.map((col) => ({
          ...col,
          defaultWidth: "350px",
        }))}
        data={userData}
        getRowId={(row) => row.foo + row.bar}
      >
        <DataGrid.Table
          withKeyboardNav
          stickyColumns={{
            start: "1",
          }}
        />
      </DataGrid>
    );
  },
};

export const StickyRightOne: Story = {
  render: () => {
    return (
      <DataGrid
        columnDefinitions={userColumnDef.map((col) => ({
          ...col,
          defaultWidth: "350px",
        }))}
        data={userData}
        getRowId={(row) => row.foo + row.bar}
      >
        <DataGrid.Table
          withKeyboardNav
          stickyColumns={{
            end: "1",
          }}
        />
      </DataGrid>
    );
  },
};

export const StickyBothOne: Story = {
  render: () => {
    return (
      <DataGrid
        columnDefinitions={userColumnDef.map((col) => ({
          ...col,
          defaultWidth: "250px",
        }))}
        data={userData}
        getRowId={(row) => row.foo + row.bar}
      >
        <DataGrid.Table
          withKeyboardNav
          stickyColumns={{
            start: "1",
            end: "1",
          }}
        />
      </DataGrid>
    );
  },
};

export const StickyHeader: Story = {
  render: () => {
    return (
      <div style={{ height: "300px" }}>
        <DataGrid
          columnDefinitions={userColumnDef}
          data={generateUserData(20)}
          getRowId={(row) => row.foo + row.bar}
        >
          <DataGrid.Table withKeyboardNav stickyHeader />
        </DataGrid>
      </div>
    );
  },
};

export const StickyHeaderAndColumns: Story = {
  render: () => {
    return (
      <div style={{ height: "300px" }}>
        <DataGrid
          columnDefinitions={userColumnDef.map((col) => ({
            ...col,
            defaultWidth: "250px",
          }))}
          data={generateUserData(20)}
          getRowId={(row) => row.foo + row.bar}
        >
          <DataGrid.Table
            withKeyboardNav
            stickyHeader
            stickyColumns={{
              start: "1",
              end: "1",
            }}
          />
        </DataGrid>
      </div>
    );
  },
};

type SortableUserDataTest = UserDataTest & { name: string };

const sortableUserData: SortableUserDataTest[] = [
  {
    id: 3,
    foo: "banana",
    bar: "bar3",
    on: true,
    time: new Date(),
    name: "Charlie",
  },
  {
    id: 1,
    foo: "apple",
    bar: "bar1",
    on: false,
    time: new Date(),
    name: "Alice",
  },
  {
    id: 4,
    foo: "cherry",
    bar: "bar4",
    on: true,
    time: new Date(),
    name: "Dave",
  },
  {
    id: 2,
    foo: "apple",
    bar: "bar2",
    on: false,
    time: new Date(),
    name: "Bob",
  },
];

const sortableColumnDef: ColumnDefinitions<SortableUserDataTest> = [
  {
    id: "id",
    header: "Id",
    cell: ({ id }) => id,
    align: "right",
    sortable: true,
    label: "Id",
  },
  {
    id: "foo",
    header: "Foo",
    cell: ({ foo }) => foo,
    sortable: true,
    label: "Foo",
  },
  {
    id: "name",
    header: "Name",
    cell: ({ name }) => name,
    sortable: true,
    label: "Name",
  },
  { id: "bar", header: "Bar", cell: ({ bar }) => bar, label: "Bar" },
];

function applySortEntries<T extends Record<string, unknown>>(
  data: T[],
  sort: SortEntry[],
): T[] {
  if (sort.length === 0) return data;
  return [...data].sort((a, b) => {
    for (const { columnId, direction } of sort) {
      const aVal = a[columnId] as string;
      const bVal = b[columnId] as string;
      const cmp = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      if (cmp !== 0) return direction === "asc" ? cmp : -cmp;
    }
    return 0;
  });
}

export const SortableColumns: Story = {
  render: () => {
    const [sort, setSort] = useState<SortEntry[]>([]);
    const sortedData = applySortEntries(sortableUserData, sort);

    return (
      <DataGrid
        columnDefinitions={sortableColumnDef}
        data={sortedData}
        getRowId={(row) => row.id.toString()}
      >
        <DataGrid.Table
          sorting={{
            sort,
            onSortChange: (next, detail) => {
              console.info("changed column:", detail);
              setSort(next);
            },
          }}
        />
      </DataGrid>
    );
  },
};

export const SortableColumnsUncontrolled: Story = {
  render: () => {
    const [loggedDetail, setLoggedDetail] = useState<string>("");

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {loggedDetail && (
          <pre style={{ fontSize: "0.75rem" }}>{loggedDetail}</pre>
        )}
        <DataGrid
          columnDefinitions={sortableColumnDef}
          data={sortableUserData}
          getRowId={(row) => row.id.toString()}
        >
          <DataGrid.Table
            sorting={{
              defaultSort: [{ columnId: "name", direction: "asc" }],
              onSortChange: (_, detail) => {
                setLoggedDetail(JSON.stringify(detail, null, 2));
              },
            }}
          />
        </DataGrid>
      </div>
    );
  },
};

const rowClickSpy = fn();

const rowClickColumnDef: ColumnDefinitions<UserDataTest> = [
  { id: "id", header: "Id", cell: ({ id }) => id, align: "right", label: "Id" },
  { id: "foo", header: "Foo", cell: ({ foo }) => foo, label: "Foo" },
  {
    id: "link",
    header: "Link",
    label: "Link",
    cell: ({ foo }) => (
      <a href="/example" onClick={(e) => e.preventDefault()}>
        {foo} link
      </a>
    ),
  },
  {
    id: "button",
    header: "Button",
    label: "Button",
    cell: ({ foo }) => <button type="button">{foo} action</button>,
  },
  {
    id: "text",
    header: "Text",
    label: "Text",
    cell: () => <input type="text" />,
  },
];

export const RowClick: Story = {
  render: () => (
    <DataGrid
      columnDefinitions={rowClickColumnDef}
      data={userData}
      getRowId={(row) => row.id.toString()}
    >
      <DataGrid.Table
        onRowClick={(rowId) => console.info("Row clicked!: ", rowId)}
        selection={{
          selectionMode: "multiple",
        }}
        withKeyboardNav
      />
    </DataGrid>
  ),
};

export const RowClickTest: Story = {
  render: () => (
    <DataGrid
      columnDefinitions={rowClickColumnDef}
      data={userData}
      getRowId={(row) => row.id.toString()}
    >
      <DataGrid.Table
        onRowClick={rowClickSpy}
        selection={{
          selectionMode: "multiple",
        }}
      />
    </DataGrid>
  ),
  play: async ({ canvasElement }) => {
    rowClickSpy.mockClear();
    const canvas = within(canvasElement);

    // Click a plain text cell — should fire onRowClick
    const allCells = canvas.getAllByRole("cell");
    await userEvent.click(allCells[1]); // "foo" cell of first row
    expect(rowClickSpy).toHaveBeenCalledTimes(1);
    rowClickSpy.mockClear();

    // Click a link — should NOT fire onRowClick
    const links = canvas.getAllByRole("link");
    await userEvent.click(links[0]);
    expect(rowClickSpy).not.toHaveBeenCalled();

    // Click a button — should NOT fire onRowClick
    const buttons = canvas.getAllByRole("button");
    await userEvent.click(buttons[0]);
    expect(rowClickSpy).not.toHaveBeenCalled();

    // Click a checkbox — should NOT fire onRowClick
    const inputs = canvas.getAllByRole("textbox");
    await userEvent.click(inputs[0]);
    expect(rowClickSpy).not.toHaveBeenCalled();
  },
};

export const RowExpansion: Story = {
  render: (args) => (
    <DataGrid
      columnDefinitions={rowClickColumnDef}
      data={userData}
      getRowId={(row) => row.id.toString()}
    >
      <DataGrid.Table<UserDataTest>
        onRowClick={() => console.info("Row clicked!")}
        selection={{
          selectionMode: args.selection?.selectionMode ?? "none",
        }}
        withKeyboardNav
      />
    </DataGrid>
  ),
  ...selectionControls,
};

export const RowExpansionAll: Story = {
  render: (args) => (
    <DataGrid
      columnDefinitions={rowClickColumnDef}
      data={userData}
      getRowId={(row) => row.id.toString()}
    >
      <DataGrid.Table<UserDataTest>
        onRowClick={() => console.info("Row clicked!")}
        selection={{
          selectionMode: args.selection?.selectionMode ?? "none",
        }}
        withKeyboardNav
        detailsPanel={{
          getContent: (rowData) => {
            return (
              <div>{`Details for ${rowData.foo} (id: ${rowData.id})`}</div>
            );
          },
          showExpandAll: true,
        }}
      />
    </DataGrid>
  ),
  ...selectionControls,
};

type NestedUserDataTest = UserDataTest & {
  children: NestedUserDataTest[];
};

const nestedRowData: NestedUserDataTest[] = userData.map((user) => ({
  ...user,
  children: [...generateUserData(3, user.id * 100)].map((child) => ({
    ...child,
    children: [...generateUserData(2, child.id * 1000)].map((grandChild) => ({
      ...grandChild,
      children: [],
    })),
  })),
}));

export const NestedRows: Story = {
  render: (args) => (
    <DataGrid
      columnDefinitions={rowClickColumnDef}
      data={nestedRowData}
      getRowId={(row) => row.id.toString()}
    >
      <DataGrid.Table<NestedUserDataTest>
        selection={{
          selectionMode: args.selection?.selectionMode ?? "none",
          onSelectionChange: console.info,
        }}
        withKeyboardNav
        subRows={{
          getRows: (row) => row.children,
        }}
      />
    </DataGrid>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const getCheckboxes = () =>
      canvas.getAllByRole("checkbox") as HTMLInputElement[];

    await userEvent.click(
      canvas.getAllByRole("button", { name: "Vis under-rader" })[0],
    );

    await userEvent.click(getCheckboxes()[2]);

    expect(getCheckboxes()[1].checked).toBe(false);
    expect(getCheckboxes()[1].indeterminate).toBe(false);

    await userEvent.click(getCheckboxes()[1]);

    expect(getCheckboxes()[1].checked).toBe(true);
    expect(getCheckboxes()[2].checked).toBe(true);

    await userEvent.click(getCheckboxes()[1]);

    expect(getCheckboxes()[1].checked).toBe(false);
    expect(getCheckboxes()[2].checked).toBe(false);

    /* Nested "hidden items" selection */
    await userEvent.click(getCheckboxes()[2]);
    expect(getCheckboxes()[2].checked).toBe(true);

    await userEvent.click(
      canvas.getAllByRole("button", { name: "Vis under-rader" })[0],
    );
    expect(getCheckboxes()[2].indeterminate).toBe(false);
    expect(getCheckboxes()[2].checked).toBe(true);
    expect(getCheckboxes()[3].checked).toBe(true);
    expect(getCheckboxes()[4].checked).toBe(true);
  },
  ...selectionControls,
};

export const NestedLeftAlignedContentRows: Story = {
  render: (args) => (
    <DataGrid
      /* Removes right aligned id column */
      columnDefinitions={rowClickColumnDef.slice(1)}
      data={nestedRowData}
      getRowId={(row) => row.id.toString()}
    >
      <DataGrid.Table<NestedUserDataTest>
        selection={{
          selectionMode: args.selection?.selectionMode ?? "none",
        }}
        withKeyboardNav
        subRows={{
          getRows: (row) => row.children,
        }}
      />
    </DataGrid>
  ),
  ...selectionControls,
};

export const NestedOneLevelLeftAlignedContentRows: Story = {
  render: (args) => (
    <DataGrid
      /* Removes right aligned id column */
      columnDefinitions={rowClickColumnDef.slice(1)}
      data={userData.map((user) => ({
        ...user,
        children: [...generateUserData(3, user.id * 100)].map((child) => ({
          ...child,
          children: [],
        })),
      }))}
      getRowId={(row) => row.id.toString()}
    >
      <DataGrid.Table<NestedUserDataTest>
        selection={{
          selectionMode: args.selection?.selectionMode ?? "none",
        }}
        withKeyboardNav
        subRows={{
          getRows: (row) => row.children,
        }}
      />
    </DataGrid>
  ),
  ...selectionControls,
};

export const NestedRowsWithMasterDetail: Story = {
  render: (args) => (
    <DataGrid
      /* Removes right aligned id column */
      columnDefinitions={rowClickColumnDef.slice(1)}
      data={userData.map((user) => ({
        ...user,
        children: [...generateUserData(3, user.id * 100)].map((child) => ({
          ...child,
          children: [],
        })),
      }))}
      getRowId={(row) => row.id.toString()}
    >
      <DataGrid.Table<NestedUserDataTest>
        selection={{
          selectionMode: args.selection?.selectionMode ?? "none",
        }}
        withKeyboardNav
        subRows={{
          defaultExpandedRowIds: ["3"],
          getRows: (row) => row.children,
        }}
        detailsPanel={{
          getContent: () => (
            <div>
              This is the details panel content. It should be possible to
              interact with the content here without triggering row clicks or
              affecting row selection.
            </div>
          ),
          getHeight: () => 100,
        }}
      />
    </DataGrid>
  ),
  /* play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(
      canvas.getAllByRole("button", { name: "Vis detaljer" })[0],
    );

    expect(
      canvas.getByRole("button", { name: "Skjul detaljer" }),
    ).toBeInTheDocument();

    await userEvent.click(
      canvas.getAllByRole("button", { name: "Vis under-rader" })[0],
    );

    expect(
      canvas.getByRole("button", { name: "Skjul under-rader" }),
    ).toBeInTheDocument();

    await userEvent.click(
      canvas.getByRole("button", { name: "Skjul detaljer" }),
    );

    expect(
      canvas.getByRole("button", { name: "Skjul under-rader" }),
    ).toBeInTheDocument();
  }, */
  ...selectionControls,
};
