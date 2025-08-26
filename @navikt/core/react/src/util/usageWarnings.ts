/**
 * Development-only usage warnings for design system components.
 *
 * These hooks can be used inside slot components (e.g. `FormSummary.Header`)
 * to warn developers in development when certain non-recommended or invalid
 * child components are detected.
 *
 * Quick example:
 *
 * ```tsx
 * const rules = [
 *   {
 *     type: FormSummaryEditLink,
 *     message:
 *       "<FormSummary.EditLink> should be placed inside <FormSummary.Footer>, not inside <FormSummary.Header>. See: https://aksel.nav.no/komponenter/core/formsummary",
 *     severity: "warn",
 *     key: "formsummary-editlink-in-header",
 *   },
 *   {
 *     type: FormSummaryAnswers,
 *     message:
 *       "<FormSummary.Answers> should not be placed inside <FormSummary.Header>. See: https://aksel.nav.no/komponenter/core/formsummary",
 *     severity: "error",
 *     key: "formsummary-answers-in-header",
 *   },
 * ] as const;
 *
 * useWarnIfContainsAny(children, rules);
 * ```
 *
 * Hooks:
 * - `useWarnIfContainsComponent`: for a single rule
 * - `useWarnIfContainsAny`: for multiple rules in one call
 */
import * as React from "react";

/* ============================================================================
 * Types (exported)
 * ========================================================================== */

export type Severity = "warn" | "error";

/** A single rule. Declared as `readonly` so `as const` objects are compatible. */
export type MultiRule = Readonly<{
  /** The React component type to detect (e.g. FormSummaryEditLink) */
  type: React.ElementType;
  /** The console message (ideally including a docs link) */
  message: string;
  /** Severity level: "warn" (default) or "error" */
  severity?: Severity;
  /** Unique key for dedupe (optional, but recommended; prevents repeated logs spam) */
  key?: string;
}>;

/* ============================================================================
 * Internal helpers/constants
 * ========================================================================== */

const isDev =
  process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test";

const emitted = new Set<string>(); // dedupe across renders/stories
const systemPrefix = "[Aksel]";

/** Recursively traverse children tree. */
function walk(
  node: React.ReactNode,
  match: (el: React.ReactElement) => boolean,
): boolean {
  return React.Children.toArray(node).some((child) => {
    if (!React.isValidElement(child)) return false;
    if (match(child)) return true;
    return walk(child.props?.children, match);
  });
}

/* ============================================================================
 * Public hooks (exported)
 * ========================================================================== */

/**
 * Issues a development-only warning or error if a specific component type
 * is found anywhere in `children` (recursively).
 *
 * Typically used in slot components (such as `FormSummary.Header`) to
 * highlight non-recommended placement of children.
 *
 * @param children React children to inspect recursively
 * @param type The React component reference to detect
 * @param message The console message (ideally including docs link)
 * @param severity Severity level: "warn" (default) or "error"
 * @param key Unique key for dedupe (optional; prevents repeated logs)
 */
export function useWarnIfContainsComponent(
  children: React.ReactNode,
  type: React.ElementType,
  message: string,
  severity: Severity = "warn",
  key?: string,
) {
  React.useEffect(() => {
    if (!isDev) return;

    const found = walk(children, (el) => el.type === type);
    if (!found) return;

    const k = key ?? message;
    if (emitted.has(k)) return;
    emitted.add(k);

    const log = severity === "error" ? console.error : console.warn;
    log(`${systemPrefix} ${message}`);
  }, [children, type, message, severity, key]);
}

/**
 * Issues development-only warnings or errors for multiple rules in one pass,
 * using a single `useEffect`.
 *
 * @param children React children to inspect recursively
 * @param rules List of rules to evaluate (see `MultiRule`)
 *
 * @example
 * const rules = [
 *   { type: X, message: "…", severity: "warn", key: "x" },
 *   { type: Y, message: "…", severity: "error", key: "y" },
 * ] as const;
 * useWarnIfContainsAny(children, rules);
 */
// TODO: add unit tests for this hook
// TODO: add test coverage for this hook
// TODO: add storybook story that demonstrates this hook in action
// TODO: add Storybook integration test that verifies the warnings appear as expected
// TODO: consider adding a "suggestion" field to the rule, for even better DX
// TODO: consider adding a "url" field to the rule, for direct link to docs
// TODO: consider adding a "oncePerSession" boolean field to the rule, to persist dedupe across page reloads
// TODO: ???
export function useWarnIfContainsAny(
  children: React.ReactNode,
  rules: readonly MultiRule[],
) {
  React.useEffect(() => {
    if (!isDev || rules.length === 0) return;

    for (const { type, message, severity = "warn", key } of rules) {
      const found = walk(children, (el) => el.type === type);
      if (!found) continue;

      const dedupeKey = key ?? message;
      if (emitted.has(dedupeKey)) continue;
      emitted.add(dedupeKey);

      const log = severity === "error" ? console.error : console.warn;
      log(`${systemPrefix} ${message}`);
    }
  }, [children, rules]);
}
