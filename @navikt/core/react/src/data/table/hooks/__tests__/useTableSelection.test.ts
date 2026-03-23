import { act, renderHook } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import type {
  MultipleSelection,
  SingleSelection,
} from "../../helpers/selection/selection.types";
import { useTableSelection } from "../useTableSelection";

type Item = { id: string; name: string };

const items: Item[] = [
  { id: "a", name: "Alpha" },
  { id: "b", name: "Beta" },
  { id: "c", name: "Charlie" },
];

const getRowId = (item: Item) => item.id;

function asSingle(
  result: ReturnType<typeof renderHook>["result"],
): SingleSelection {
  return result.current as SingleSelection;
}

function asMultiple(
  result: ReturnType<typeof renderHook>["result"],
): MultipleSelection {
  return result.current as MultipleSelection;
}

describe("useTableSelection", () => {
  describe('selectionMode="none"', () => {
    test("returns empty selectedKeys and no prop getters", () => {
      const { result } = renderHook(() =>
        useTableSelection({
          selectionMode: "none",
          data: items,
          getRowId,
        }),
      );

      expect(result.current.selectionMode).toBe("none");
      expect(result.current.selectedKeys).toEqual([]);
      expect(result.current.allKeys).toEqual(["a", "b", "c"]);
    });
  });

  describe('selectionMode="single"', () => {
    test("returns getRowRadioProps", () => {
      const { result } = renderHook(() =>
        useTableSelection({
          selectionMode: "single",
          data: items,
          getRowId,
        }),
      );

      expect(result.current.selectionMode).toBe("single");
      expect(asSingle(result).getRowRadioProps).toBeDefined();
    });

    test("selecting a row via radio onChange", () => {
      const onChange = vi.fn();
      const { result } = renderHook(() =>
        useTableSelection({
          selectionMode: "single",
          data: items,
          getRowId,
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

    test("toggling the same row deselects it", () => {
      const { result } = renderHook(() =>
        useTableSelection({
          selectionMode: "single",
          data: items,
          getRowId,
          defaultSelectedKeys: ["a"],
        }),
      );

      act(() => {
        asSingle(result)
          .getRowRadioProps("a")
          .onChange?.({} as React.ChangeEvent<HTMLInputElement>);
      });

      expect(asSingle(result).selectedKeys).toEqual([]);
    });

    test("selecting a new row replaces the previous", () => {
      const { result } = renderHook(() =>
        useTableSelection({
          selectionMode: "single",
          data: items,
          getRowId,
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
          data: items,
          getRowId,
          disabledKeys: ["b"],
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
            data: items,
            getRowId,
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
          data: items,
          getRowId,
        }),
      );

      expect(result.current.selectionMode).toBe("multiple");
      expect(asMultiple(result).getTheadCheckboxProps).toBeDefined();
      expect(asMultiple(result).getRowCheckboxProps).toBeDefined();
    });

    test("selecting individual rows", () => {
      const { result } = renderHook(() =>
        useTableSelection({
          selectionMode: "multiple",
          data: items,
          getRowId,
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
          data: items,
          getRowId,
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
          data: items,
          getRowId,
        }),
      );

      act(() => {
        asMultiple(result)
          .getTheadCheckboxProps()
          .onChange?.({} as React.ChangeEvent<HTMLInputElement>);
      });

      expect(asMultiple(result).selectedKeys).toEqual(["a", "b", "c"]);
    });

    test("deselect all when all are selected", () => {
      const { result } = renderHook(() =>
        useTableSelection({
          selectionMode: "multiple",
          data: items,
          getRowId,
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

    test("thead checkbox shows indeterminate when partially selected", () => {
      const { result } = renderHook(() =>
        useTableSelection({
          selectionMode: "multiple",
          data: items,
          getRowId,
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
          data: items,
          getRowId,
          defaultSelectedKeys: ["a", "b", "c"],
        }),
      );

      const theadProps = asMultiple(result).getTheadCheckboxProps();
      expect(theadProps.indeterminate).toBe(false);
      expect(theadProps.checked).toBe(true);
    });

    test("deselecting one row when selectedKeys is 'all'", () => {
      const { result } = renderHook(() =>
        useTableSelection({
          selectionMode: "multiple",
          data: items,
          getRowId,
          defaultSelectedKeys: "all",
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
          data: items,
          getRowId,
          disabledKeys: ["b"],
        }),
      );

      expect(asMultiple(result).getRowCheckboxProps("a").disabled).toBe(false);
      expect(asMultiple(result).getRowCheckboxProps("b").disabled).toBe(true);
    });

    test("thead checkbox disabled when all rows disabled", () => {
      const { result } = renderHook(() =>
        useTableSelection({
          selectionMode: "multiple",
          data: items,
          getRowId,
          disabledKeys: ["a", "b", "c"],
        }),
      );

      expect(asMultiple(result).getTheadCheckboxProps().disabled).toBe(true);
    });
  });
});
