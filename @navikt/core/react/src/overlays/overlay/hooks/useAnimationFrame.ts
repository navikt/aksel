"use client";

/**
 * Frame batching + lightweight per-instance "next frame" debounce utility.
 *
 * Inspiration:
 *  - https://github.com/mui/base-ui/blob/6fd69008d83561dbe75ff89acf270f0fac3e0049/packages/utils/src/useAnimationFrame.ts
 *
 * Goals:
 *  - Batch many `requestAnimationFrame` callbacks into a single native rAF per frame.
 *  - Provide O(1) cancel (mark slot null instead of splicing).
 *  - Offer a per-instance helper (`AnimationFrame`) that always runs the latest scheduled
 *    callback at most once in the upcoming frame ("next-frame debounce").
 *  - Remain robust in test environments where the rAF implementation may change mid-run.
 *
 * Why this exists instead of calling `requestAnimationFrame` directly everywhere:
 *  - Reduces overhead when many subsystems schedule + cancel in quick succession.
 *  - Ensures all batched callbacks within a frame observe an identical timestamp argument.
 *  - Simplifies cleanup in React components (`useAnimationFrame` returns an object with a
 *    stable disposal function).
 *
 * Terminology:
 *  - "scheduler" holds a transient list of callbacks for the next frame only.
 *  - After a frame fires, the list resets; any new `request()` calls schedule a *new* frame.
 */
import { useOnMount } from "./useOnMount";
import { useRefWithInit } from "./useRefWithInit";

type AnimationFrameId = number;

const EMPTY = null;

let LAST_RAF = globalThis.requestAnimationFrame;

/*
 * Core scheduler: accumulates callbacks for the *next* frame only.
 * - First enqueued callback schedules the browser rAF.
 * - Additional callbacks piggy‑back; only one native call per frame.
 * - Cancel uses nulling (sparse array) -> O(1) and avoids re-indexing.
 * - After firing, internal arrays reset so memory does not grow unbounded.
 */
class AnimationScheduler {
  callbacks = [] as (FrameRequestCallback | null)[];

  callbacksCount = 0;
  nextId = 1;
  startId = 1;
  isScheduled = false;

  tick = (timestamp: number) => {
    this.isScheduled = false;

    const currentCallbacks = this.callbacks;
    const currentCallbacksCount = this.callbacksCount;

    /* Reset before iterating: a callback may enqueue more work for a *future* frame. */
    this.callbacks = [];
    this.callbacksCount = 0;
    this.startId = this.nextId;

    if (currentCallbacksCount > 0) {
      for (let i = 0; i < currentCallbacks.length; i += 1) {
        currentCallbacks[i]?.(timestamp);
      }
    }
  };

  request(fn: FrameRequestCallback) {
    const id = this.nextId;
    this.nextId += 1;
    this.callbacks.push(fn);
    this.callbacksCount += 1;

    /* Test env note: rAF polyfills can swap implementation; reschedule if it changed
     * to avoid a stale `isScheduled` flag when timers are flushed without a frame. */
    let didRAFChange = false;
    if (process.env.NODE_ENV === "test" && LAST_RAF !== requestAnimationFrame) {
      LAST_RAF = requestAnimationFrame;
      didRAFChange = true;
    }

    if (!this.isScheduled || didRAFChange) {
      requestAnimationFrame(this.tick);
      this.isScheduled = true;
    }
    return id;
  }

  cancel(id: AnimationFrameId) {
    const index = id - this.startId;

    /* Index guard:
     *  - < 0  => already executed in an earlier frame
     *  - >= length => already cancelled or executed
     */
    if (index < 0 || index >= this.callbacks.length) {
      return;
    }

    /* Null instead of splice to keep cancel O(1); tick skips null (cheap sparse iteration). */
    this.callbacks[index] = null;
    this.callbacksCount -= 1;
  }
}

const scheduler = new AnimationScheduler();

class AnimationFrame {
  static create() {
    return new AnimationFrame();
  }

  static request(fn: FrameRequestCallback) {
    return scheduler.request(fn);
  }

  static cancel(id: AnimationFrameId) {
    return scheduler.cancel(id);
  }

  currentId: AnimationFrameId | null = EMPTY;

  /* Next-frame debounce: latest scheduled fn wins; runs once in the next frame. */
  request(fn: () => void) {
    this.cancel();
    this.currentId = scheduler.request(() => {
      this.currentId = EMPTY;
      fn();
    });
  }

  cancel = () => {
    if (this.currentId !== EMPTY) {
      scheduler.cancel(this.currentId);
      this.currentId = EMPTY;
    }
  };

  /** Disposal helper for React effects to cancel any pending frame. */
  disposeEffect = () => {
    return this.cancel;
  };
}

/** Hook returning a stable next-frame debouncer (with automatic unmount cleanup). */
function useAnimationFrame() {
  const timeout = useRefWithInit(AnimationFrame.create).current;

  useOnMount(timeout!.disposeEffect);

  return timeout;
}

export { useAnimationFrame, AnimationFrame };
