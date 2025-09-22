const INTERACTIVE_TAGS = new Set([
  "BUTTON",
  "A",
  "INPUT",
  "SELECT",
  "TEXTAREA",
  "DETAILS",
  "SUMMARY",
  "LABEL",
]);

const INTERACTIVE_ROLES = new Set([
  "button",
  "link",
  "checkbox",
  "radio",
  "switch",
  "menuitem",
  "option",
  "tab",
  "textbox",
  "combobox",
  "spinbutton",
  "slider",
]);

/**
 * Walks up from the event target until TR/TH (row / header) or root.
 * Returns true if any ancestor is inherently interactive, explicitly focusable,
 * or has an interactive ARIA role.
 * Used to decide whether a row click should be treated as a row selection
 * or ignored because the user interacted with an embedded control.
 */
function isElementInteractiveTarget(element: HTMLElement | null) {
  for (
    let node: HTMLElement | null = element;
    node && node.nodeName !== "TR" && node.nodeName !== "TH";
    node = node.parentElement
  ) {
    const tag = node.nodeName;

    /* Native interactive tag */
    if (INTERACTIVE_TAGS.has(tag)) {
      return true;
    }

    /* Explicit interactive role */
    const role = node.getAttribute("role");
    if (role && INTERACTIVE_ROLES.has(role)) {
      return true;
    }

    /* Focusable via tabindex (exclude -1) */
    if (node.hasAttribute("tabindex")) {
      const ti = node.getAttribute("tabindex");
      if (ti !== "-1") {
        return true;
      }
    }
  }

  return false;
}

export { isElementInteractiveTarget };
