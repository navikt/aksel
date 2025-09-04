/**
 * Give warnings based on component composition (which slot/parent a child is rendered in).
 *
 * Used when child components need to know which slot/parent they are rendered in
 * (e.g. `FormSummary.Header` vs `FormSummary.Footer`) and should warn or error in development
 * if placed in a discouraged or forbidden slot.
 *
 * Usage:
 * - Wrap slot components with <CompositionWarning.Root name="FormSummary.Header">...</CompositionWarning.Root>
 * - In child: `<CompositionWarning.Forbidden name="FormSummary.Header" />` to forbid slot.
 *
 * This is guidance only: warnings are logged to the console in development, never enforced at runtime.
 */
import React, { useEffect, useRef } from "react";
import { Slot } from "../../slot/Slot";
import { createContext } from "../create-context";

type CompositionName = string;

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

type CompositionWarningContextType = {
  name: CompositionName;
};

const [CompositionWarning, useCompositionWarning] =
  createContext<CompositionWarningContextType>({
    errorMessage:
      "useCompositionWarning() must be used within <CompositionWarning />",
  });

type CompositionWarningForbiddenProps = {
  children?: React.ReactElement;
  /**
   * Name of the composition that is forbidden.
   */
  name: CompositionName;
  /**
   * Warning message to display if invalid.
   */
  message: string;
};

function CompositionWarningForbidden({
  children,
  name,
  message,
}: CompositionWarningForbiddenProps) {
  const compositionName = useCompositionWarning(false)?.name;

  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isDev || !compositionName || name !== compositionName) {
      return;
    }

    console.warn(`[Aksel] ${message}\nElement: `, elementRef.current);
  }, [compositionName, name, message]);

  return <Slot ref={elementRef}>{children}</Slot>;
}

export { CompositionWarningForbidden as Forbidden, CompositionWarning as Root };
