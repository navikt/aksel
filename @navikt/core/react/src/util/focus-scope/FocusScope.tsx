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

const AUTOFOCUS_ON_MOUNT = "focusScope.autoFocusOnMount";
const AUTOFOCUS_ON_UNMOUNT = "focusScope.autoFocusOnUnmount";
const EVENT_OPTIONS = { bubbles: false, cancelable: true };

type FocusableTarget = HTMLElement | { focus(): void };

/* -------------------------------------------------------------------------- */
/*                                 FocusScope                                 */
/* -------------------------------------------------------------------------- */
interface FocusScopeProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * When `true`, tabbing from last item will focus first tabbable
   * and shift+tab from first item will focus last tababble element.
   *
   * - Links, i.e. `<a>` elements, are not considered tabbable for the purpose of looping.
   * - Hidden inputs (i.e. `<input type="hidden">`) are not considered tabbable.
   * - Elements that are `display: none` or `visibility: hidden` are not considered tabbable.
   * - Elements with `tabIndex < 0` are not considered tabbable.
   * @defaultValue false
   */
  loop?: boolean;
  /**
   * When `true`, focus cannot escape the focus scope via keyboard,
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

const FocusScope = forwardRef<HTMLDivElement, FocusScopeProps>(
  (
    {
      loop = false,
      trapped = false,
      onMountAutoFocus: onMountAutoFocusProp,
      onUnmountAutoFocus: onUnmountAutoFocusProp,
      ...scopeProps
    }: FocusScopeProps,
    forwardedRef,
  ) => {
    const onMountAutoFocus = useEventCallback(onMountAutoFocusProp);
    const onUnmountAutoFocus = useEventCallback(onUnmountAutoFocusProp);

    const lastFocusedElementRef = useRef<HTMLElement | null>(null);
    const mergedRefs = useMergeRefs(forwardedRef, (node) => setContainer(node));
    const [container, setContainer] = useState<HTMLElement | null>(null);

    const focusScope = useRef({
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
        if (focusScope.paused || container === null) {
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
        if (focusScope.paused || container === null) {
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
        if (document.activeElement !== document.body) return;
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
    }, [trapped, container, focusScope.paused]);

    /* Handles autofocus on mount and unmount */
    useEffect(() => {
      if (!container) {
        return;
      }

      focusScopesStack.add(focusScope);
      const currentActiveElement = document.activeElement as HTMLElement | null;
      const containsActiveElement =
        currentActiveElement && container.contains(currentActiveElement);

      /* We only autofocus on mount if container does not contain active element */
      if (!containsActiveElement) {
        const mountEvent = new CustomEvent(AUTOFOCUS_ON_MOUNT, EVENT_OPTIONS);
        container.addEventListener(AUTOFOCUS_ON_MOUNT, onMountAutoFocus);
        container.dispatchEvent(mountEvent);

        /* If user does not manually prevent event and handle focus themselves */
        if (!mountEvent.defaultPrevented) {
          focusFirst(removeLinks(getTabbableCandidates(container)), {
            select: true,
          });

          /* focusFirst might not find any cadidates, so we fall back to focusing container */
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

          /* If user does not manually prevent event and handle focus themselves */
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

          focusScopesStack.remove(focusScope);
        }, 0);
      };
    }, [container, onMountAutoFocus, onUnmountAutoFocus, focusScope]);

    /* Takes care of looping focus */
    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent) => {
        if ((!loop && !trapped) || focusScope.paused) {
          return;
        }

        const isTabKey =
          event.key === "Tab" &&
          !event.altKey &&
          !event.ctrlKey &&
          !event.metaKey;

        const focusedElement = document.activeElement as HTMLElement | null;

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
      [loop, trapped, focusScope.paused],
    );

    return (
      <Slot
        tabIndex={-1}
        {...scopeProps}
        ref={mergedRefs}
        onKeyDown={handleKeyDown}
      />
    );
  },
);

/* ---------------------------- FocusScope utils ---------------------------- */

/**
 * Attempts focusing the first element in a list of candidates.
 * Stops when focus has actually moved.
 */
function focusFirst(candidates: HTMLElement[], { select = false } = {}) {
  const previouslyFocusedElement = document.activeElement;
  for (const candidate of candidates) {
    focus(candidate, { select });
    if (document.activeElement !== previouslyFocusedElement) return;
  }
}

