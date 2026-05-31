type FocusDirection = "first" | "last" | "next" | "prev";

/**
 * Focuses an item in a list based on direction.
 * - first/last: focus first or last item
 * - next/prev: focus relative to `current`, with optional looping
 */
export function focusIn(
  items: HTMLElement[],
  direction: FocusDirection,
  current?: HTMLElement | null,
  loop = true,
): void {
  if (items.length === 0) {
    return;
  }

  if (direction === "first") {
    items[0].focus();
    return;
  }

  if (direction === "last") {
    items[items.length - 1].focus();
    return;
  }

  const currentIndex = current ? items.indexOf(current) : -1;

  if (direction === "next") {
    const nextIndex = loop
      ? (currentIndex + 1) % items.length
      : Math.min(currentIndex + 1, items.length - 1);
    items[nextIndex]?.focus();
  } else {
    const prevIndex = loop
      ? (currentIndex - 1 + items.length) % items.length
      : Math.max(currentIndex - 1, 0);
    items[prevIndex]?.focus();
  }
}
