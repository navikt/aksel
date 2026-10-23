// Based on https://github.com/facebook/astryx/blob/main/packages/core/src/hooks/useAnnounce.ts
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * Provides imperative screen-reader announcements via persistently-mounted
 * polite/assertive live regions. Regions are auto-cleared shortly after
 * announcing so stale status text does not linger in the accessibility tree.
 */

/**
 * Announcement urgency:
 * - `'polite'` (default): announced when the screen reader is idle. Use for
 *   status updates, result counts, "no results", non-urgent confirmations.
 * - `'assertive'`: interrupts the current announcement. Reserve for errors and
 *   time-sensitive alerts.
 */
type Politeness = "polite" | "assertive";

const clearTimers: {
  [K in Politeness]: ReturnType<typeof setTimeout> | null;
} = {
  polite: null,
  assertive: null,
};

function cancelScheduledClear(politeness: Politeness) {
  const timer = clearTimers[politeness];
  if (timer != null) {
    clearTimeout(timer);
    clearTimers[politeness] = null;
  }
}

const pendingFrames: Record<Politeness, Set<number>> = {
  polite: new Set(),
  assertive: new Set(),
};

function cancelPendingFrames(politeness: Politeness) {
  for (const frame of pendingFrames[politeness]) {
    cancelAnimationFrame(frame);
  }
  pendingFrames[politeness].clear();
}

function scheduleClear(politeness: Politeness, target: HTMLElement) {
  cancelScheduledClear(politeness);
  clearTimers[politeness] = setTimeout(() => {
    clearTimers[politeness] = null;
    target.textContent = "";
  }, 2000);
}

let regions: {
  polite: HTMLElement;
  assertive: HTMLElement;
} | null = null;

function createRegion(politeness: Politeness) {
  const el = document.createElement("div");
  el.dataset.akselAnnouncer = "";
  el.className = "aksel-sr-only";
  el.role = politeness === "assertive" ? "alert" : "status";
  document.body.appendChild(el);
  return el;
}

function getRegions() {
  if (typeof document === "undefined") {
    return null;
  }
  if (regions) {
    // Re-attach if a region was removed from the DOM (e.g. by a test cleanup).
    if (!regions.polite.isConnected) {
      document.body.appendChild(regions.polite);
    }
    if (!regions.assertive.isConnected) {
      document.body.appendChild(regions.assertive);
    }
    return regions;
  }
  regions = {
    polite: createRegion("polite"),
    assertive: createRegion("assertive"),
  };
  return regions;
}

function announce(message: string, politeness: Politeness = "polite") {
  const r = getRegions();
  if (!r) {
    return;
  }
  const target = r[politeness];
  if (!message) {
    cancelPendingFrames(politeness);
    cancelScheduledClear(politeness);
    target.textContent = "";
    return;
  }
  // Clear first in case the new message equals the current text.
  target.textContent = "";
  // Defer setting text to the next animation frame so the browser doesn't
  // batch the clear and re-set into a single no-op for screen readers.
  // TODO: TEST på Mac. I BrowserStack ser det ut som dette ikke (alltid) hjelper (det funker ikke å gjenta samme beskjed innen 2 sek)
  const frame = requestAnimationFrame(() => {
    pendingFrames[politeness].delete(frame);
    target.textContent = message;
  });
  pendingFrames[politeness].add(frame);
  // Auto-clear so the last message does not linger indefinitely.
  scheduleClear(politeness, target);
}

/**
 * Speaks a message through a persistently-mounted, visually-hidden live region.
 *
 * The polite and assertive regions are created once and kept mounted.
 *
 * Each message is automatically cleared a couple of seconds after being
 * announced, so users browsing the DOM later do not encounter stale status
 * text. Announcing again before the clear simply resets the countdown.
 */
function useAnnounce() {
  getRegions(); // Ensure regions are created on beforehand // TODO: Test på ekte Mac om faktisk trengs
  return announce;
}

export { useAnnounce };
