import { renderHook } from "@testing-library/react";
import { afterEach, describe, expect, test, vi } from "vitest";
import * as consoleWarningModule from "../../utils/helpers/consoleWarning";
import {
  type DataGridPlugin,
  type DataGridPlugins,
  applyTableContext,
  useDataGridPlugins,
} from "./useDataGridPlugins";

const createContextPlugin = (label: string): DataGridPlugin => ({
  transformTableContext: (children) => `${label}(${children})`,
});

describe("useDataGridPlugins", () => {
  test("returns a stable empty array when plugins are undefined or empty", () => {
    const { result, rerender } = renderHook<
      readonly DataGridPlugin[],
      { plugins?: DataGridPlugins }
    >(({ plugins }) => useDataGridPlugins(plugins), {
      initialProps: { plugins: undefined },
    });

    const initialResult = result.current;
    expect(initialResult).toEqual([]);

    rerender({ plugins: {} });
    expect(result.current).toBe(initialResult);
  });

  test("orders known plugins before unknown plugins, ignores prototype keys, and skips non-object entries", () => {
    const customFirst = createContextPlugin("first");
    const customSecond = createContextPlugin("second");
    const pagination = createContextPlugin("pagination");

    const { result } = renderHook(() =>
      useDataGridPlugins({
        zCustom: customFirst,
        aCustom: customSecond,
        pagination,
      }),
    );
    expect(result.current).toEqual([pagination, customFirst, customSecond]);

    const inherited = Object.create({ pagination }) as DataGridPlugins;
    inherited.custom = customFirst;
    const { result: inheritedResult } = renderHook(() =>
      useDataGridPlugins(inherited),
    );
    expect(inheritedResult.current).toEqual([customFirst]);

    // Runtime guard: nullish or primitive entries on known or custom keys are skipped instead of crashing WeakMap
    const { result: invalidEntriesResult } = renderHook(() =>
      useDataGridPlugins({
        pagination: undefined,
        customUndefined: undefined,
        customNull: null,
        customPrimitive: "not-an-object",
        valid: customFirst,
      } as unknown as DataGridPlugins),
    );
    expect(invalidEntriesResult.current).toEqual([customFirst]);
  });

  test("interns array reference by plugin identity and order across inline objects", () => {
    const pagination = createContextPlugin("pagination");
    const customA = createContextPlugin("a");
    const customB = createContextPlugin("b");

    const { result, rerender } = renderHook<
      readonly DataGridPlugin[],
      { plugins?: DataGridPlugins }
    >(({ plugins }) => useDataGridPlugins(plugins), {
      initialProps: { plugins: { customA, pagination } },
    });

    const first = result.current;
    expect(Object.isFrozen(first)).toBe(true);

    // New inline object with same plugin instances (even in different key order)
    rerender({ plugins: { pagination, customA } });
    expect(result.current).toBe(first);

    // Removing a plugin returns a new array; restoring it returns the interned array
    rerender({ plugins: { pagination } });
    expect(result.current).not.toBe(first);
    expect(result.current).toEqual([pagination]);

    rerender({ plugins: { pagination, customA } });
    expect(result.current).toBe(first);

    // Changing plugin order or replacing an instance produces a new array
    rerender({ plugins: { customA, customB } });
    const ab = result.current;
    rerender({ plugins: { customB, customA } });
    expect(result.current).not.toBe(ab);
    expect(result.current).toEqual([customB, customA]);
  });
});

describe("applyTableContext", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("wraps children in reverse plugin order and skips plugins without a valid transform", () => {
    const pagination = createContextPlugin("pagination");
    const custom = createContextPlugin("custom");
    const noopPlugin = {} as DataGridPlugin;
    const invalidPlugin = {
      transformTableContext: "not-a-function",
    } as unknown as DataGridPlugin;

    expect(applyTableContext([], "table")).toBe("table");
    expect(
      applyTableContext(
        [pagination, noopPlugin, invalidPlugin, custom],
        "table",
      ),
    ).toBe("pagination(custom(table))");
  });

  test("preserves previous content and warns when transformTableContext returns undefined", () => {
    const warnSpy = vi
      .spyOn(consoleWarningModule, "consoleWarning")
      .mockImplementation(() => {});
    const outer = createContextPlugin("outer");
    const returnsUndefined: DataGridPlugin = {
      transformTableContext: () => undefined,
    };
    const inner = createContextPlugin("inner");

    expect(applyTableContext([outer, returnsUndefined, inner], "table")).toBe(
      "outer(inner(table))",
    );
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining("transformTableContext returned undefined"),
    );
  });

  test("catches plugin errors, logs them, and continues applying remaining plugins", () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const boom = new Error("plugin failure");
    const outer = createContextPlugin("outer");
    const broken: DataGridPlugin = {
      transformTableContext: () => {
        throw boom;
      },
    };
    const inner = createContextPlugin("inner");

    expect(applyTableContext([outer, broken, inner], "table")).toBe(
      "outer(inner(table))",
    );
    expect(errorSpy).toHaveBeenCalledWith(
      "[Aksel] DataGrid: Plugin threw in transformTableContext:",
      boom,
    );
  });
});
