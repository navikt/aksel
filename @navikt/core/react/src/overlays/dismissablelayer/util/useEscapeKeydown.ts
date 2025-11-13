import { useEffect } from "react";
import { useCallbackRef } from "../../../util/hooks";

export function useEscapeKeydown(
  callback?: (event: KeyboardEvent) => void,
  ownerDocument: Document = globalThis?.document,
  enabled: boolean = true,
) {
  const onEscapeKeyDown = useCallbackRef(callback);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onEscapeKeyDown(event);
      }
    };

    ownerDocument.addEventListener("keydown", handleKeyDown, true);

    return () => {
      ownerDocument.removeEventListener("keydown", handleKeyDown, true);
    };
  }, [onEscapeKeyDown, ownerDocument, enabled]);
}
