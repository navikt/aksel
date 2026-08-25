import React from "react";

/**
 * Shared CSS custom properties for `ActionMenu.Content` and `ActionMenu.SubContent`.
 * Maps the floating-menu positioning variables to the action-menu content namespace.
 */
const actionMenuContentCssVars: React.CSSProperties = {
  "--__axc-action-menu-content-transform-origin":
    "var(--__axc-floating-transform-origin)",
  "--__axc-action-menu-content-available-height":
    "var(--__axc-floating-available-height)",
};

export { actionMenuContentCssVars };
