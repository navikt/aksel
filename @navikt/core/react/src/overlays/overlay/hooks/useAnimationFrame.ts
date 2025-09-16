"use client";

/**
 * Source: Source: https://github.com/mui/base-ui/blob/6fd69008d83561dbe75ff89acf270f0fac3e0049/packages/utils/src/useAnimationFrame.ts
 * Some modifications made to appease linting rules and comments for clarity.
 */
import { useOnMount } from "./useOnMount";
import { useRefWithInit } from "./useRefWithInit";

type AnimationFrameId = number;

const EMPTY = null;

let LAST_RAF = globalThis.requestAnimationFrame;

/**
 * Stores an array of callbacks to be called on the next animation frame.
 * Only the first scheduled frame will request an 'animationFrame', all
 * others will be called in the same frame.
 *
 * This allows for batching of multiple updates in the same frame and keeps
 * the number of rAF calls to a minimum.
 *
 * The cancel method is also O(1), optimizing for cases where callbacks
 * are requested and then cancelled before they get to run often.
 *
 * **Why**:
 * - Rapid request/cancel loops become cheap, reducing garbage collection and function allocation churn.
 * - Provides both a global batching API (static request/cancel) and a per-instance debounce API.
 * - Predictable behavior under test environments with swapped timers.
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

    /* Reset before iterating since callbacks could call `requestAnimationFrame`. */
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

    /* In a test environment with fake timers, a fake `requestAnimationFrame` can be called
     * but there's no guarantee that the animation frame will actually run before the fake
     * timers are teared, which leaves `isScheduled` set, but won't run `tick()`. */
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

    /*
     * If index < 0: the callback has already been invoked trough `tick()`.
     * If index >= callbacks.length: Callback has already been cancelled or invoked.
     */
    if (index < 0 || index >= this.callbacks.length) {
      return;
    }

    /*
     * Since we dont actually remove the callback, just set it to null it will be ran as a 'noop'-operation
     * in `tick()`. This is to keep the cancel operation O(1), and is cheaper than removing it.
     */
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

  /*
   * Executes `fn` after `delay`, clearing any previously scheduled call.
   * One could call this a "next-frame debounce".
   * This allows components to schedule multiple requests, but only have it run once a frame.
   */
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

  /**
   * Cleanup function to be used to make sure any scheduled animation frames are cleared.
   * @example
   * ```
   * useEffect(*.disposeEffect, [])
   * ```
   */
  disposeEffect = () => {
    return this.cancel;
  };
}

/**
 * A `requestAnimationFrame` with automatic cleanup and mount-guard.
 */
function useAnimationFrame() {
  const timeout = useRefWithInit(AnimationFrame.create).current;

  useOnMount(timeout!.disposeEffect);

  return timeout;
}

export { useAnimationFrame, AnimationFrame };
