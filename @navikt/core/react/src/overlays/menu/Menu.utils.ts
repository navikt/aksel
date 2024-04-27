export const SELECTION_KEYS = ["Enter", " "];

export function whenMouse<E>(
  handler: React.PointerEventHandler<E>,
): React.PointerEventHandler<E> {
  return (event) =>
    event.pointerType === "mouse" ? handler(event) : undefined;
}
