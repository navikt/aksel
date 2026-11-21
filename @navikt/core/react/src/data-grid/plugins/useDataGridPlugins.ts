import { type ReactNode, useEffect, useRef } from "react";
import { consoleWarning } from "../../utils/helpers/consoleWarning";

/**
 * Plugin that extends DataGrid rendering (e.g. wrapping the table in providers
 * or extra UI). Remember to memoize the plugin object (e.g. with `useMemo`) so DataGrid
 * can skip unnecessary re-renders.
 */
interface TablePlugin {
  /** Wraps the table output in context providers or surrounding UI (e.g. pagination). */
  transformTableContext?: (children: ReactNode) => ReactNode;
}

/**
 * Named plugins passed to DataGrid.
 * Allows `undefined` values for conditional plugins:
 * `plugins={{ pagination: enabled ? paginationPlugin : undefined }}`
 */
type TablePlugins = Record<string, TablePlugin | undefined>;

/**
 * Fixed order for built-in plugins so behavior doesn't depend on key order
 * in `plugins={{ ... }}`. Custom plugins are placed after these, in their
 * original order.
 */
const PLUGIN_ORDER = ["pagination"] as const;
const KNOWN_PLUGINS = new Set<string>(PLUGIN_ORDER);

/** Allowed keys on `TablePlugin`, checked in dev mode to catch typos. */
const VALID_TRANSFORM_KEYS = new Set<string>(["transformTableContext"]);

const EMPTY_PLUGINS: readonly TablePlugin[] = [];

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
  userPlugins?: TablePlugins,
): readonly TablePlugin[] {
  const plugins = internByIdentity(orderPlugins(userPlugins));

  // Avoid re-validating on inline `plugins={{ ... }}` re-renders or StrictMode replays.
  const validatedRef = useRef<readonly TablePlugin[] | null>(null);

  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      return;
    }
    if (validatedRef.current === plugins) {
      return;
    }
    validatedRef.current = plugins;

    if (userPlugins) {
      for (const [name, plugin] of Object.entries(userPlugins)) {
        plugin && validatePlugin(name, plugin);
      }
    }
  }, [plugins, userPlugins]);

  return plugins;
}

/**
 * Places known plugins first (in `PLUGIN_ORDER`), then unknown plugins in
 * insertion order, skipping `undefined` entries.
 */
function orderPlugins(userPlugins?: TablePlugins): readonly TablePlugin[] {
  if (!userPlugins) {
    return EMPTY_PLUGINS;
  }

  const keys = Object.keys(userPlugins);
  if (keys.length === 0) {
    return EMPTY_PLUGINS;
  }

  const ordered: TablePlugin[] = [];

  for (const name of PLUGIN_ORDER) {
    if (Object.prototype.hasOwnProperty.call(userPlugins, name)) {
      const plugin = userPlugins[name];
      if (plugin) {
        ordered.push(plugin);
      }
    }
  }

  for (const name of keys) {
    if (!KNOWN_PLUGINS.has(name)) {
      const plugin = userPlugins[name];
      if (plugin) {
        ordered.push(plugin);
      }
    }
  }

  return ordered.length > 0 ? ordered : EMPTY_PLUGINS;
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
    return EMPTY_PLUGINS as readonly T[];
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

  node.array ??= items.slice();
  return node.array as readonly T[];
}

/** Warns in dev mode about unknown keys, non-function transforms, or empty plugins. */
function validatePlugin(name: string, plugin: TablePlugin): void {
  const keys = Object.keys(plugin);
  const record = plugin as Record<string, unknown>;
  let hasTransforms = false;

  for (const key of keys) {
    if (!VALID_TRANSFORM_KEYS.has(key)) {
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
      consoleWarning(
        `DataGrid: Plugin "${name}" has non-function value for "${key}" ` +
          `(got ${typeof value}). Transform will be skipped.`,
      );
    }
  }

  if (!hasTransforms) {
    consoleWarning(
      `DataGrid: Plugin "${name}" has no transform methods. ` +
        "It will be included in the pipeline but won't do anything.",
    );
  }
}

/**
 * Wraps `children` with each plugin's `transformTableContext`.
 * Runs in reverse so the first plugin wraps outermost. Errors are caught and
 * logged so one broken plugin doesn't crash the grid.
 */
function applyTableContext(
  plugins: readonly TablePlugin[],
  children: ReactNode,
): ReactNode {
  let content = children;

  for (let i = plugins.length - 1; i >= 0; i--) {
    const transform = plugins[i].transformTableContext;
    if (typeof transform === "function") {
      try {
        content = transform(content);
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
export type { TablePlugin, TablePlugins };
