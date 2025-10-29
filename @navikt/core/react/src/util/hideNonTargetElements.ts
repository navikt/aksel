/**
 * Modified version of `aria-hidden`-package.
 * - Removed "inert"-functionality.
 * - Removed flexibility for different data-attributes.
 * https://github.com/theKashey/aria-hidden/blob/720e8a8e1cfa047bd299a929d95d47ac860a5c1a/src/index.ts
 */
import { ownerDocument } from "./owner";

type UndoFn = () => void;

let ariaHiddenCounter = new WeakMap<Element, number>();
let markerCounter = new WeakMap<Element, number>();

let uncontrolledElementsSet = new WeakSet<Element>();
let lockCount = 0;

const controlAttribute = "aria-hidden";
const markerName = "data-aksel-hidden";

/**
 * Unwraps a Shadow DOM host to find the actual Element in the light DOM.
 */
function unwrapHost(node: Element | ShadowRoot): Element | null {
  return (
    node &&
    ((node as ShadowRoot).host || unwrapHost(node.parentNode as Element))
  );
}

/**
 * Corrects the target elements by unwrapping Shadow DOM hosts if necessary.
 *
 * @param parent - The parent HTMLElement to check containment against.
 * @param targets - An array of target Elements to correct.
 * @returns An array of corrected Elements that are contained within the parent.
 */
function correctElements(parent: HTMLElement, targets: Element[]): Element[] {
  return targets
    .map((target) => {
      if (parent.contains(target)) {
        return target;
      }

      const correctedTarget = unwrapHost(target);

      if (parent.contains(correctedTarget)) {
        return correctedTarget;
      }

      return null;
    })
    .filter((x): x is Element => x !== null);
}

/**
 * Applies the aria-hidden attribute to all elements in the body except the specified avoid elements.
 */
function applyAttributeToOthers(
  uncorrectedAvoidElements: Element[],
  body: HTMLElement,
): UndoFn {
  const avoidElements = correctElements(body, uncorrectedAvoidElements);
  const elementsToAvoidWithParents = new Set<Node>();
  const elementsToAvoidUpdating = new Set<Node>(avoidElements);
  const hiddenElements: Element[] = [];

  avoidElements.forEach(addToAvoidList);
  applyAttributes(body);
  elementsToAvoidWithParents.clear();

  function addToAvoidList(el: Node | undefined) {
    if (!el || elementsToAvoidWithParents.has(el)) {
      return;
    }

    elementsToAvoidWithParents.add(el);
    if (el.parentNode) {
      addToAvoidList(el.parentNode);
    }
  }

  function applyAttributes(parent: Element | null) {
    if (!parent || elementsToAvoidUpdating.has(parent)) {
      return;
    }

    const parentChildren = parent.children;

    for (let index = 0; index < parentChildren.length; index += 1) {
      const node = parentChildren[index] as Element;

      if (elementsToAvoidWithParents.has(node)) {
        applyAttributes(node);
      } else {
        const attr = node.getAttribute(controlAttribute);

        /*
         * We only check for falsy values here since since arbitrary values
         * (e.g. "true", "foo", "") are all valid for indicating that the element is already hidden.
         */
        const alreadyHidden = attr !== null && attr !== "false";
        const counterValue = (ariaHiddenCounter.get(node) || 0) + 1;
        const markerValue = (markerCounter.get(node) || 0) + 1;

        ariaHiddenCounter.set(node, counterValue);
        markerCounter.set(node, markerValue);
        hiddenElements.push(node);

        if (counterValue === 1 && alreadyHidden) {
          uncontrolledElementsSet.add(node);
        }

        if (markerValue === 1) {
          node.setAttribute(markerName, "");
        }

        if (!alreadyHidden) {
          node.setAttribute(controlAttribute, "true");
        }
      }
    }
  }

  lockCount += 1;

  /* Cleanup */
  return () => {
    for (const element of hiddenElements) {
      const currentCounterValue = ariaHiddenCounter.get(element) || 0;
      const counterValue = currentCounterValue - 1;
      const markerValue = (markerCounter.get(element) || 0) - 1;

      ariaHiddenCounter.set(element, counterValue);
      markerCounter.set(element, markerValue);

      if (!counterValue) {
        if (!uncontrolledElementsSet.has(element)) {
          element.removeAttribute(controlAttribute);
        }

        uncontrolledElementsSet.delete(element);
      }

      if (!markerValue) {
        element.removeAttribute(markerName);
      }
    }

    lockCount -= 1;

    /* Reset */
    if (!lockCount) {
      ariaHiddenCounter = new WeakMap();
      uncontrolledElementsSet = new WeakSet();
      markerCounter = new WeakMap();
    }
  };
}

/**
 * Hides all elements in the document body for assertive technologies except the specified elements with `aria-hidden`.
 * @param avoidElements - An array of elements to avoid hiding.
 * @returns A function that, when called, will undo the hiding of elements.
 */
function hideNonTargetElements(avoidElements: Element[]): UndoFn {
  const body = ownerDocument(avoidElements[0]).body;

  /**
   * Assume that elements with `aria-live` or `script` tags should not be hidden.
   * This ensures that live regions and scripts continue to function properly.
   */
  const ingoredElements = Array.from(
    body.querySelectorAll("[aria-live], script"),
  );

  return applyAttributeToOthers(avoidElements.concat(ingoredElements), body);
}

export { hideNonTargetElements };