/**
 * Returns the first and last tabbable elements inside a container.
 */
function getTabbableEdges(container: HTMLElement) {
  const candidates = getTabbableCandidates(container);
  const first = findVisible(candidates, container);
  const last = findVisible(candidates.reverse(), container);
  return [first, last] as const;
}

/**
 * Returns a list of potential tabbable candidates.
 *
 * NOTE: This is only a close approximation. For example it doesn't take into account cases like when
 * elements are not visible. This cannot be worked out easily by just reading a property, but rather
 * necessitate runtime knowledge (computed styles, etc). We deal with these cases separately.
 *
 * See: https://developer.mozilla.org/en-US/docs/Web/API/TreeWalker
 * Credit: https://github.com/discord/focus-layers/blob/master/src/util/wrapFocus.tsx#L1
 */
function getTabbableCandidates(container: HTMLElement) {
  const nodes: HTMLElement[] = [];
  const walker = document.createTreeWalker(container, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (node: any) => {
      const isHiddenInput = node.tagName === "INPUT" && node.type === "hidden";
      if (node.disabled || node.hidden || isHiddenInput)
        return NodeFilter.FILTER_SKIP;
      // `.tabIndex` is not the same as the `tabindex` attribute. It works on the
      // runtime's understanding of tabbability, so this automatically accounts
      // for any kind of element that could be tabbed to.
      return node.tabIndex >= 0
        ? NodeFilter.FILTER_ACCEPT
        : NodeFilter.FILTER_SKIP;
    },
  });
  while (walker.nextNode()) nodes.push(walker.currentNode as HTMLElement);
  // we do not take into account the order of nodes with positive `tabIndex` as it
  // hinders accessibility to have tab order different from visual order.
  return nodes;
}

/**
 * Returns the first visible element in a list.
 * NOTE: Only checks visibility up to the `container`.
 */
function findVisible(elements: HTMLElement[], container: HTMLElement) {
  for (const element of elements) {
    // we stop checking if it's hidden at the `container` level (excluding)
    if (!isHidden(element, { upTo: container })) return element;
  }
}

function isHidden(node: HTMLElement, { upTo }: { upTo?: HTMLElement }) {
  if (getComputedStyle(node).visibility === "hidden") return true;
  while (node) {
    // we stop at `upTo` (excluding it)
    if (upTo !== undefined && node === upTo) return false;
    if (getComputedStyle(node).display === "none") return true;
    node = node.parentElement as HTMLElement;
  }
  return false;
}

function isSelectableInput(
  element: any,
): element is FocusableTarget & { select: () => void } {
  return element instanceof HTMLInputElement && "select" in element;
}

function focus(element?: FocusableTarget | null, { select = false } = {}) {
  // only focus if that element is focusable
  if (element?.focus) {
    const previouslyFocusedElement = document.activeElement;
    // NOTE: we prevent scrolling on focus, to minimize jarring transitions for users
    element.focus({ preventScroll: true });
    // only select if its not the same element, it supports selection and we need to select
    if (
      element !== previouslyFocusedElement &&
      isSelectableInput(element) &&
      select
    )
      element.select();
  }
}

/* -------------------------------------------------------------------------------------------------
 * FocusScope stack
 * -----------------------------------------------------------------------------------------------*/

type FocusScopeAPI = { paused: boolean; pause(): void; resume(): void };
const focusScopesStack = createFocusScopesStack();

function createFocusScopesStack() {
  /** A stack of focus scopes, with the active one at the top */
  let stack: FocusScopeAPI[] = [];

  return {
    add(focusScope: FocusScopeAPI) {
      // pause the currently active focus scope (at the top of the stack)
      const activeFocusScope = stack[0];
      if (focusScope !== activeFocusScope) {
        activeFocusScope?.pause();
      }
      // remove in case it already exists (because we'll re-add it at the top of the stack)
      stack = arrayRemove(stack, focusScope);
      stack.unshift(focusScope);
    },

    remove(focusScope: FocusScopeAPI) {
      stack = arrayRemove(stack, focusScope);
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

const Root = FocusScope;

export { FocusScope, Root };
export type { FocusScopeProps };
