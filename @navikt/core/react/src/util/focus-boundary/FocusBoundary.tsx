import React, {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Slot } from "../../slot/Slot";
import { useMergeRefs } from "../../util/hooks";
import { useEventCallback } from "../hooks/useEventCallback";

const AUTOFOCUS_ON_MOUNT = "focusBoundary.autoFocusOnMount";
const AUTOFOCUS_ON_UNMOUNT = "focusBoundary.autoFocusOnUnmount";
const EVENT_OPTIONS = { bubbles: false, cancelable: true };

/* TODO: Regular story */
/**
 * TODO:
 * - owner(container) for corrent document
 */

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
   * Event handler called when auto-focusing on mount.
   * Can be prevented.
   */
  onMountAutoFocus?: (event: Event) => void;
  /**
   * Event handler called when auto-focusing on unmount.
   * Can be prevented.
   */
  onUnmountAutoFocus?: (event: Event) => void;
}

const FocusBoundary = forwardRef<HTMLDivElement, FocusBoundaryProps>(
  (
    {
      loop = false,
      trapped = false,
      onMountAutoFocus: onMountAutoFocusProp,
      onUnmountAutoFocus: onUnmountAutoFocusProp,
      ...restProps
    }: FocusBoundaryProps,
    forwardedRef,
  ) => {
    const onMountAutoFocus = useEventCallback(onMountAutoFocusProp);
    const onUnmountAutoFocus = useEventCallback(onUnmountAutoFocusProp);

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
         * `focusout` event with a `null` `relatedTarget` will happen in at least two cases:
         * 1. When the user switches app/tabs/windows/the browser itself loses focus.
         * 2. In Google Chrome, when the focused element is removed from the DOM.
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
         * If the focus has moved to an legitimate element outside the container, we move focus to the last valid focused element inside.
         * This makes sure to "trap" focus inside the container.
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

    /* Handles autofocus on mount and unmount */
    useEffect(() => {
      if (!container) {
        return;
      }

      focusBoundarysStack.add(focusBoundary);
      const currentActiveElement = document.activeElement as HTMLElement | null;
      const containsActiveElement =
        currentActiveElement && container.contains(currentActiveElement);

      /* We only autofocus on mount if container does not contain active element */
      if (!containsActiveElement) {
        const mountEvent = new CustomEvent(AUTOFOCUS_ON_MOUNT, EVENT_OPTIONS);
        container.addEventListener(AUTOFOCUS_ON_MOUNT, onMountAutoFocus);
        container.dispatchEvent(mountEvent);

        /* If consumer does not manually prevent event and handle focus themselves */
        if (!mountEvent.defaultPrevented) {
          /**
           * Attempts focusing the first element in a list of candidates.
           * Stops when focus has actually moved.
           */
          const candidates = removeLinks(getTabbableCandidates(container));
          const previouslyFocusedElement = document.activeElement;
          for (const candidate of candidates) {
            focus(candidate, { select: true });
            if (document.activeElement !== previouslyFocusedElement) {
              return;
            }
          }

          /* focusFirst might not find any candidates, so we fall back to focusing container */
          if (document.activeElement === currentActiveElement) {
            focus(container);
          }
        }
      }

      return () => {
        container.removeEventListener(AUTOFOCUS_ON_MOUNT, onMountAutoFocus);

        /**
         * https://github.com/facebook/react/issues/17894
         * We delay to next tick to avoid issues with React's event system
         * where calling `focus` inside a effect cleanup causes React to not call onFocus handlers.
         */
        setTimeout(() => {
          const unmountEvent = new CustomEvent(
            AUTOFOCUS_ON_UNMOUNT,
            EVENT_OPTIONS,
          );
          container.addEventListener(AUTOFOCUS_ON_UNMOUNT, onUnmountAutoFocus);
          container.dispatchEvent(unmountEvent);

          /* If consumer does not manually prevent event and handle focus themselves */
          if (!unmountEvent.defaultPrevented) {
            focus(currentActiveElement ?? document.body, {
              select: true,
            });
          }
          /* Since this is inside a cleanup, we need to instantly remove the listener ourselves */
          container.removeEventListener(
            AUTOFOCUS_ON_UNMOUNT,
            onUnmountAutoFocus,
          );

          focusBoundarysStack.remove(focusBoundary);
        }, 0);
      };
    }, [container, onMountAutoFocus, onUnmountAutoFocus, focusBoundary]);

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
            /* No need to do anything if active element is the expected focus-target */
            if (focusedElement === containerTarget) {
              event.preventDefault();
            }
            return;
          }

          /**
           * Since we are either trapped OR looping, we will either do nothing (trapped), or focus first element (looping).
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

function focus(element?: HTMLElement | null, { select = false } = {}) {
  if (!element?.focus) {
    return;
  }

  const previouslyFocusedElement = document.activeElement;
  /* Prevent scrolling on focus, to minimize jarring transitions */
  element.focus({ preventScroll: true });

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

export { FocusBoundary };
export type { FocusBoundaryProps };
