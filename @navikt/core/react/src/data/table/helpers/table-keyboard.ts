const keyToCoord = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
} as const;

type DirectionsT = keyof typeof keyToCoord;
type Delta = { x: number; y: number };
type NavigationAction =
  | { type: "delta"; delta: Delta }
  | { type: "home" }
  | { type: "end" }
  | { type: "tableStart" }
  | { type: "tableEnd" };

/**
 * Maps keyboard events to navigation actions.
 * Supports arrow keys, Home/End (row navigation), Ctrl/Cmd+Home/End (table navigation),
 * and PageUp/PageDown (multi-row navigation).
 */
function getNavigationAction(event: KeyboardEvent): NavigationAction | null {
  const key = event.key;

  /* Arrow keys -> directional navigation */
  if (key in keyToCoord) {
    return { type: "delta", delta: keyToCoord[key as DirectionsT] };
  }

  if (key === "Home") {
    return event.ctrlKey || event.metaKey
      ? { type: "tableStart" }
      : { type: "home" };
  }

  if (key === "End") {
    return event.ctrlKey || event.metaKey
      ? { type: "tableEnd" }
      : { type: "end" };
  }

  return null;
}

/**
 * Determines if keyboard navigation should be blocked based on the current focus context.
 * Allows for custom blocking logic via an optional callback.
 *
 * Tries to make assumptions of what the user is currently doing inside a table cell
 * Should block navigation if:
 * - Input has selection, caret is not at start/end
 * - Select arrow down/up for opening popup
 * - User is navigating inside multiline textarea
 * - contenteditable attrb is in use
 */
function shouldBlockNavigation(event: KeyboardEvent): boolean {
  const key = event.key;
  if (!(key in keyToCoord)) {
    return false;
  }

  const el = event.target as HTMLElement | null;
  if (!el) {
    return false;
  }

  if (el.isContentEditable) {
    return true;
  }

  /* If not any of these elements, assueme "safe" to navigate */
  const editable = el.closest(
    'input, textarea, select, [contenteditable="true"]',
  );

  if (!editable) {
    return false;
  }

  if (editable instanceof HTMLInputElement) {
    return shouldBlockInputArrow(editable, key);
  }

  if (editable instanceof HTMLTextAreaElement) {
    return shouldBlockTextAreaArrow(editable, key);
  }

  if (editable instanceof HTMLSelectElement) {
    if (key === "ArrowDown" || key === "ArrowUp") {
      return true;
    }
    return false;
  }

  return editable.hasAttribute("contenteditable");
}

function shouldBlockInputArrow(input: HTMLInputElement, key: string): boolean {
  if (input.type === "checkbox" || input.type === "radio") {
    return false;
  }

  if (!isTextInputType(input.type)) {
    return false;
  }

  const start = input.selectionStart;
  const end = input.selectionEnd;
  if (start === null || end === null) {
    return true;
  }

  return shouldBlockBySelection(key, start, end, input.value.length);
}

function shouldBlockTextAreaArrow(
  textarea: HTMLTextAreaElement,
  key: string,
): boolean {
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  return shouldBlockBySelection(key, start, end, textarea.value.length);
}

function shouldBlockBySelection(
  key: string,
  start: number,
  end: number,
  valueLength: number,
): boolean {
  if (key === "ArrowLeft" || key === "ArrowUp") {
    return start > 0 || end > 0;
  }
  if (key === "ArrowRight" || key === "ArrowDown") {
    return end < valueLength;
  }
  return false;
}

function isTextInputType(type: string): boolean {
  switch (type) {
    case "text":
    case "search":
    case "url":
    case "tel":
    case "password":
    case "email":
    case "number":
      return true;
    default:
      return false;
  }
}

export { getNavigationAction, shouldBlockNavigation };
export type { Delta, NavigationAction };
