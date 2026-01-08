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
import { createStrictContext } from "../create-strict-context";

type CompositionName = string;

const isDev = process.env.NODE_ENV !== "production";

type CompositionWarningContextType = {
  /**
   * Name of the slot component we want to check.
   */
  name: CompositionName;
};

const { Provider: CompositionWarning, useContext: useCompositionWarning } =
  createStrictContext<CompositionWarningContextType>({
    name: "CompositionWarningContext",
    errorMessage:
      "useCompositionWarning() must be used within <CompositionWarning />",
  });

type CompositionWarningForbiddenProps = {
  children?: React.ReactElement;
  /**
   * Name of the parent slot component where the child is not allowed.
   */
  name: CompositionName;
  /**
   * Warning message to display if the child is found.
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
