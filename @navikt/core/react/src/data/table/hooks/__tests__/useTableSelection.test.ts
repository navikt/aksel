import { act, renderHook } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import type {
  MultipleSelection,
  SingleSelection,
} from "../../helpers/selection/selection.types";
import {
  type UseTableSelectionReturn,
  useTableSelection,
} from "../useTableSelection";

type Item = { id: string; name: string };

const items: Item[] = [
  { id: "a", name: "Alpha" },
  { id: "b", name: "Beta" },
  { id: "c", name: "Charlie" },
];

const visibleRowIds = items.map((item) => item.id);
const descendantRowIdsById = new Map<string | number, (string | number)[]>([
  ["a", ["a1", "a2", "a2a"]],
  ["a1", []],
  ["a2", ["a2a"]],
  ["a2a", []],
]);

function asSingle(result: {
  current: UseTableSelectionReturn;
}): SingleSelection {
  return result.current.selection as SingleSelection;
}

function asMultiple(result: {
  current: UseTableSelectionReturn;
}): MultipleSelection {
  return result.current.selection as MultipleSelection;
}

describe("useTableSelection", () => {
  describe('selectionMode="none"', () => {
    test("returns empty selectedKeys and no prop getters", () => {
      const { result } = renderHook(() =>
        useTableSelection({
          selectionMode: "none",
          visibleRowIds,
        }),
      );

      expect(result.current.selection.selectionMode).toBe("none");
      expect(result.current.selection.selectedKeys).toEqual([]);
    });
  });

  describe('selectionMode="single"', () => {
    test("returns getRowRadioProps", () => {
      const { result } = renderHook(() =>
        useTableSelection({
          selectionMode: "single",
          visibleRowIds,
        }),
      );

      expect(result.current.selection.selectionMode).toBe("single");
      expect(asSingle(result).getRowRadioProps).toBeDefined();
    });

    test("selecting a row via radio onChange", () => {
      const onChange = vi.fn();
      const { result } = renderHook(() =>
        useTableSelection({
          selectionMode: "single",
          visibleRowIds,
          onSelectionChange: onChange,
        }),
      );

      const radioProps = asSingle(result).getRowRadioProps("a");
      expect(radioProps.checked).toBe(false);

      act(() => {
        radioProps.onChange?.({} as React.ChangeEvent<HTMLInputElement>);
      });

      expect(asSingle(result).selectedKeys).toEqual(["a"]);
    });

    test("toggling the same row keeps it selected", () => {
      const { result } = renderHook(() =>
        useTableSelection({
          selectionMode: "single",
          visibleRowIds,
          defaultSelectedKeys: ["a"],
        }),
      );

      act(() => {
        asSingle(result)
          .getRowRadioProps("a")
          .onChange?.({} as React.ChangeEvent<HTMLInputElement>);
      });

      expect(asSingle(result).selectedKeys).toEqual(["a"]);
    });

    test("selecting a new row replaces the previous", () => {
      const { result } = renderHook(() =>
        useTableSelection({
          selectionMode: "single",
          visibleRowIds,
          defaultSelectedKeys: ["a"],
        }),
      );

      act(() => {
        asSingle(result)
          .getRowRadioProps("b")
          .onChange?.({} as React.ChangeEvent<HTMLInputElement>);
      });

      expect(asSingle(result).selectedKeys).toEqual(["b"]);
    });

    test("disabled rows have disabled prop", () => {
      const { result } = renderHook(() =>
        useTableSelection({
          selectionMode: "single",
          visibleRowIds,
          disabledSelectionKeys: ["b"],
        }),
      );

      expect(asSingle(result).getRowRadioProps("a").disabled).toBe(false);
      expect(asSingle(result).getRowRadioProps("b").disabled).toBe(true);
    });

    test("controlled selectedKeys", () => {
      const { result, rerender } = renderHook(
        ({ selectedKeys }) =>
          useTableSelection({
            selectionMode: "single",
            visibleRowIds,
            selectedKeys,
          }),
        { initialProps: { selectedKeys: ["a"] as (string | number)[] } },
      );

      expect(asSingle(result).selectedKeys).toEqual(["a"]);

      rerender({ selectedKeys: ["b"] });
      expect(asSingle(result).selectedKeys).toEqual(["b"]);
    });
  });

  describe('selectionMode="multiple"', () => {
    test("returns getTheadCheckboxProps and getRowCheckboxProps", () => {
      const { result } = renderHook(() =>
        useTableSelection({
          selectionMode: "multiple",
          visibleRowIds,
        }),
      );

      expect(result.current.selection.selectionMode).toBe("multiple");
      expect(asMultiple(result).getTheadCheckboxProps).toBeDefined();
      expect(asMultiple(result).getRowCheckboxProps).toBeDefined();
    });

    test("selecting individual rows", () => {
      const { result } = renderHook(() =>
        useTableSelection({
          selectionMode: "multiple",
          visibleRowIds,
        }),
      );

      act(() => {
        asMultiple(result)
          .getRowCheckboxProps("a")
          .onChange?.({} as React.ChangeEvent<HTMLInputElement>);
      });

      expect(asMultiple(result).selectedKeys).toEqual(["a"]);

      act(() => {
        asMultiple(result)
          .getRowCheckboxProps("c")
          .onChange?.({} as React.ChangeEvent<HTMLInputElement>);
      });

      expect(asMultiple(result).selectedKeys).toEqual(["a", "c"]);
    });

    test("deselecting a row", () => {
      const { result } = renderHook(() =>
        useTableSelection({
          selectionMode: "multiple",
          visibleRowIds,
          defaultSelectedKeys: ["a", "b"],
        }),
      );

      act(() => {
        asMultiple(result)
          .getRowCheckboxProps("a")
          .onChange?.({} as React.ChangeEvent<HTMLInputElement>);
      });

      expect(asMultiple(result).selectedKeys).toEqual(["b"]);
    });

    test("select all via thead checkbox", () => {
      const { result } = renderHook(() =>
        useTableSelection({
          selectionMode: "multiple",
          visibleRowIds,
        }),
      );

      act(() => {
        asMultiple(result)
          .getTheadCheckboxProps()
          .onChange?.({} as React.ChangeEvent<HTMLInputElement>);
      });

      expect(asMultiple(result).selectedKeys).toEqual(["a", "b", "c"]);
    });

    test("select all via thead includes hidden descendants for visible parents", () => {
      const { result } = renderHook(() =>
        useTableSelection({
          selectionMode: "multiple",
          visibleRowIds: ["a"],
          descendantRowIdsById,
        }),
      );

      act(() => {
        asMultiple(result)
          .getTheadCheckboxProps()
          .onChange?.({} as React.ChangeEvent<HTMLInputElement>);
      });

      expect(asMultiple(result).selectedKeys).toEqual(["a", "a1", "a2", "a2a"]);
    });

    test("deselect all when all are selected", () => {
      const { result } = renderHook(() =>
        useTableSelection({
          selectionMode: "multiple",
          visibleRowIds,
          defaultSelectedKeys: ["a", "b", "c"],
        }),
      );

      act(() => {
        asMultiple(result)
          .getTheadCheckboxProps()
          .onChange?.({} as React.ChangeEvent<HTMLInputElement>);
      });

      expect(asMultiple(result).selectedKeys).toEqual([]);
    });

    test("deselect all clears hidden descendants for visible parents but preserves unrelated keys", () => {
      const { result } = renderHook(() =>
        useTableSelection({
          selectionMode: "multiple",
          visibleRowIds: ["a"],
          descendantRowIdsById,
          defaultSelectedKeys: ["a", "a1", "a2", "a2a", "external"],
        }),
      );

      act(() => {
        asMultiple(result)
          .getTheadCheckboxProps()
          .onChange?.({} as React.ChangeEvent<HTMLInputElement>);
      });

      expect(asMultiple(result).selectedKeys).toEqual(["external"]);
    });

    test("select all skips disabled keys", () => {
      const { result } = renderHook(() =>
        useTableSelection({
          selectionMode: "multiple",
          visibleRowIds,
          disabledSelectionKeys: ["b"],
        }),
      );

      act(() => {
        asMultiple(result)
          .getTheadCheckboxProps()
          .onChange?.({} as React.ChangeEvent<HTMLInputElement>);
      });

      expect(asMultiple(result).selectedKeys).toEqual(["a", "c"]);
    });

    test("deselect all preserves disabled-but-selected rows", () => {
      const { result } = renderHook(() =>
        useTableSelection({
          selectionMode: "multiple",
          visibleRowIds,
          defaultSelectedKeys: ["a", "b", "c"],
          disabledSelectionKeys: ["b"],
        }),
      );

      act(() => {
        asMultiple(result)
          .getTheadCheckboxProps()
          .onChange?.({} as React.ChangeEvent<HTMLInputElement>);
      });

      expect(asMultiple(result).selectedKeys).toEqual(["b"]);
    });

    test("thead checkbox shows indeterminate when partially selected", () => {
      const { result } = renderHook(() =>
        useTableSelection({
          selectionMode: "multiple",
          visibleRowIds,
          defaultSelectedKeys: ["a"],
        }),
      );

      const theadProps = asMultiple(result).getTheadCheckboxProps();
      expect(theadProps.indeterminate).toBe(true);
      expect(theadProps.checked).toBe(false);
    });

    test("thead checkbox shows checked when all selected", () => {
      const { result } = renderHook(() =>
        useTableSelection({
          selectionMode: "multiple",
          visibleRowIds,
          defaultSelectedKeys: ["a", "b", "c"],
        }),
      );

      const theadProps = asMultiple(result).getTheadCheckboxProps();
      expect(theadProps.indeterminate).toBe(false);
      expect(theadProps.checked).toBe(true);
    });

    test("thead checkbox shows checked when all selectable rows are selected", () => {
      const { result } = renderHook(() =>
        useTableSelection({
          selectionMode: "multiple",
          visibleRowIds,
          defaultSelectedKeys: ["a", "c"],
          disabledSelectionKeys: ["b"],
        }),
      );

      const theadProps = asMultiple(result).getTheadCheckboxProps();
      expect(theadProps.indeterminate).toBe(false);
      expect(theadProps.checked).toBe(true);
    });

    test("deselecting one row when all rows are selected", () => {
      const { result } = renderHook(() =>
        useTableSelection({
          selectionMode: "multiple",
          visibleRowIds,
          defaultSelectedKeys: ["a", "b", "c"],
        }),
      );

      act(() => {
        asMultiple(result)
          .getRowCheckboxProps("b")
          .onChange?.({} as React.ChangeEvent<HTMLInputElement>);
      });

      expect(asMultiple(result).selectedKeys).toEqual(["a", "c"]);
    });

    test("disabled rows have disabled prop", () => {
      const { result } = renderHook(() =>
        useTableSelection({
          selectionMode: "multiple",
          visibleRowIds,
          disabledSelectionKeys: ["b"],
        }),
      );

      expect(asMultiple(result).getRowCheckboxProps("a").disabled).toBe(false);
      expect(asMultiple(result).getRowCheckboxProps("b").disabled).toBe(true);
    });

    test("thead checkbox disabled when all rows disabled", () => {
      const { result } = renderHook(() =>
        useTableSelection({
          selectionMode: "multiple",
          visibleRowIds,
          disabledSelectionKeys: ["a", "b", "c"],
        }),
      );

      expect(asMultiple(result).getTheadCheckboxProps().disabled).toBe(true);
    });

    test("parent rows show indeterminate when visible descendants are partially selected", () => {
      const { result } = renderHook(() =>
        useTableSelection({
          selectionMode: "multiple",
          visibleRowIds: ["a", "a1", "a2"],
          descendantRowIdsById,
          defaultSelectedKeys: ["a1"],
        }),
      );

      const parentProps = asMultiple(result).getRowCheckboxProps("a");

      expect(parentProps.checked).toBe(false);
      expect(parentProps.indeterminate).toBe(true);
    });

    test("toggling a parent row selects and deselects its descendants", () => {
      const { result } = renderHook(() =>
        useTableSelection({
          selectionMode: "multiple",
          visibleRowIds: ["a", "a1", "a2"],
          descendantRowIdsById,
        }),
      );

      act(() => {
        asMultiple(result)
          .getRowCheckboxProps("a")
          .onChange?.({} as React.ChangeEvent<HTMLInputElement>);
      });

      expect(asMultiple(result).selectedKeys).toEqual(["a", "a1", "a2", "a2a"]);

      act(() => {
        asMultiple(result)
          .getRowCheckboxProps("a")
          .onChange?.({} as React.ChangeEvent<HTMLInputElement>);
      });

      expect(asMultiple(result).selectedKeys).toEqual([]);
    });

    test("toggling a collapsed parent selects and deselects hidden descendants", () => {
      const { result } = renderHook(() =>
        useTableSelection({
          selectionMode: "multiple",
          visibleRowIds: ["a"],
          descendantRowIdsById,
        }),
      );

      act(() => {
        asMultiple(result)
          .getRowCheckboxProps("a")
          .onChange?.({} as React.ChangeEvent<HTMLInputElement>);
      });

      expect(asMultiple(result).selectedKeys).toEqual(["a", "a1", "a2", "a2a"]);

      act(() => {
        asMultiple(result)
          .getRowCheckboxProps("a")
          .onChange?.({} as React.ChangeEvent<HTMLInputElement>);
      });

      expect(asMultiple(result).selectedKeys).toEqual([]);
    });
  });
});
