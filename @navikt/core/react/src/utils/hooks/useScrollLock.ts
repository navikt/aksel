import { useClientLayoutEffect } from "../../utils-external";
import { isIOS, isWebKit, ownerDocument, ownerWindow } from "../helpers";
import { Timeout } from "./useTimeout";

let originalHtmlStyles: Partial<CSSStyleDeclaration> = {};
let originalBodyStyles: Partial<CSSStyleDeclaration> = {};
let originalHtmlScrollBehavior = "";

function hasInsetScrollbars(referenceElement: Element | null) {
  if (typeof document === "undefined") {
    return false;
  }
  const doc = ownerDocument(referenceElement);
  const win = ownerWindow(doc);
  return win.innerWidth - doc.documentElement.clientWidth > 0;
}

function preventScrollBasic(referenceElement: Element | null) {
  const doc = ownerDocument(referenceElement);
  const html = doc.documentElement;
  const body = doc.body;

  /**
   * If an `overflow` style is present on <html>, we need to lock it, because a lock on <body>
   * won't have any effect.
   * But if <body> has an `overflow` style (like `overflow-x: hidden`), we need to lock it
   * instead, as sticky elements shift otherwise.
   */
  const elementToLock = isOverflowElement(html) ? html : body;
  const originalOverflow = elementToLock.style.overflow;
  elementToLock.style.overflow = "hidden";

  return () => {
    elementToLock.style.overflow = originalOverflow;
  };
}

function preventScrollStandard(referenceElement: Element | null) {
  const doc = ownerDocument(referenceElement);
  const html = doc.documentElement;
  const body = doc.body;
  const win = ownerWindow(html);

  let scrollTop = 0;
  let scrollLeft = 0;
  let resizeRaf = 0;

  /* Pinch-zoom in Safari causes a shift. Just don't lock scroll if there's any pinch-zoom. */
  if (isWebKit && (win.visualViewport?.scale ?? 1) !== 1) {
    return () => {};
  }

  /**
   * Locks the scroll by applying styles to Html and Body element.
   * Reads the DOM first, then writes to avoid layout thrashing.
   */
  function lockScroll() {
    /* DOM reads: */

    const htmlStyles = win.getComputedStyle(html);
    const bodyStyles = win.getComputedStyle(body);

    scrollTop = html.scrollTop;
    scrollLeft = html.scrollLeft;

    originalHtmlStyles = {
      scrollbarGutter: html.style.scrollbarGutter,
      overflowY: html.style.overflowY,
      overflowX: html.style.overflowX,
    };
    originalHtmlScrollBehavior = html.style.scrollBehavior;

    originalBodyStyles = {
      position: body.style.position,
      height: body.style.height,
      width: body.style.width,
      boxSizing: body.style.boxSizing,
      overflowY: body.style.overflowY,
      overflowX: body.style.overflowX,
      scrollBehavior: body.style.scrollBehavior,
    };

    const isScrollableY = html.scrollHeight > html.clientHeight;
    const isScrollableX = html.scrollWidth > html.clientWidth;
    const hasConstantOverflowY =
      htmlStyles.overflowY === "scroll" || bodyStyles.overflowY === "scroll";
    const hasConstantOverflowX =
      htmlStyles.overflowX === "scroll" || bodyStyles.overflowX === "scroll";

    /* Values can be negative in Firefox */
    const scrollbarWidth = Math.max(0, win.innerWidth - html.clientWidth);
    const scrollbarHeight = Math.max(0, win.innerHeight - html.clientHeight);

    /*
     * Avoid shift due to <body> margin. NB: This does cause elements to be clipped
     * with whitespace.
     */
    const marginY =
      parseFloat(bodyStyles.marginTop) + parseFloat(bodyStyles.marginBottom);
    const marginX =
      parseFloat(bodyStyles.marginLeft) + parseFloat(bodyStyles.marginRight);

    /**
     * Check support for stable scrollbar gutter to avoid layout shift when scrollbars appear/disappear.
     */
    const supportsStableScrollbarGutter =
      typeof CSS !== "undefined" &&
      CSS.supports?.("scrollbar-gutter", "stable");
    /*
     * DOM writes:
     * Do not read the DOM past this point!
     */

    Object.assign(html.style, {
      scrollbarGutter: "stable",
      overflowY:
        !supportsStableScrollbarGutter &&
        (isScrollableY || hasConstantOverflowY)
          ? "scroll"
          : "hidden",
      overflowX:
        !supportsStableScrollbarGutter &&
        (isScrollableX || hasConstantOverflowX)
          ? "scroll"
          : "hidden",
    });

    Object.assign(body.style, {
      /*
       * Keeps existing positioned children in place (e.g. fixed headers).
       */
      position: "relative",
      /**
       *  Limits height to the viewport minus margins/scrollbar compensation to stop vertical overflow from reappearing.
       */
      height:
        marginY || scrollbarHeight
          ? `calc(100dvh - ${marginY + scrollbarHeight}px)`
          : "100dvh",
      /**
       * Mirrors height-logic for width.
       */
      width:
        marginX || scrollbarWidth
          ? `calc(100vw - ${marginX + scrollbarWidth}px)`
          : "100vw",
      /**
       * Ensures the adjusted dimensions include padding/border, matching the measured values.
       */
      boxSizing: "border-box",
      /**
       * Blocks scrollable overflow.
       */
      overflow: "hidden",
      /**
       * Removes smooth-scrolling so immediate position restores occur without animation.
       */
      scrollBehavior: "unset",
    });

    body.scrollTop = scrollTop;
    body.scrollLeft = scrollLeft;
    html.setAttribute("data-aksel-scroll-locked", "");
    html.style.scrollBehavior = "unset";
  }

  /**
   * Restores the original scroll position and styles to Html and Body element.
   */
  function cleanup() {
    Object.assign(html.style, originalHtmlStyles);
    Object.assign(body.style, originalBodyStyles);
    html.scrollTop = scrollTop;
    html.scrollLeft = scrollLeft;
    html.removeAttribute("data-aksel-scroll-locked");
    html.style.scrollBehavior = originalHtmlScrollBehavior;
  }

  /**
   * On resize, restore original styles, then re-apply scroll lock next frame.
   */
  function handleResize() {
    cleanup();
    if (resizeRaf) {
      cancelAnimationFrame(resizeRaf);
    }

    /**
     * Wait until next frame to re-apply scroll lock ensuring layout has settled after resize.
     */
    resizeRaf = requestAnimationFrame(lockScroll);
  }

  lockScroll();
  win.addEventListener("resize", handleResize);

  return () => {
    if (resizeRaf) {
      cancelAnimationFrame(resizeRaf);
    }
    cleanup();
    win.removeEventListener("resize", handleResize);
  };
}

