import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { UMAMI_READY_EVENT, umamiTrackWhenReady } from "../Umami.track";

type FakeWindow = EventTarget & {
  umami?: { track: ReturnType<typeof vi.fn> };
};

describe("umamiTrackWhenReady", () => {
  let fakeWindow: FakeWindow;

  beforeEach(() => {
    fakeWindow = new EventTarget();
    vi.stubGlobal("window", fakeWindow);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  test("tracks immediately when Umami is loaded", () => {
    fakeWindow.umami = { track: vi.fn() };

    umamiTrackWhenReady("404", { url: "/a" });

    expect(fakeWindow.umami.track).toHaveBeenCalledWith("404", { url: "/a" });
  });

  test("tracks once Umami signals ready", () => {
    umamiTrackWhenReady("404", { url: "/a" });

    const track = vi.fn();
    fakeWindow.umami = { track };
    fakeWindow.dispatchEvent(new Event(UMAMI_READY_EVENT));
    fakeWindow.dispatchEvent(new Event(UMAMI_READY_EVENT));

    expect(track).toHaveBeenCalledTimes(1);
    expect(track).toHaveBeenCalledWith("404", { url: "/a" });
  });

  test("cleanup cancels a pending track", () => {
    const cleanup = umamiTrackWhenReady("404", { url: "/a" });
    cleanup();

    const track = vi.fn();
    fakeWindow.umami = { track };
    fakeWindow.dispatchEvent(new Event(UMAMI_READY_EVENT));

    expect(track).not.toHaveBeenCalled();
  });
});
