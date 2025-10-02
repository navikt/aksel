/**
 * Returns the owner document of a given element.
 */
function ownerDocument(node: Element | null) {
  return node?.ownerDocument || globalThis?.document;
}

/**
 * Returns the owner window of a given element.
 */
function ownerWindow(node: Document | Element | null): typeof window {
  return node?.ownerDocument?.defaultView || window;
}

export { ownerDocument, ownerWindow };
