import React, {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Slot } from "../../slot/Slot";
import { useClientLayoutEffect, useMergeRefs } from "../../util/hooks";
import { hideNonTargetElements } from "../hideNonTargetElements";
import { useLatestRef } from "../hooks/useLatestRef";
import { ownerDocument } from "../owner";

/* -------------------------------------------------------------------------- */
/*                                 FocusBoundary                                 */
/* -------------------------------------------------------------------------- */
interface FocusBoundaryProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * FocusBoundary expects a single child element since its a slotted component.
   */
  children: React.ReactElement;
  /**
   * When `true`, tabbing from last item will focus first tabbable
   * and shift+tab from first item will focus last tabbable element.
   * This does not "trap" focus inside the boundary, it only loops it when
   * tabbing. If focus is moved outside the boundary programmatically or by
   * pointer, it will not be moved back.
   *
   * - Links (`<a>` elements), are not considered tabbable for the purpose of looping.
   * - Hidden inputs (i.e. `<input type="hidden">`) are not considered tabbable.
   * - Elements that are `display: none` or `visibility: hidden` are not considered tabbable.
   * - Elements with `tabIndex < 0` are not considered tabbable.
   * @defaultValue false
   */
  loop?: boolean;
  /**
   * When `true`, focus cannot escape the focus boundary via keyboard,
   * pointer, or a programmatic focus.
   * @defaultValue false
   */
  trapped?: boolean;
  /**
   * Will try to focus the given element on mount.
   *
   * If not provided, FocusBoundary will try to focus the first
   * tabbable element inside the boundary.
   *
   * Set to `false` to not focus anything.
   */
  initialFocus?:
    | boolean
    | React.MutableRefObject<HTMLElement | null>
    | (() => boolean | HTMLElement | null | undefined);
  /**
   * Will try to focus the given element on unmount.
   *
   * If not provided, FocusBoundary will try to focus the element
   * that was focused before the FocusBoundary mounted.
   *
   * Set to `false` to not focus anything.
   */
  returnFocus?: boolean | React.MutableRefObject<HTMLElement | null>;
  /**
   * Hides all outside content from screen readers when true.
   * @default false
   */
  modal?: boolean;
}

