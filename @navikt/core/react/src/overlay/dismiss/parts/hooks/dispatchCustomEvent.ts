import ReactDOM from "react-dom";

export const CUSTOM_EVENTS = {
  FOCUS_OUTSIDE: "AKSEL_FOCUS_OUTSIDE",
  POINTER_DOWN_OUTSIDE: "AKSEL_POINTER_DOWN_OUTSIDE",
};

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
