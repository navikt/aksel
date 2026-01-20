/**
 * If the provided argument is a ref object, returns its `current` value.
 * Otherwise, returns the argument itself.
 *
 * Non-generic to safely handle refs whose `.current` may be `null`.
 */
function resolveRef(
  maybeRef:
    | HTMLElement
    | React.RefObject<HTMLElement | null | undefined>
    | null,
): HTMLElement | null | undefined {
  if (maybeRef === null) {
    return maybeRef;
  }

  return "current" in maybeRef ? maybeRef.current : maybeRef;
}

export { resolveRef };
