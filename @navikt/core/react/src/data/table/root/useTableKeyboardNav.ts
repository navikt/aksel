import { useEffect } from "react";
import { useEventCallback } from "../../../utils/hooks";

type DirectionsT = "ArrowUp" | "ArrowDown" | "ArrowLeft" | "ArrowRight";

function useTableKeyboardNav(
  tableRef: HTMLTableElement | null,
  { enabled }: { enabled: boolean },
) {
  const onNavigationKeyDown = useEventCallback(
    (event: KeyboardEvent, key: DirectionsT): void => {
      const { x, y } = keyToCoord(key);
      console.info("Navigate:", { x, y, event });
      return;
    },
  );

  const onKeyDown = useEventCallback((event: KeyboardEvent): void => {
    const key = event.key;

    /**
     * TODO: Check for "abort"-events, like currently editing input, open menu, etc. to avoid interfering with other interactions
     */

    switch (key) {
      case "ArrowDown":
      case "ArrowUp":
      case "ArrowLeft":
      case "ArrowRight":
        onNavigationKeyDown(event, key);
        break;
    }
  });

  useEffect(() => {
    if (!tableRef || !enabled) {
      return;
    }

    tableRef.addEventListener("keydown", onKeyDown);

    return () => {
      tableRef.removeEventListener("keydown", onKeyDown);
    };
  }, [tableRef, onKeyDown, enabled]);
}

function keyToCoord(
  key: "ArrowUp" | "ArrowDown" | "ArrowLeft" | "ArrowRight",
): { x: number; y: number } {
  switch (key) {
    case "ArrowUp":
      return { x: 0, y: -1 };
    case "ArrowDown":
      return { x: 0, y: 1 };
    case "ArrowLeft":
      return { x: -1, y: 0 };
    case "ArrowRight":
      return { x: 1, y: 0 };
  }
}

export { useTableKeyboardNav };