const FocusBoundary = forwardRef<HTMLDivElement, FocusBoundaryProps>(
  (
    {
      loop = false,
      trapped = false,
      initialFocus = true,
      returnFocus = true,
      modal = false,
      ...restProps
    }: FocusBoundaryProps,
    forwardedRef,
  ) => {
    const initialFocusRef = useLatestRef(initialFocus);
    const returnFocusRef = useLatestRef(returnFocus);

    const lastFocusedElementRef = useRef<HTMLElement | null>(null);
    const [container, setContainer] = useState<HTMLElement | null>(null);
    const mergedRefs = useMergeRefs(forwardedRef, setContainer);

    const focusBoundary = useRef<FocusBoundaryAPI>({
      paused: false,
      pause() {
        this.paused = true;
      },
      resume() {
        this.paused = false;
      },
    }).current;

    /* Handles trapped state */
    useEffect(() => {
      if (!trapped || !container) {
        return;
      }

      function handleFocusIn(event: FocusEvent) {
        if (focusBoundary.paused || container === null) {
          return;
        }

        const target = event.target as HTMLElement | null;
        if (container.contains(target)) {
          lastFocusedElementRef.current = target;
        } else {
          focus(lastFocusedElementRef.current, { select: true });
        }
      }

      function handleFocusOut(event: FocusEvent) {
        if (focusBoundary.paused || container === null) {
          return;
        }

        const relatedTarget = event.relatedTarget as HTMLElement | null;

        /*
         * `focusout` event with a `null` `relatedTarget` will happen in a few known cases:
         * 1. When the user switches app/tabs/windows/the browser itself loses focus.
         * 2. In Google Chrome, when the focused element is removed from the DOM.
         * 3. When clicking on an element that cannot receive focus.
         *
         * We let the browser do its thing here because:
         * 1. The browser already keeps a memory of what's focused for when the page gets refocused.
         * 2. In Google Chrome, if we try to focus the deleted focused element (as per below), it
         * throws the CPU to 100%, so we avoid doing anything for this reason here too.
         */
        if (relatedTarget === null) {
          return;
        }

        /*
         * If the focus has moved to an element outside the container, we move focus to the last valid focused element inside.
         * This makes sure to "trap" focus inside the container.
         * We handle focus on focusout instead of focusin to avoid elements recieving focusin events
         * when they are not supposed to (like when clicking on elements outside the container
         */
        if (!container.contains(relatedTarget)) {
          focus(lastFocusedElementRef.current, { select: true });
        }
      }

      /**
       * When the currently focused element is removed from the DOM, browsers move focus
       * to the document.body. In this case, we move focus to the container
       * to keep focus trapped correctly instead.
       */
      const handleMutations = (mutations: MutationRecord[]) => {
        if (document.activeElement !== document.body) {
          return;
        }

        if (mutations.some((mutation) => mutation.removedNodes.length > 0)) {
          focus(container);
        }
      };

      document.addEventListener("focusin", handleFocusIn);
      document.addEventListener("focusout", handleFocusOut);
      const observer = new MutationObserver(handleMutations);
      observer.observe(container, { childList: true, subtree: true });

      return () => {
        document.removeEventListener("focusin", handleFocusIn);
        document.removeEventListener("focusout", handleFocusOut);
        observer.disconnect();
      };
    }, [trapped, container, focusBoundary.paused]);

    /* Adds element to focus-stack */
    useEffect(() => {
      if (!container) {
        return;
      }

      focusBoundarysStack.add(focusBoundary);

      return () => {
        setTimeout(() => {
          focusBoundarysStack.remove(focusBoundary);
        }, 0);
      };
    }, [container, focusBoundary]);

    useEffect(() => {
      if (!container || !modal) {
        return;
      }

      return hideNonTargetElements([container]);
    }, [container, modal]);

    /* Handles mount focus */
    useClientLayoutEffect(() => {
      if (!container || initialFocusRef.current === false) {
        return;
      }

      const ownerDoc = ownerDocument(container);
      const previouslyFocusedElement = ownerDoc.activeElement;

      queueMicrotask(() => {
        const focusableElements = removeLinks(getTabbableCandidates(container));
        const initialFocusValueOrFn = initialFocusRef.current;
        const resolvedInitialFocus =
          typeof initialFocusValueOrFn === "function"
            ? initialFocusValueOrFn()
            : initialFocusValueOrFn;

        if (
          resolvedInitialFocus === undefined ||
          resolvedInitialFocus === false
        ) {
          return;
        }

        let elToFocus: HTMLElement | null | undefined;
        const fallbackelements = focusableElements[0] || container;

        /* `null` should fallback to default behavior in case of an empty ref. */
        if (resolvedInitialFocus === true || resolvedInitialFocus === null) {
          elToFocus = fallbackelements;
        } else {
          elToFocus = resolveRef(resolvedInitialFocus) || fallbackelements;
        }

        const focusAlreadyInsideFloatingEl = container.contains(
          previouslyFocusedElement,
        );

        if (focusAlreadyInsideFloatingEl) {
          return;
        }

        focus(elToFocus, {
          preventScroll: elToFocus === container,
          sync: false,
        });
      });
    }, [container, initialFocusRef]);

    /* Handles unmount focus */
    useClientLayoutEffect(() => {
      if (!container) {
        return;
      }
      const ownerDoc = ownerDocument(container);
      const previouslyFocusedElement = ownerDoc.activeElement;

      function getReturnElement() {
        let resolvedReturnFocusValue = returnFocusRef.current;

        if (
          resolvedReturnFocusValue === undefined ||
          resolvedReturnFocusValue === false
        ) {
          return null;
        }

        /* `null` should fallback to default behavior in case of an empty ref. */
        if (resolvedReturnFocusValue === null) {
          resolvedReturnFocusValue = true;
        }

        if (typeof resolvedReturnFocusValue === "boolean") {
          const el = previouslyFocusedElement;
          return el?.isConnected ? el : ownerDoc.body;
        }

        const fallback = previouslyFocusedElement || ownerDoc.body;

        return resolveRef(resolvedReturnFocusValue) || fallback;
      }

      return () => {
        const returnElement = getReturnElement() as HTMLElement | null;
        const activeEl = ownerDoc.activeElement;

        queueMicrotask(() => {
          if (
            // eslint-disable-next-line react-hooks/exhaustive-deps
            returnFocusRef.current &&
            returnElement &&
            returnElement !== activeEl
          ) {
            returnElement.focus({ preventScroll: true });
          }
        });
      };
    }, [container, returnFocusRef]);

    /* Takes care of looping focus */
    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent) => {
        if ((!loop && !trapped) || focusBoundary.paused) {
          return;
        }

        const isTabKey =
          event.key === "Tab" &&
          !event.altKey &&
          !event.ctrlKey &&
          !event.metaKey;

        const focusedElement = document.activeElement;

        if (isTabKey && focusedElement) {
          const containerTarget = event.currentTarget as HTMLElement;
          const [first, last] = getTabbableEdges(containerTarget);

          /* We can only wrap focus if we have tabbable edges */
          if (!(first && last)) {
            /*
             * No need to do anything if active element is the expected focus-target
             * Case: No tabbable elements, focus should stay on container. If we don't preventDefault, the container will lose focus
             * and potentially lose controll of focus to browser (like focusing address bar).
             */
            if (focusedElement === containerTarget) {
              event.preventDefault();
            }
            return;
          }

          /**
           * Since we are either trapped + looping, or one of them we will do nothing when trapped and focus first element when looping.
           */
          if (!event.shiftKey && focusedElement === last) {
            event.preventDefault();
            if (loop) {
              focus(first, { select: true });
            }
          } else if (event.shiftKey && focusedElement === first) {
            event.preventDefault();
            if (loop) {
              focus(last, { select: true });
            }
          }
        }
      },
      [loop, trapped, focusBoundary.paused],
    );

    return (
      <Slot
        tabIndex={-1}
        {...restProps}
        ref={mergedRefs}
        onKeyDown={handleKeyDown}
      />
    );
  },
);

