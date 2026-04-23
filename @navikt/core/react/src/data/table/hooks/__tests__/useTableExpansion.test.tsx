import { act, renderHook } from "@testing-library/react";
import React from "react";
import { describe, expect, test, vi } from "vitest";
import {
  DataTableExpansionProvider,
  useDataTableExpansion,
} from "../useTableExpansion";
import { useTableItems } from "../useTableItems";

type TestRow = {
  id: number;
  subRows?: TestRow[];
};

function createWrapper(
  options: {
    onDetailsPanelChange?: (ids: (string | number)[]) => void;
    isDetailsPanelExpandable?: (row: TestRow) => boolean;
  } = {},
) {
  const rows: TestRow[] = [{ id: 1, subRows: [{ id: 10 }] }, { id: 2 }];

  return function Wrapper({ children }: { children: React.ReactNode }) {
    const tableItems = useTableItems({
      items: rows,
      getRowId: (row) => row.id,
      getSubRows: (row) => row.subRows ?? [],
    });

    return (
      <DataTableExpansionProvider<TestRow>
        itemDetails={tableItems.itemDetails}
        getDetailsPanelContent={(row) => row.id}
        isDetailsPanelExpandable={options.isDetailsPanelExpandable}
        onDetailsPanelChange={options.onDetailsPanelChange}
      >
        {children}
      </DataTableExpansionProvider>
    );
  };
}

describe("useTableExpansion", () => {
  test("does not allow toggling rows that are not expandable", () => {
    const onDetailsPanelChange = vi.fn();

    const { result } = renderHook(() => useDataTableExpansion(), {
      wrapper: createWrapper({
        onDetailsPanelChange,
        isDetailsPanelExpandable: (row) => row.id === 1,
      }),
    });

    expect(result.current.isDetailsPanelExpandable(1)).toBe(true);
    expect(result.current.isDetailsPanelExpandable(2)).toBe(false);
    expect(result.current.isDetailsPanelExpandable(10)).toBe(false);

    act(() => {
      result.current.toggleExpansion(2);
    });

    expect(result.current.isExpanded(2)).toBe(false);
    expect(onDetailsPanelChange).not.toHaveBeenCalled();

    act(() => {
      result.current.toggleExpansion(1);
    });

    expect(result.current.isExpanded(1)).toBe(true);
    expect(onDetailsPanelChange).toHaveBeenCalledWith([1]);
  });

  test("expand all only expands expandable rows", () => {
    const onDetailsPanelChange = vi.fn();

    const { result } = renderHook(() => useDataTableExpansion(), {
      wrapper: createWrapper({
        onDetailsPanelChange,
        isDetailsPanelExpandable: (row) => row.id === 1,
      }),
    });

    act(() => {
      result.current.toggleAll();
    });

    expect(result.current.isExpanded(1)).toBe(true);
    expect(result.current.isExpanded(2)).toBe(false);
    expect(result.current.isAllExpanded).toBe(true);
    expect(onDetailsPanelChange).toHaveBeenCalledWith([1]);
  });

  test("expand all only targets top-level table items", () => {
    const onDetailsPanelChange = vi.fn();

    const { result } = renderHook(() => useDataTableExpansion(), {
      wrapper: createWrapper({
        onDetailsPanelChange,
      }),
    });

    expect(result.current.isDetailsPanelExpandable(1)).toBe(true);
    expect(result.current.isDetailsPanelExpandable(2)).toBe(true);
    expect(result.current.isDetailsPanelExpandable(10)).toBe(false);

    act(() => {
      result.current.toggleAll();
    });

    expect(result.current.isExpanded(1)).toBe(true);
    expect(result.current.isExpanded(2)).toBe(true);
    expect(result.current.isExpanded(10)).toBe(false);
    expect(onDetailsPanelChange).toHaveBeenCalledWith([1, 2]);
  });
});
