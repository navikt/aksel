import { act, renderHook } from "@testing-library/react";
import React from "react";
import { describe, expect, test, vi } from "vitest";
import {
  DataTableExpansionProvider,
  useDataTableExpansion,
} from "../useTableExpansion";

type TestRow = {
  id: number;
  children?: TestRow[];
};

function createWrapper(
  options: {
    onDetailsPanelChange?: (ids: (string | number)[]) => void;
  } = {},
) {
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <DataTableExpansionProvider<TestRow>
        allRowKeys={[1, 2]}
        getDetailsPanelContent={(row) => row.id}
        getSubRows={(row) => row.children ?? []}
        onDetailsPanelChange={options.onDetailsPanelChange}
      >
        {children}
      </DataTableExpansionProvider>
    );
  };
}

describe("useTableExpansion", () => {
  test("handles details panel and nested rows independently", () => {
    const { result } = renderHook(() => useDataTableExpansion(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isExpanded(1)).toBe(false);
    expect(result.current.isNestedRowsExpanded(1)).toBe(false);

    act(() => {
      result.current.toggleExpansion(1);
    });

    expect(result.current.isExpanded(1)).toBe(true);
    expect(result.current.isNestedRowsExpanded(1)).toBe(false);

    act(() => {
      result.current.toggleNestedRowsExpansion(1);
    });

    expect(result.current.isExpanded(1)).toBe(true);
    expect(result.current.isNestedRowsExpanded(1)).toBe(true);

    act(() => {
      result.current.toggleExpansion(1);
    });

    expect(result.current.isExpanded(1)).toBe(false);
    expect(result.current.isNestedRowsExpanded(1)).toBe(true);
  });

  test("only details panel changes trigger onDetailsPanelChange", () => {
    const onDetailsPanelChange = vi.fn();

    const { result } = renderHook(() => useDataTableExpansion(), {
      wrapper: createWrapper({ onDetailsPanelChange }),
    });

    act(() => {
      result.current.toggleNestedRowsExpansion(1);
    });

    expect(onDetailsPanelChange).not.toHaveBeenCalled();

    act(() => {
      result.current.toggleExpansion(1);
    });

    expect(onDetailsPanelChange).toHaveBeenCalledWith([1]);
  });
});
