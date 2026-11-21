import { type ReactNode, useEffect, useRef } from "react";
import { consoleWarning } from "../../utils/helpers/consoleWarning";

/**
 * Plugin that extends DataGrid rendering (e.g. wrapping the table in providers
 * or extra UI). Remember to memoize the plugin object (e.g. with `useMemo`) so
 * DataGrid can skip unnecessary re-renders.
 */
interface DataGridPlugin {
  /**
   * Wraps the table output in context providers or surrounding UI (e.g. pagination).
   * Runs as a plain function during render — do not call React hooks directly
   * inside this function; render a component or provider that calls hooks instead.
   */
  transformTableContext?: (children: ReactNode) => ReactNode;
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
 * adding or removing a plugin that wraps children changes React's tree depth
 * and remounts the grid (resetting internal state, focus, and scroll position).
 * Control active/visible state inside the plugin instead.
 */
type DataGridPlugins = Partial<
  Record<BuiltInDataGridPluginKey, DataGridPlugin>
> &
  Record<string, DataGridPlugin>;

/** Allowed keys on `DataGridPlugin`, checked in dev mode to catch typos. */
const VALID_TRANSFORM_KEYS = new Set<string>(["transformTableContext"]);

const EMPTY_PLUGINS: readonly never[] =
  process.env.NODE_ENV !== "production" ? Object.freeze([]) : [];
const EMPTY_NAMES: readonly string[] = [];

// Maps an interned plugin array to its latest key names for dev validation.
const pluginNamesMap = new WeakMap<
  readonly DataGridPlugin[],
  readonly string[]
>();

/**
 * Turns a `plugins={{ ... }}` object into an ordered, stable plugin array.
 *
 * - Orders built-in plugins consistently (`orderPlugins`).
 * - Keeps the same array reference even when the consumer passes an inline
 *   `plugins={{ pagination }}` object on every render (`internByIdentity`).
 * - Warns in dev mode about typos, invalid values, or empty plugins.
 *
 * Treat the returned array as read-only (it is shared across renders).
 */
function useDataGridPlugins(
  userPlugins?: DataGridPlugins,
): readonly DataGridPlugin[] {
  const ordered = orderPlugins(userPlugins);
  const plugins = internByIdentity(ordered.plugins);

  // Overwrite so dev warnings report the current key names if a plugin instance is reused under another key.
  if (process.env.NODE_ENV !== "production" && ordered.names.length > 0) {
    pluginNamesMap.set(plugins, ordered.names);
  }

  // Avoid re-validating on StrictMode replays.
  const validatedRef = useRef<readonly DataGridPlugin[] | null>(null);

  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      return;
    }
    if (validatedRef.current === plugins) {
      return;
    }
    validatedRef.current = plugins;

    const names = pluginNamesMap.get(plugins);
    for (let i = 0; i < plugins.length; i++) {
      validatePlugin(names?.[i] ?? `#${i}`, plugins[i]);
    }
  }, [plugins]);

  return plugins;
}

// WeakMap keys must be objects; guard against nullish/primitive entries at runtime.
function isPluginObject(value: unknown): value is DataGridPlugin {
  return typeof value === "object" && value !== null;
}

/**
 * Places known plugins first (in `PLUGIN_ORDER`), then unknown plugins in
 * insertion order.
 */
function orderPlugins(userPlugins?: DataGridPlugins): {
  plugins: readonly DataGridPlugin[];
  names: readonly string[];
} {
  if (!userPlugins) {
    return { plugins: EMPTY_PLUGINS, names: EMPTY_NAMES };
  }

  const keys = Object.keys(userPlugins);
  if (keys.length === 0) {
    return { plugins: EMPTY_PLUGINS, names: EMPTY_NAMES };
  }

  const ordered: DataGridPlugin[] = [];
  const names: string[] = [];

  for (const name of PLUGIN_ORDER) {
    if (Object.prototype.hasOwnProperty.call(userPlugins, name)) {
      const plugin = userPlugins[name];
      if (isPluginObject(plugin)) {
        ordered.push(plugin);
        if (process.env.NODE_ENV !== "production") {
          names.push(name);
        }
      }
    }
  }

  for (const name of keys) {
    if (!KNOWN_PLUGINS.has(name)) {
      const plugin = userPlugins[name];
      if (isPluginObject(plugin)) {
        ordered.push(plugin);
        if (process.env.NODE_ENV !== "production") {
          names.push(name);
        }
      }
    }
  }

  return { plugins: ordered, names };
}

interface InternNode {
  readonly next: WeakMap<object, InternNode>;
  array?: readonly object[];
}

// Tree of WeakMaps where each path represents a sequence of plugin objects.
// WeakMap lets unused paths be garbage-collected when plugins go away.
const internRoot: InternNode = { next: new WeakMap() };

/**
 * Returns the same array instance whenever given the same objects in the same order.
 *
 * Solves inline `plugins={{ pagination }}` props: `useMemo` on the outer object
 * would miss every render, and mutating a `useRef` during render is unsafe in
 * StrictMode / concurrent React.
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
    // Freeze in dev so accidental mutation fails fast instead of corrupting the shared cache.
    node.array =
      process.env.NODE_ENV !== "production" ? Object.freeze(copy) : copy;
  }
  return node.array as readonly T[];
}

/** Warns in dev mode about unknown keys, non-function transforms, or empty plugins. */
function validatePlugin(name: string, plugin: DataGridPlugin): void {
  const keys = Object.keys(plugin);
  const record = plugin as Record<string, unknown>;
  let hasTransforms = false;
  let hasWarning = false;

  for (const key of keys) {
    if (!VALID_TRANSFORM_KEYS.has(key)) {
      hasWarning = true;
      consoleWarning(
        `DataGrid: Plugin "${name}" has unknown key "${key}". ` +
          `Valid keys: ${[...VALID_TRANSFORM_KEYS].join(", ")}. ` +
          "This key will be ignored.",
      );
      continue;
    }

    const value = record[key];
    if (typeof value === "function") {
      hasTransforms = true;
    } else if (value != null) {
      hasWarning = true;
      consoleWarning(
        `DataGrid: Plugin "${name}" has non-function value for "${key}" ` +
          `(got ${typeof value}). Transform will be skipped.`,
      );
    }
  }

  if (!hasTransforms && !hasWarning) {
    consoleWarning(
      `DataGrid: Plugin "${name}" has no transform methods. ` +
        "It will be included in the pipeline but won't do anything.",
    );
  }
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
    if (typeof transform === "function") {
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
  }

  return content;
}

export { applyTableContext, useDataGridPlugins };
export type { DataGridPlugin, DataGridPlugins };
