export const SELECTION_KEYS = ["Enter", " "];
export const SUB_OPEN_KEYS = [...SELECTION_KEYS, "ArrowRight"];

export function whenMouse<E>(
  handler: React.PointerEventHandler<E>,
): React.PointerEventHandler<E> {
  return (event) =>
    event.pointerType === "mouse" ? handler(event) : undefined;
}
