import { useEffect } from "react";
import { useEventCallback } from "../../../hooks";

export function useEscapeKeydown(
  callback?: (event: KeyboardEvent) => void,
  ownerDocument: Document = globalThis?.document,
  enabled: boolean = true,
) {
  const onEscapeKeyDown = useEventCallback(callback);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onEscapeKeyDown(event);
      }
    };

    /**
     * We use the bubbling phase (not capture) so that elements inside the layer
     * can handle Escape themselves and call stopPropagation() if needed.
     * Layer ordering is handled programmatically via the DismissableLayerContext.
     */
    ownerDocument.addEventListener("keydown", handleKeyDown);

    return () => {
      ownerDocument.removeEventListener("keydown", handleKeyDown);
    };
  }, [onEscapeKeyDown, ownerDocument, enabled]);
}
