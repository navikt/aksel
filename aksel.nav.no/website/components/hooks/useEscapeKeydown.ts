import { useEffect } from "react";

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
