import React from "react";

/**
 * Internal helper to issue a warning or error in development.
 */
function issueWarning(
  condition: boolean,
  message: string,
  severity: "warn" | "error" = "warn",
) {
  if (process.env.NODE_ENV !== "development" || !condition) return;
  const fn = severity === "error" ? console.error : console.warn;
  fn(`[DesignSystem] ${message}`);
}

/**
 * Custom hook to warn if a specific child type is present among the children.
 *
 * @param children - The children to inspect.
 * @param type - The React component type to look for.
 * @param message - The warning message to display.
 * @param severity - Console method to use ("warn" or "error").
 */
export function useWarnIfContainsComponent(
  children: React.ReactNode,
  type: React.ElementType,
  message: string,
  severity: "warn" | "error" = "warn",
) {
  React.useEffect(() => {
    const hasType = React.Children.toArray(children).some(
      (child) => React.isValidElement(child) && child.type === type,
    );
    issueWarning(hasType, message, severity);
  }, [children, type, message, severity]);
}
