import { useEffect } from "react";

/**
 * SSR-safe hook that listens for the Escape keydown event and calls the provided callback.
 * @param onEscapeKeyDown callback for when Escape key is pressed
 * @param deps additional dependencies to keep the hook up-to-date
 */
export function useEscapeKeydown(
  onEscapeKeyDown: (event: KeyboardEvent) => void,
  deps: React.DependencyList = [],
) {
  useEffect(() => {
    const ownerDocument: Document = globalThis?.document;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onEscapeKeyDown(event);
      }
    };
    ownerDocument.addEventListener("keydown", handleKeyDown);
    return () => ownerDocument.removeEventListener("keydown", handleKeyDown);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onEscapeKeyDown, ...deps]);
}
