type CustomFocusEvent = CustomEvent<{ originalEvent: FocusEvent }>;
type CustomPointerEvent = CustomEvent<{
  originalEvent: PointerEvent;
}>;

const CUSTOM_EVENTS = {
  FOCUS_OUTSIDE: "AKSEL_FOCUS_OUTSIDE",
  POINTER_DOWN_OUTSIDE: "AKSEL_POINTER_DOWN_OUTSIDE",
  POINTER_UP_OUTSIDE: "AKSEL_POINTER_UP_OUTSIDE",
};

function dispatchCustomEvent<
  E extends CustomEvent,
  OriginalEvent extends Event,
>(
  name: string,
  handler: ((event: E) => void) | undefined,
  detail: { originalEvent: OriginalEvent } & (E extends CustomEvent<infer D>
    ? D
    : never),
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
  target.dispatchEvent(event);
}

export { CUSTOM_EVENTS, dispatchCustomEvent };
export type { CustomFocusEvent, CustomPointerEvent };
