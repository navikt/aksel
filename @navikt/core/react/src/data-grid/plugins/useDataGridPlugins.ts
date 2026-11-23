import type { ReactNode } from "react";
import { consoleWarning } from "../../utils/helpers/consoleWarning";

/**
 * Plugin that extends DataGrid rendering (e.g. wrapping the table in providers
 * or extra UI). Remember to memoize the plugin object (with `useMemo`) so
 * DataGrid can skip unnecessary re-renders.
 */
interface DataGridPlugin {
  /**
   * Wraps the table output in context providers or surrounding UI (e.g. pagination).
   * Runs as a plain function during render. Do not call React hooks directly
   * inside this function; render a component or provider that calls hooks instead.
   */
  transformTableContext: (children: ReactNode) => ReactNode;
}

/**
 * Fixed order for built-in plugins so behavior doesn't depend on key order
 * in `plugins={{ ... }}`. Custom plugins are placed after these, in their
 * original order.
 */
const PLUGIN_ORDER = ["pagination"] as const;
const KNOWN_PLUGINS = new Set<string>(PLUGIN_ORDER);

type BuiltInDataGridPluginKey = (typeof PLUGIN_ORDER)[number];

/**
 * Named plugins passed to DataGrid.
 *
 * Keep plugins always present rather than toggling entries conditionally:
 * adding or removing a plugin that wraps children changes React's tree depth and remounts the grid.
 * Control active/visible state inside the plugin instead.
 */
type DataGridPlugins = Partial<
  Record<BuiltInDataGridPluginKey, DataGridPlugin>
> &
  Record<string, DataGridPlugin>;

/**
 * We freeze in dev-mode to enforce immutability of the empty plugin array.
 * Based on React best practices: https://react.dev/reference/react/createElement#caveats
 */
const EMPTY_PLUGINS: readonly never[] =
  process.env.NODE_ENV !== "production" ? Object.freeze([]) : [];

/**
 * Turns a `plugins={{ ... }}` object into an ordered, stable plugin array.
 *
 * - Orders built-in plugins consistently (`orderPlugins`).
 * - Keeps the same array reference even when the consumer passes an inline
 *   `plugins={{ pagination }}` object on every render (`internByIdentity`).
 */
function useDataGridPlugins(
  userPlugins?: DataGridPlugins,
): readonly DataGridPlugin[] {
  return internByIdentity(orderPlugins(userPlugins));
}

// WeakMap keys must be objects; guard against nullish/primitive entries at runtime.
function isPluginObject(value: unknown): value is DataGridPlugin {
  return typeof value === "object" && value !== null;
}

/**
 * Places known plugins first (in `PLUGIN_ORDER`), then unknown plugins in
 * insertion order.
 */
function orderPlugins(
  userPlugins?: DataGridPlugins,
): readonly DataGridPlugin[] {
  if (!userPlugins) {
    return EMPTY_PLUGINS;
  }

  const keys = Object.keys(userPlugins);
  if (keys.length === 0) {
    return EMPTY_PLUGINS;
  }

  const ordered: DataGridPlugin[] = [];

  for (const name of PLUGIN_ORDER) {
    /* TS target does not support Object.hasOwn */
    if (Object.prototype.hasOwnProperty.call(userPlugins, name)) {
      const plugin = userPlugins[name];
      if (isPluginObject(plugin)) {
        ordered.push(plugin);
      }
    }
  }

  for (const name of keys) {
    if (!KNOWN_PLUGINS.has(name)) {
      const plugin = userPlugins[name];
      if (isPluginObject(plugin)) {
        ordered.push(plugin);
      }
    }
  }

  return ordered;
}

interface InternNode {
  readonly next: WeakMap<object, InternNode>;
  array?: readonly object[];
}

/**
 * Tree of WeakMaps where each path represents a sequence of plugin objects.
 * WeakMap lets unused paths be garbage-collected when plugins go away.
 */
const internRoot: InternNode = { next: new WeakMap() };

/**
 * Returns the same array instance whenever given the same objects in the same order
 * using a WeakMap trie (prefix tree keyed by object identity).
 *
 * Solves inline `plugins={{ pagination }}` props: `useMemo` on the outer object
 * would miss every render, and mutating a `useRef` during render is unsafe in
 * StrictMode / concurrent React.
 *
 * Each item walks one step down `internRoot`:
 * ```text
 * internRoot
 *  └─ [pluginA] ──▶ nodeA  (array: [pluginA])
 *                    └─ [pluginB] ──▶ nodeAB (array: [pluginA, pluginB])
 *  └─ [pluginB] ──▶ nodeB
 *                    └─ [pluginA] ──▶ nodeBA (array: [pluginB, pluginA])
 * ```
 *
 * 1. Walk `internRoot` using each item as a `WeakMap` key, creating nodes as needed.
 * 2. Cache a copy at the terminal node so future calls with the same sequence return the exact same (`===`) array.
 * 3. Unused branches are garbage-collected automatically once any plugin object in the path is no longer referenced.
 */
function internByIdentity<T extends object>(items: readonly T[]): readonly T[] {
  if (items.length === 0) {
    return EMPTY_PLUGINS;
  }

  let node = internRoot;
  for (const item of items) {
    let child = node.next.get(item);
    if (child === undefined) {
      child = { next: new WeakMap() };
      node.next.set(item, child);
    }
    node = child;
  }

  if (node.array === undefined) {
    const copy = items.slice();
    /* Freeze in dev so accidental mutation fails fast instead of corrupting the shared cache. */
    node.array =
      process.env.NODE_ENV !== "production" ? Object.freeze(copy) : copy;
  }
  return node.array as readonly T[];
}

/**
 * Wraps `children` with each plugin's `transformTableContext`.
 * Runs in reverse so the first plugin wraps outermost.
 * Synchronous errors are caught and logged, and an `undefined` return preserves
 * the previous content so one broken plugin doesn't blank or crash the grid.
 */
function applyTableContext(
  plugins: readonly DataGridPlugin[],
  children: ReactNode,
): ReactNode {
  let content = children;

  for (let i = plugins.length - 1; i >= 0; i--) {
    const transform = plugins[i].transformTableContext;

    if (typeof transform !== "function") {
      continue;
    }

    try {
      const next = transform(content);
      if (next === undefined) {
        consoleWarning(
          "DataGrid: Plugin transformTableContext returned undefined. Preserving previous content.",
        );
        continue;
      }
      content = next;
    } catch (error) {
      console.error(
        "[Aksel] DataGrid: Plugin threw in transformTableContext:",
        error,
      );
    }
  }

  return content;
}

export { applyTableContext, useDataGridPlugins };
export type { DataGridPlugin, DataGridPlugins };
