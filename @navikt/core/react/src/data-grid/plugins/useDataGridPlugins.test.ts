import { renderHook } from "@testing-library/react";
import { afterEach, describe, expect, test, vi } from "vitest";
import {
  type TablePlugin,
  type TablePlugins,
  applyTableContext,
  useDataGridPlugins,
} from "./useDataGridPlugins";

const createContextPlugin = (label: string): TablePlugin => ({
  transformTableContext: (children) => `${label}(${children})`,
});

describe("useDataGridPlugins", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("returns a stable empty array when plugins are undefined, empty, or all undefined", () => {
    const { result, rerender } = renderHook(
      ({ plugins }: { plugins?: TablePlugins }) => useDataGridPlugins(plugins),
      { initialProps: { plugins: undefined } },
    );

    const initialResult = result.current;
    expect(initialResult).toEqual([]);

    rerender({ plugins: {} });
    expect(result.current).toBe(initialResult);

    rerender({ plugins: { pagination: undefined, custom: undefined } });
    expect(result.current).toBe(initialResult);
  });

  test("orders known plugins before unknown plugins and preserves unknown insertion order", () => {
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
  });

  test("preserves array reference across inline plugin record objects with the same plugin identities", () => {
    const pagination = createContextPlugin("pagination");
    const custom = createContextPlugin("custom");

    const { result, rerender } = renderHook(
      ({ plugins }: { plugins?: TablePlugins }) => useDataGridPlugins(plugins),
      { initialProps: { plugins: { custom, pagination } } },
    );

    const first = result.current;

    // New outer object literal with the same plugin instances (even in different key order)
    rerender({ plugins: { pagination, custom } });
    expect(result.current).toBe(first);

    // Replacing a plugin instance produces a new array reference
    const nextPagination = createContextPlugin("pagination-v2");
    rerender({ plugins: { pagination: nextPagination, custom } });
    expect(result.current).not.toBe(first);
    expect(result.current).toEqual([nextPagination, custom]);
  });

  test("warns in dev mode for unknown keys, non-function transforms, and empty plugins", () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

    const badUnknownKey = {
      transformTableContext: (c) => c,
      transformTabelContext: (c: unknown) => c,
    } as TablePlugin;

    const badNonFunction = {
      transformTableContext: "not-a-function",
    } as unknown as TablePlugin;

    const emptyPlugin: TablePlugin = {};

    const { rerender } = renderHook(
      ({ plugins }: { plugins?: TablePlugins }) => useDataGridPlugins(plugins),
      {
        initialProps: {
          plugins: {
            typoPlugin: badUnknownKey,
            wrongTypePlugin: badNonFunction,
            noopPlugin: emptyPlugin,
            disabledPlugin: undefined,
          },
        },
      },
    );

    const messages = warnSpy.mock.calls.map((args) => args.join(" "));
    expect(messages).toContainEqual(
      expect.stringContaining(
        'Plugin "typoPlugin" has unknown key "transformTabelContext"',
      ),
    );
    expect(messages).toContainEqual(
      expect.stringContaining(
        'Plugin "wrongTypePlugin" has non-function value for "transformTableContext" (got string)',
      ),
    );
    expect(messages).toContainEqual(
      expect.stringContaining('Plugin "noopPlugin" has no transform methods.'),
    );
    expect(messages).not.toContainEqual(
      expect.stringContaining("disabledPlugin"),
    );

    // Re-rendering with a new inline record for the same plugin instances does not re-warn
    const callCountAfterFirstRender = warnSpy.mock.calls.length;
    rerender({
      plugins: {
        typoPlugin: badUnknownKey,
        wrongTypePlugin: badNonFunction,
        noopPlugin: emptyPlugin,
      },
    });
    expect(warnSpy).toHaveBeenCalledTimes(callCountAfterFirstRender);
  });
});

describe("applyTableContext", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("wraps children in reverse plugin order so the earliest plugin is outermost", () => {
    const pagination = createContextPlugin("pagination");
    const custom = createContextPlugin("custom");
    const noopPlugin: TablePlugin = {};

    expect(applyTableContext([pagination, noopPlugin, custom], "table")).toBe(
      "pagination(custom(table))",
    );
  });

  test("catches plugin errors, logs them, and continues applying remaining plugins", () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const boom = new Error("plugin failure");
    const outer = createContextPlugin("outer");
    const broken: TablePlugin = {
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
