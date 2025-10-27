/**
 * Returns the owner document of a given element.
 *
 * Use this when the node might live in a different browsing context than the code
 * invoking the utility (portals, iframes, custom documents).
 *
 * Examples:
 * - Focus guards for portaled menus: pass the menu root so guards are created in the portal document.
 * - Components rendered inside an iframe preview: scope listeners to the iframe-document.
 * - Element opened with `window.open`: scope listeners to the new window-document.
 *
 * Scenarios:
 * - Modal content rendered to parent `document.body` via a portal while running inside an iframe.
 * - Tooltips or popovers that live outside the component't immediate DOM tree.
 *
 * https://github.com/radix-ui/primitives/issues/1676
 * https://github.com/radix-ui/primitives/issues/1721
 * https://github.com/radix-ui/primitives/discussions/1715
 */
function ownerDocument(node: Element | null) {
  return node?.ownerDocument || globalThis?.document;
}

/**
 * Returns the owner window of a given element.
 *
 * Examples:
 * - Keyboard listeners for portaled overlays.
 * - Resize/scroll observers applied to iframe widgets.
 */
function ownerWindow(node: Document | Element | null | any): typeof window {
  return node?.ownerDocument?.defaultView || window;
}

export { ownerDocument, ownerWindow };
