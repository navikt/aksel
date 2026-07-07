import type React from "react";
import type { ComponentName } from "./component-names.generated";

/**
 * A value that can be documented from a `*.meta.ts` file: either a React
 * component (rendered as a prop-table) or a hook/function (rendered as an
 * arg-table). Kept intentionally loose so compound components, `forwardRef`,
 * `OverridableComponent` and hook signatures all assign without friction.
 */
type MetaEntry = React.ElementType | ((...args: any[]) => any);

/**
 * Curated documentation metadata for a single component family.
 *
 * One `<ComponentName>.meta.ts` file per family, colocated in the component
 * directory, exporting a `metadata` object typed as `ComponentMetadata`. The
 * extractor (`scripts/extract-metadata.ts`) reads every meta file and emits the
 * grouped `_metadata.json` consumed downstream (doc pages + MCP server).
 *
 * Authoring conventions:
 * - `name` is a unique, PascalCase family id. It is also used as the
 *   Sanity document `_id`, so it must be unique across all meta files and only
 *   contain characters valid in a Sanity id (letters, numbers, `.`, `-`, `_`).
 * - The insertion order of `components` (then `utils`) is the render order in
 *   the docs. Author them in the order they should appear.
 * - Each map key is the display label shown above its table. Use dot-notation
 *   for compound parts, e.g. `"Accordion.Item"`.
 * - `utils` are hooks/functions (e.g. `useDatepicker`); they are documented from
 *   their argument object, grouped separately from `components`.
 * - `keywords` power search/MCP and must be non-empty.
 * - `related` references other families by their `name`. It is type-checked
 *   against {@link ComponentName}, so a family must have its own meta file
 *   before it can be referenced.
 *
 * @example
 * const metadata: ComponentMetadata = {
 *   name: "Accordion",
 *   components: {
 *     Accordion,
 *     "Accordion.Item": AccordionItem,
 *   },
 *   keywords: ["accordion", "expandable"],
 *   related: ["ReadMore"],
 * };
 */
type ComponentMetadata = {
  name: string;
  components: Record<string, MetaEntry>;
  utils?: Record<string, MetaEntry>;
  keywords: string[];
  related?: ComponentName[];
};

export type { ComponentMetadata, MetaEntry };
