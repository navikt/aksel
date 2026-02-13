/**
 * Makes sure only focusable and non-disabled elements are targeted when navigating through the table using keyboard interactions.
 * Tries to find the most logical focus target inside a cell, by looking for commonly used interactive elements,
 * falling back to the cell itself if no focusable targets are found.
 *
 * If the assumed focus target is not the cell itself, we check if that element is hidden or disabled, and fall back to the cell if so,
 * since we want to avoid/can't focus hidden/disabled elements.
 */
function getFocusableTarget(cell: Element): HTMLElement | null {
  const el = cell as HTMLElement | null;
  if (!el || isHiddenElement(el)) {
    return null;
  }

  const focusables = el.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"]), [contenteditable="true"]',
  );

  if (focusables.length === 0) {
    return el;
  }

  for (let i = 0; i < focusables.length; i += 1) {
    const focusable = focusables[i] as HTMLElement;
    if (!isHiddenElement(focusable) && !isDisabledElement(focusable)) {
      return focusable;
    }
  }

  return el;
}

/**
 * TODO:
 * - validate this implementation against SR-only elements
 */
function isHiddenElement(el: HTMLElement): boolean {
  if (el.hidden) {
    return true;
  }

  const style = window.getComputedStyle(el);
  return style.display === "none" || style.visibility === "hidden";
}

function isDisabledElement(el: HTMLElement): boolean {
  if (el.getAttribute("aria-disabled") === "true") {
    return true;
  }

  if (el.closest("fieldset[disabled]")) {
    return true;
  }

  if (
    el instanceof HTMLButtonElement ||
    el instanceof HTMLInputElement ||
    el instanceof HTMLSelectElement ||
    el instanceof HTMLTextAreaElement
  ) {
    return el.disabled;
  }

  return false;
}

function focusCell(cell: Element): Element | null {
  const focusTarget = getFocusableTarget(cell);
  if (!focusTarget) {
    return null;
  }

  if (focusTarget === cell) {
    (cell as HTMLElement).tabIndex = 0;
  }

  focusTarget.focus({
    preventScroll: true,
  });

  focusTarget.scrollIntoView({
    behavior: "smooth",
    block: "nearest",
    inline: "nearest",
  });

  return cell;
}

function focusCellAndUpdateTabIndex(
  nextCell: Element,
  previousCell?: Element | null,
  { shouldFocus = true }: { shouldFocus?: boolean } = {},
): Element | null {
  if (previousCell && previousCell !== nextCell) {
    (previousCell as HTMLElement).tabIndex = -1;
  }

  if (!shouldFocus) {
    return nextCell;
  }

  return focusCell(nextCell);
}

export { focusCell, focusCellAndUpdateTabIndex, getFocusableTarget };
