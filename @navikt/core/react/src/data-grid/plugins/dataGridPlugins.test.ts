import { afterEach, describe, expect, test, vi } from "vitest";
import * as consoleWarningModule from "../../utils/helpers/consoleWarning";
import {
  type DataGridPlugin,
  type DataGridPlugins,
  applyTableContext,
  resolveDataGridPlugins,
} from "./dataGridPlugins";

const createTestPlugin = (label: string): DataGridPlugin => ({
  transformTableContext: (children) => `${label}(${children})`,
});

describe("resolveDataGridPlugins", () => {
  test("returns a stable empty array when plugins are undefined or empty", () => {
    const initialResult = resolveDataGridPlugins(undefined);
    expect(initialResult).toEqual([]);
    expect(resolveDataGridPlugins({})).toBe(initialResult);
  });

  test("orders known plugins before unknown plugins, ignores prototype keys, and skips non-object entries", () => {
    const customFirst = createTestPlugin("first");
    const customSecond = createTestPlugin("second");
    const pagination = createTestPlugin("pagination");

    expect(
      resolveDataGridPlugins({
        zCustom: customFirst,
        aCustom: customSecond,
        pagination,
      }),
    ).toEqual([pagination, customFirst, customSecond]);

    const inherited = Object.create({ pagination }) as DataGridPlugins;
    inherited.custom = customFirst;
    expect(resolveDataGridPlugins(inherited)).toEqual([customFirst]);
  });

  test("interns array reference by plugin identity and order across inline objects", () => {
    const pagination = createTestPlugin("pagination");
    const customA = createTestPlugin("a");
    const customB = createTestPlugin("b");

    const first = resolveDataGridPlugins({ customA, pagination });
    expect(Object.isFrozen(first)).toBe(true);

    // New inline object with same plugin instances (even in different key order)
    expect(resolveDataGridPlugins({ pagination, customA })).toBe(first);

    // Removing a plugin returns a new array; restoring it returns the interned array
    const paginationOnly = resolveDataGridPlugins({ pagination });
    expect(paginationOnly).not.toBe(first);
    expect(paginationOnly).toEqual([pagination]);

    expect(resolveDataGridPlugins({ pagination, customA })).toBe(first);

    // Changing plugin order or replacing an instance produces a new array
    const ab = resolveDataGridPlugins({ customA, customB });
    const ba = resolveDataGridPlugins({ customB, customA });
    expect(ba).not.toBe(ab);
    expect(ba).toEqual([customB, customA]);
  });
});

describe("applyTableContext", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("wraps children in reverse plugin order and skips plugins without a valid transform", () => {
    const pagination = createTestPlugin("pagination");
    const custom = createTestPlugin("custom");
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

  test("preserves previous content and warns when transformTableContext returns a falsy value", () => {
    const warnSpy = vi
      .spyOn(consoleWarningModule, "consoleWarning")
      .mockImplementation(() => {});
    const outer = createTestPlugin("outer");
    const returnsUndefined: DataGridPlugin = {
      transformTableContext: () => undefined,
    };
    const returnsNull: DataGridPlugin = {
      transformTableContext: () => null,
    };
    const returnsFalse: DataGridPlugin = {
      transformTableContext: () => false,
    };
    const inner = createTestPlugin("inner");

    expect(
      applyTableContext(
        [outer, returnsUndefined, returnsNull, returnsFalse, inner],
        "table",
      ),
    ).toBe("outer(inner(table))");
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('transformTableContext returned "undefined"'),
    );
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('transformTableContext returned "null"'),
    );
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('transformTableContext returned "false"'),
    );
  });
});
