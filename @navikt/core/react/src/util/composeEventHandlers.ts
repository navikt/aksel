/* https://github.com/radix-ui/primitives/blob/main/packages/core/primitive/src/primitive.tsx#L1 */

/**
 * Utility to consistently call original eventhandler, often from props and internal eventhandler
 * @internal
 */
export function composeEventHandlers<T>(
  originalEventHandler?: (event: T) => void,
  ourEventHandler?: (event: T) => void,
  { checkForDefaultPrevented = true } = {},
) {
  return function handleEvent(event: T) {
    originalEventHandler?.(event);

    if (
      checkForDefaultPrevented === false ||
      !(event as unknown as Event).defaultPrevented
    ) {
      return ourEventHandler?.(event);
    }
  };
}