class ScrollLocker {
  lockCount = 0;
  restore: (() => void) | null = null;
  timeoutLock = Timeout.create();
  timeoutUnlock = Timeout.create();

  /**
   * Aquires a new lock
   * - If first lock, lock document-scroll.
   * - If not first lock, do nothing.
   */
  acquire(referenceElement: Element | null) {
    this.lockCount += 1;
    if (this.lockCount === 1 && this.restore === null) {
      /*
       * Delay locking to avoid layout thrashing when multiple locks/unlocks are requested in quick succession.
       */
      this.timeoutLock.start(0, () => this.lock(referenceElement));
    }
    return this.release;
  }

  /**
   * Releases a lock
   * - If last lock, unlock document-scroll.
   * - If not last lock, do nothing.
   */
  release = () => {
    this.lockCount -= 1;
    if (this.lockCount === 0 && this.restore) {
      this.timeoutUnlock.start(0, this.unlock);
    }
  };

  private unlock = () => {
    if (this.lockCount === 0 && this.restore) {
      this.restore?.();
      this.restore = null;
    }
  };

  private lock(referenceElement: Element | null) {
    if (this.lockCount === 0 || this.restore !== null) {
      return;
    }

    const doc = ownerDocument(referenceElement);
    const html = doc.documentElement;
    const htmlOverflowY = ownerWindow(html).getComputedStyle(html).overflowY;

    /* If the site author already hid overflow on <html>, respect it and bail out. */
    if (htmlOverflowY === "hidden" || htmlOverflowY === "clip") {
      this.restore = () => {};
      return;
    }

    const shouldUseBasicLock = isIOS || !hasInsetScrollbars(referenceElement);

    /**
     * On iOS, the standard scroll locking method does not work properly if the navbar is collapsed.
     * The following must be researched extensively before activating standard scroll locking on iOS:
     * - Textboxes must scroll into view when focused, and not cause a glitchy scroll animation.
     * - The navbar must not force itself into view and cause layout shift.
     * - Scroll containers must not flicker upon closing a popup when it has an exit animation.
     */
    this.restore = shouldUseBasicLock
      ? preventScrollBasic(referenceElement)
      : preventScrollStandard(referenceElement);
  }
}

const SCROLL_LOCKER = new ScrollLocker();

/**
 * Locks the scroll of the document when enabled.
 * @param enabled - Whether to enable the scroll lock.
 */
function useScrollLock(params: {
  enabled: boolean;
  mounted: boolean;
  open: boolean;
  referenceElement?: Element | null;
}) {
  const { enabled = true, mounted, open, referenceElement = null } = params;

  /**
   * When closing elements with "sloppy clicks" (clicks that start inside the element and ends outside),
   * animating out on WebKit browsers (mounted + not open) can cause the whole page to be selected.
   * To prevent this, we temporarily disable user-select on body while the element is animating out.
   * This bug might be fixed in newer WebKit versions.
   *
   * @see https://github.com/mui/base-ui/issues/1135
   */
  useClientLayoutEffect(() => {
    if (enabled && isWebKit && mounted && !open) {
      const doc = ownerDocument(referenceElement);
      const originalUserSelect = doc.body.style.userSelect;
      const originalWebkitUserSelect = doc.body.style.webkitUserSelect;
      doc.body.style.userSelect = "none";
      doc.body.style.webkitUserSelect = "none";

      return () => {
        doc.body.style.userSelect = originalUserSelect;
        doc.body.style.webkitUserSelect = originalWebkitUserSelect;
      };
    }
    return undefined;
  }, [enabled, mounted, open, referenceElement]);

  useClientLayoutEffect(() => {
    if (!enabled) {
      return undefined;
    }

    return SCROLL_LOCKER.acquire(referenceElement);
  }, [enabled, referenceElement]);
}

const invalidOverflowDisplayValues = new Set(["inline", "contents"]);

function isOverflowElement(element: Element): boolean {
  const { overflow, overflowX, overflowY, display } = getComputedStyle(element);
  return (
    /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) &&
    !invalidOverflowDisplayValues.has(display)
  );
}

export { useScrollLock };
