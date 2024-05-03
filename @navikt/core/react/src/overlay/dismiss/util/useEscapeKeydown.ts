import { useEffect } from "react";
import { useCallbackRef } from "../../../util/hooks";

export function useEscapeKeydown(
  callback?: (event: KeyboardEvent) => void,
  ownerDocument: Document = globalThis?.document,
) {
  const onEscapeKeyDown = useCallbackRef(callback);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onEscapeKeyDown(event);
      }
    };

    ownerDocument.addEventListener("keydown", handleKeyDown, true);
    return () =>
      ownerDocument.removeEventListener("keydown", handleKeyDown, true);
  }, [onEscapeKeyDown, ownerDocument]);
}
