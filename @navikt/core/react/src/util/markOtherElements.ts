/**
 * Modified version of `aria-hidden`-package.
 * - Removed "inert"-functionality.
 * - Made aria-hidden optional (default: false).
 * https://github.com/theKashey/aria-hidden/blob/720e8a8e1cfa047bd299a929d95d47ac860a5c1a/src/index.ts
 */
import { ownerDocument } from "./owner";

type UndoFn = () => void;

let ariaHiddenCounter = new WeakMap<Element, number>();
let markerCounter: WeakMap<Element, number> = new WeakMap();

let uncontrolledElementsSet = new WeakSet<Element>();
let lockCount = 0;

const unwrapHost = (node: Element | ShadowRoot): Element | null =>
  node && ((node as ShadowRoot).host || unwrapHost(node.parentNode as Element));

const correctElements = (parent: HTMLElement, targets: Element[]): Element[] =>
  targets
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
    .filter((x): x is Element => x != null);

const controlAttribute = "aria-hidden";
const markerName = "data-aksel-hidden";

function applyAttributeToOthers(
  uncorrectedAvoidElements: Element[],
  body: HTMLElement,
): UndoFn {
  const avoidElements = correctElements(body, uncorrectedAvoidElements);
  const elementsToUpdate = new Set<Node>();
  const elementsToAvoidUpdating = new Set<Node>(avoidElements);
  const hiddenElements: Element[] = [];

  avoidElements.forEach(addToAvoidList);
  applyAttributes(body);
  elementsToUpdate.clear();

  function addToAvoidList(el: Node | undefined) {
    if (!el || elementsToUpdate.has(el)) {
      return;
    }

    elementsToUpdate.add(el);
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

      if (elementsToUpdate.has(node)) {
        applyAttributes(node);
      } else {
        const attr = node.getAttribute(controlAttribute);
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

  return () => {
    hiddenElements.forEach((element) => {
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
    });

    lockCount -= 1;

    if (!lockCount) {
      ariaHiddenCounter = new WeakMap();
      uncontrolledElementsSet = new WeakSet();
      markerCounter = new WeakMap();
    }
  };
}

function markOtherElements(avoidElements: Element[]): UndoFn {
  const body = ownerDocument(avoidElements[0]).body;

  return applyAttributeToOthers(
    avoidElements.concat(
      Array.from(body.querySelectorAll("[aria-live], script")),
    ),
    body,
  );
}

export { markOtherElements };
