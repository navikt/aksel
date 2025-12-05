import ReactDOM from "react-dom";

type CustomFocusEvent = CustomEvent<{ originalEvent: FocusEvent }>;
type CustomPointerEvent = CustomEvent<{
  originalEvent: PointerEvent;
}>;

export type { CustomFocusEvent, CustomPointerEvent };

export const CUSTOM_EVENTS = {
  FOCUS_OUTSIDE: "AKSEL_FOCUS_OUTSIDE",
  POINTER_DOWN_OUTSIDE: "AKSEL_POINTER_DOWN_OUTSIDE",
  POINTER_UP_OUTSIDE: "AKSEL_POINTER_UP_OUTSIDE",
};

/**
 * Use of `discrete` flushes custom event dispatch. This is to mimic the behavior React has for `discrete` events.
 * https://github.com/facebook/react/blob/a8a4742f1c54493df00da648a3f9d26e3db9c8b5/packages/react-dom/src/events/ReactDOMEventListener.js#L318
 *
 * React batches *all* event handlers since version 18, this introduces certain considerations when using custom event types.
 *
 * Internally, React prioritises events in the following order:
 *  - discrete
 *  - continuous
 *  - default
 *
 * `discrete` is an  important distinction as updates within these events are applied immediately.
 * React however, is not able to infer the priority of custom event types due to how they are detected internally.
 * Because of this, it's possible for updates from custom events to be unexpectedly batched when
 * dispatched by another `discrete` event.
 *
 * In order to ensure that updates from custom events are applied predictably, we need to manually flush the batch.
 * This utility should be used when dispatching a custom event from within another `discrete` event, this utility
 * is not nessesary when dispatching known event types, or if dispatching a custom type inside a non-discrete event.
 * For example:
 *
 * dispatching a known click 👎
 * target.dispatchEvent(new Event(‘click’))
 *
 * dispatching a custom type within a non-discrete event 👎
 * onScroll={(event) => event.target.dispatchEvent(new CustomEvent(‘customType’))}
 *
 * dispatching a custom type within a `discrete` event 👍
 * onPointerDown={(event) => dispatchDiscreteCustomEvent(event.target, new CustomEvent(‘customType’))}
 *
 * Note: though React classifies `focus`, `focusin` and `focusout` events as `discrete`, it's  not recommended to use
 * this utility with them. This is because it's possible for those handlers to be called implicitly during render
 * e.g. when focus is within a component as it is unmounted, or when managing focus on mount.
 */
export function dispatchCustomEvent<
  E extends CustomEvent,
  OriginalEvent extends Event,
>(
  name: string,
  handler: ((event: E) => void) | undefined,
  detail: { originalEvent: OriginalEvent } & (E extends CustomEvent<infer D>
    ? D
    : never),
  { discrete }: { discrete: boolean } = { discrete: false },
) {
  if (!handler) {
    return;
  }
  const target = detail.originalEvent.target;
  const event = new CustomEvent(name, {
    bubbles: false,
    cancelable: true,
    detail,
  });

  target.addEventListener(name, handler as EventListener, { once: true });

  if (discrete && target) {
    ReactDOM.flushSync(() => target.dispatchEvent(event));
  } else {
    target.dispatchEvent(event);
  }
}
