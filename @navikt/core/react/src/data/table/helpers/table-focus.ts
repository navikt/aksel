/**
 * WeakMap to store original tabIndex values for cells.
 * Used to restore tabIndex when navigation moves away from a cell.
 */
const originalTabIndexMap = new WeakMap<Element, number>();

/**
 * Stores the original tabIndex of a cell if not already stored, and returns it.
 */
function syncOriginalTabIndex(cell: Element): void {
  if (!originalTabIndexMap.has(cell)) {
    const current = (cell as HTMLElement).tabIndex;
    originalTabIndexMap.set(cell, current);
  }
}

/**
 * Restores the original tabIndex for a cell.
 */
function restoreTabIndex(cell: Element): void {
  const original = originalTabIndexMap.get(cell);
  if (original !== undefined) {
    (cell as HTMLElement).tabIndex = original;
  }
}

/**
 * Makes sure only focusable and non-disabled elements are targeted when navigating through the table using keyboard interactions.
 * Tries to find the most logical focus target inside a cell, by looking for commonly used interactive elements,
 * falling back to the cell itself if no focusable targets are found.
 *
 * If the assumed focus target is not the cell itself, we check if that element is hidden or disabled, and fall back to the cell if so,
 * since we want to avoid/can't focus hidden/disabled elements.
 */
function findFocusableElementInCell(cell: Element): HTMLElement | null {
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
 * Checks if an element is visually hidden (but not SR-only).
 */
function isHiddenElement(el: HTMLElement): boolean {
  if (el.hidden) {
    return true;
  }

  const style = window.getComputedStyle(el);
  return style.display === "none" || style.visibility === "hidden";
}

/**
 * Checks if an element is disabled (via aria-disabled, fieldset, or native disabled property).
 */
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

/**
 * Determines the focus target and updates tabIndex if the cell itself should be focused.
 * Returns null if no focusable target found.
 */
function prepareCellFocus(cell: Element): HTMLElement | null {
  const focusTarget = findFocusableElementInCell(cell);
  if (!focusTarget) {
    return null;
  }

  if (focusTarget === cell) {
    (cell as HTMLElement).tabIndex = 0;
  }

  return focusTarget;
}

/**
 * Applies focus and scroll to an element.
 */
function applyFocusAndScroll(element: HTMLElement): void {
  element.focus({
    preventScroll: true,
  });

  element.scrollIntoView({
    behavior: "smooth",
    block: "nearest",
    inline: "nearest",
  });
}

/**
 * Focuses a cell by finding its focusable target and applying focus with scroll.
 */
function focusCell(cell: Element): Element | null {
  const focusTarget = prepareCellFocus(cell);
  if (!focusTarget) {
    return null;
  }

  applyFocusAndScroll(focusTarget);
  return cell;
}

function focusCellAndUpdateTabIndex(
  nextCell: Element,
  previousCell?: Element | null,
  { shouldFocus = true }: { shouldFocus?: boolean } = {},
): Element | null {
  if (previousCell && previousCell !== nextCell) {
    syncOriginalTabIndex(previousCell);
    restoreTabIndex(previousCell);
  }

  if (!shouldFocus) {
    return nextCell;
  }

  return focusCell(nextCell);
}

export {
  applyFocusAndScroll,
  focusCell,
  focusCellAndUpdateTabIndex,
  findFocusableElementInCell,
  isDisabledElement,
  isHiddenElement,
  prepareCellFocus,
  restoreTabIndex,
};
