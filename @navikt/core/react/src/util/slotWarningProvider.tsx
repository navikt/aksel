/**
 * Slot context and usage warning utilities for development.
 *
 * Use this system when child components need to know which slot/parent they are rendered in
 * (e.g. `FormSummary.Header` vs `FormSummary.Footer`) and should warn or error in development
 * if placed in a discouraged or forbidden slot.
 *
 * Usage:
 * - Wrap slot components with <SlotWarningProvider name="FormSummary.Header">…</SlotWarningProvider>
 * - In children, call `useRequireSlot([...], "...")` to require certain slots,
 *   or `useForbidSlot([...], "...")` to forbid certain slots.
 *
 * This is guidance only: warnings are logged to the console in development, never enforced at runtime.
 */
import * as React from "react";

/* =============================================================================
 * Public types
 * ===========================================================================
 */

/** Slot identifier, e.g. "FormSummary.Header" / "FormSummary.Footer". */
export type SlotName = string;

export type Severity = "warn" | "error";

/* =============================================================================
 * Dev/environment guards + dedupe
 * ===========================================================================
 */

/**
 * Allows developers to manually enable usage warnings in any browser environment
 * (excluding production) by setting `window.__AKSEL_DEBUG_WARNINGS__ = true`
 * in the browser console. Useful for local debugging when NODE_ENV is not "development".
 */
const forcedDebug =
  typeof window !== "undefined" &&
  (window as any).__AKSEL_DEBUG_WARNINGS__ === true &&
  process.env.NODE_ENV !== "production";

/**
 * Enables warnings only in development or when forcedDebug is set.
 */
const isDev = forcedDebug || process.env.NODE_ENV === "development";

/** Prefix for all warnings. */
const systemPrefix = "[Aksel]";

/**
 * Stores warning keys globally to avoid duplicate logs across HMR and multiple imports.
 * Ensures each warning is only shown once per browser session.
 */
function getGlobalWarningSet(): Set<string> {
  const globalObj = globalThis as any;
  if (!globalObj.__akselEmittedWarnings) {
    globalObj.__akselEmittedWarnings = new Set<string>();
  }
  return globalObj.__akselEmittedWarnings;
}
const emittedWarnings: Set<string> = getGlobalWarningSet();

/* =============================================================================
 * Slot context
 * ===========================================================================
 */

/**
 * React context for the current slot name.
 * Set by slot components so children can read where they are rendered.
 */
const SlotContext = React.createContext<SlotName | undefined>(undefined);

/**
 * Provider for slot context. Use in slot/parent components to set the slot name for children.
 *
 * @example
 * <SlotWarningProvider name="FormSummary.Footer">
 *   {children}
 * </SlotWarningProvider>
 */
export function SlotWarningProvider({
  name,
  children,
}: {
  name: SlotName;
  children: React.ReactNode;
}) {
  return <SlotContext.Provider value={name}>{children}</SlotContext.Provider>;
}

/**
 * Hook to read the current slot name, or `undefined` if outside any slot.
 */
export function useCurrentSlot(): SlotName | undefined {
  return React.useContext(SlotContext);
}

/* =============================================================================
 * Warning helpers (public API)
 * ===========================================================================
 */

/**
 * Requires that the component is rendered inside one of the given slots.
 * If not, logs a dev-only warning or error (once per session).
 *
 * @param validSlots - Array of allowed slot names for this component.
 * @param message - Warning message to display if invalid.
 * @param severity - "warn" (default) or "error".
 * @param key - Optional deduplication key (defaults to message).
 *
 * @example
 * useRequireSlot(
 *   ["FormSummary.Footer"],
 *   "<FormSummary.EditLink> should be placed inside <FormSummary.Footer>, not inside <FormSummary.Header>. See: https://aksel.nav.no/komponenter/core/formsummary",
 *   "warn",
 *   "formsummary-editlink-in-header"
 * );
 */
export function useRequireSlot(
  validSlots: readonly SlotName[],
  message: string,
  severity: Severity = "warn",
  key?: string,
) {
  const slot = useCurrentSlot();
  React.useEffect(() => {
    if (!isDev) return;
    if (!slot) return; // outside any slot – often ok in isolation/tests
    if (validSlots.includes(slot)) return;

    const dedupeKey = key ?? message;
    if (emittedWarnings.has(dedupeKey)) return;
    emittedWarnings.add(dedupeKey);

    const log = severity === "error" ? console.error : console.warn;
    log(`${systemPrefix} ${message}`);
  }, [slot, validSlots, message, severity, key]);
}

/**
 * Forbids rendering in the given slots.
 * If rendered in any of them, logs a dev-only warning or error (once per session).
 *
 * @param invalidSlots - Array of disallowed slot names for this component.
 * @param message - Warning message to display if invalid.
 * @param severity - "warn" (default) or "error".
 * @param key - Optional deduplication key (defaults to message).
 *
 * @example
 * useForbidSlot(
 *   ["FormSummary.Header"],
 *   "<FormSummary.Answers> should not be placed inside <FormSummary.Header>. See: https://aksel.nav.no/komponenter/core/formsummary",
 *   "error",
 *   "formsummary-answers-in-header"
 * );
 */
export function useForbidSlot(
  invalidSlots: readonly SlotName[],
  message: string,
  severity: Severity = "warn",
  key?: string,
) {
  const slot = useCurrentSlot();
  React.useEffect(() => {
    if (!isDev) return;
    if (!slot) return;
    if (!invalidSlots.includes(slot)) return;

    const dedupeKey = key ?? message;
    if (emittedWarnings.has(dedupeKey)) return;
    emittedWarnings.add(dedupeKey);

    const log = severity === "error" ? console.error : console.warn;
    log(`${systemPrefix} ${message}`);
  }, [slot, invalidSlots, message, severity, key]);
}

/* =============================================================================
 * Storybook helper (optional)
 * ===========================================================================
 */

/**
 * Resets deduplication for Storybook testing. No effect in production.
 * Call at the start of a misuse story if you want the console message to re-appear.
 */
export function __resetUsageWarningsForStorybook() {
  emittedWarnings.clear();
}
