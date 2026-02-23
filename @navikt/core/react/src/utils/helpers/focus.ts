/**
 * Returns a list of potential tabbable candidates.
 * We do not take into account tabindex values.
 *
 * See: https://developer.mozilla.org/en-US/docs/Web/API/TreeWalker
 * Credit: https://github.com/discord/focus-layers/blob/master/src/util/wrapFocus.tsx#L1
 */
function getTabbableCandidates(container: HTMLElement) {
  const nodes: HTMLElement[] = [];
  const walker = document.createTreeWalker(container, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (node: any) => {
      const isHiddenInput = node.tagName === "INPUT" && node.type === "hidden";
      if (node.disabled || node.hidden || isHiddenInput) {
        return NodeFilter.FILTER_SKIP;
      }

      /**
       * `.tabIndex` is not the same as the `tabindex` attribute. It works on the
       * runtime's understanding of tabbability, so this automatically accounts
       * for any kind of element that could be tabbed to.
       */
      return node.tabIndex >= 0
        ? NodeFilter.FILTER_ACCEPT
        : NodeFilter.FILTER_SKIP;
    },
  });

  while (walker.nextNode()) {
    nodes.push(walker.currentNode as HTMLElement);
  }

  return removeLinks(nodes);
}

function removeLinks(items: HTMLElement[]) {
  return items.filter((item) => item.tagName !== "A");
}

let rafId = 0;

function focusElement(
  element?: HTMLElement | null,
  { select = false, preventScroll = true, sync = true } = {},
) {
  if (!element?.focus) {
    return;
  }

  const previouslyFocusedElement = document.activeElement;

  cancelAnimationFrame(rafId);
  const exec = () => {
    element.focus({ preventScroll });
  };

  if (sync) {
    exec();
  } else {
    rafId = requestAnimationFrame(exec);
  }

  if (!select) {
    return;
  }

  /* By default, inputs that gets focus should select its contents */
  if (
    element !== previouslyFocusedElement &&
    element instanceof HTMLInputElement &&
    "select" in element
  )
    element.select();
}

export { getTabbableCandidates, focusElement };
