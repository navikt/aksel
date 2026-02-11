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

export { getFocusableTarget };