/* ---------------------------- FocusBoundary utils ---------------------------- */
/**
 * Returns the first and last tabbable elements inside a container as a tuple.
 */
function getTabbableEdges(container: HTMLElement) {
  const candidates = getTabbableCandidates(container);
  return [
    findFirstVisible(candidates, container),
    findFirstVisible(candidates.reverse(), container),
  ] as const;
}

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

  return nodes;
}

/**
 * Returns the first visible element in a list.
 * NOTE: Only checks visibility up to the `container`.
 */
function findFirstVisible(elements: HTMLElement[], container: HTMLElement) {
  for (const element of elements) {
    if (!isHidden(element, { upTo: container })) {
      return element;
    }
  }
}

function isHidden(node: HTMLElement, { upTo }: { upTo?: HTMLElement }) {
  if (getComputedStyle(node).visibility === "hidden") {
    return true;
  }

  while (node) {
    /* we stop at `upTo` */
    if (upTo !== undefined && node === upTo) {
      return false;
    }
    if (getComputedStyle(node).display === "none") {
      return true;
    }
    node = node.parentElement as HTMLElement;
  }
  return false;
}

let rafId = 0;
function focus(
  element?: HTMLElement | null,
  { select = false, preventScroll = true, sync = true } = {},
) {
  if (!element?.focus) {
    return;
  }

  const previouslyFocusedElement = document.activeElement;

  cancelAnimationFrame(rafId);
  const exec = () => element.focus({ preventScroll });

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

/* ---------------------------- FocusBoundary stack ---------------------------- */
type FocusBoundaryAPI = { paused: boolean; pause(): void; resume(): void };
const focusBoundarysStack = createFocusBoundarysStack();

function createFocusBoundarysStack() {
  /* A stack of focus-boundaries, with the active one at the top */
  let stack: FocusBoundaryAPI[] = [];

  return {
    add(focusBoundary: FocusBoundaryAPI) {
      /* Pause the currently active focus-boundary (at the top of the stack) */
      const activeFocusBoundary = stack[0];
      if (focusBoundary !== activeFocusBoundary) {
        activeFocusBoundary?.pause();
      }
      /* remove in case it already exists (because we'll re-add it at the top of the stack) */
      stack = arrayRemove(stack, focusBoundary);
      stack.unshift(focusBoundary);
    },

    remove(focusBoundary: FocusBoundaryAPI) {
      stack = arrayRemove(stack, focusBoundary);
      stack[0]?.resume();
    },
  };
}

function arrayRemove<T>(array: T[], item: T) {
  const updatedArray = [...array];
  const index = updatedArray.indexOf(item);
  if (index !== -1) {
    updatedArray.splice(index, 1);
  }
  return updatedArray;
}

function removeLinks(items: HTMLElement[]) {
  return items.filter((item) => item.tagName !== "A");
}

/**
 * If the provided argument is a ref object, returns its `current` value.
 * Otherwise, returns the argument itself.
 *
 * Non-generic to safely handle refs whose `.current` may be `null`.
 */
function resolveRef(
  maybeRef: HTMLElement | React.RefObject<HTMLElement | null | undefined>,
): HTMLElement | null | undefined {
  return "current" in maybeRef ? maybeRef.current : maybeRef;
}

export { FocusBoundary };
export type { FocusBoundaryProps };
