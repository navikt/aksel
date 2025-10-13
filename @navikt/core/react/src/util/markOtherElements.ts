/**
 * Modified version of `aria-hidden`-package.
 * - Removed "inert"-functionality.
 * - Made aria-hodden optional (default: false).
 * https://github.com/theKashey/aria-hidden/blob/720e8a8e1cfa047bd299a929d95d47ac860a5c1a/src/index.ts
 */
import { ownerDocument } from "./owner";

type Undo = () => void;

const counters = {
  "aria-hidden": new WeakMap<Element, number>(),
  none: new WeakMap<Element, number>(),
};

function getCounterMap(control: "aria-hidden" | null) {
  if (control === "aria-hidden") {
    return counters["aria-hidden"];
  }
  return counters.none;
}

let uncontrolledElementsSet = new WeakSet<Element>();
let markerMap: Record<string, WeakMap<Element, number>> = {};
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

function applyAttributeToOthers(
  uncorrectedAvoidElements: Element[],
  body: HTMLElement,
  ariaHidden: boolean,
): Undo {
  const markerName = "data-aksel-inert";
  const controlAttribute = ariaHidden ? "aria-hidden" : null;
  const avoidElements = correctElements(body, uncorrectedAvoidElements);
  const elementsToKeep = new Set<Node>();
  const elementsToStop = new Set<Node>(avoidElements);
  const hiddenElements: Element[] = [];

  if (!markerMap[markerName]) {
    markerMap[markerName] = new WeakMap();
  }

  const markerCounter = markerMap[markerName];

  avoidElements.forEach(keep);
  deep(body);
  elementsToKeep.clear();

  function keep(el: Node | undefined) {
    if (!el || elementsToKeep.has(el)) {
      return;
    }

    elementsToKeep.add(el);
    if (el.parentNode) {
      keep(el.parentNode);
    }
  }

  function deep(parent: Element | null) {
    if (!parent || elementsToStop.has(parent)) {
      return;
    }

    [].forEach.call(parent.children, (node: Element) => {
      if (elementsToKeep.has(node)) {
        deep(node);
      } else {
        const attr = controlAttribute
          ? node.getAttribute(controlAttribute)
          : null;
        const alreadyHidden = attr !== null && attr !== "false";
        const counterMap = getCounterMap(controlAttribute);
        const counterValue = (counterMap.get(node) || 0) + 1;
        const markerValue = (markerCounter.get(node) || 0) + 1;

        counterMap.set(node, counterValue);
        markerCounter.set(node, markerValue);
        hiddenElements.push(node);

        if (counterValue === 1 && alreadyHidden) {
          uncontrolledElementsSet.add(node);
        }

        if (markerValue === 1) {
          node.setAttribute(markerName, "");
        }

        if (!alreadyHidden && controlAttribute) {
          node.setAttribute(controlAttribute, "true");
        }
      }
    });
  }

  lockCount += 1;

  return () => {
    hiddenElements.forEach((element) => {
      const counterMap = getCounterMap(controlAttribute);
      const currentCounterValue = counterMap.get(element) || 0;
      const counterValue = currentCounterValue - 1;
      const markerValue = (markerCounter.get(element) || 0) - 1;

      counterMap.set(element, counterValue);
      markerCounter.set(element, markerValue);

      if (!counterValue) {
        if (!uncontrolledElementsSet.has(element) && controlAttribute) {
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
      counters["aria-hidden"] = new WeakMap();
      counters.none = new WeakMap();
      uncontrolledElementsSet = new WeakSet();
      markerMap = {};
    }
  };
}

function markOtherElements(avoidElements: Element[], ariaHidden = false): Undo {
  const body = ownerDocument(avoidElements[0]).body;

  return applyAttributeToOthers(
    avoidElements.concat(
      Array.from(body.querySelectorAll("[aria-live], script")),
    ),
    body,
    ariaHidden,
  );
}

export { markOtherElements };
