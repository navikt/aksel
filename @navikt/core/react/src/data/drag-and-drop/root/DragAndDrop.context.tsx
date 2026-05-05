import { createStrictContext } from "../../../utils/helpers";
import { DragAndDropElement } from "../types";

interface DragAndDropContextType {
  activeItem: DragAndDropElement | null;
  setActiveItem: (id: DragAndDropElement | null) => void;
  dropTarget: DragAndDropElement | null;
  setDropTarget: (id: DragAndDropElement | null) => void;
  dragHandlerActive: DragAndDropElement | null;
  onKeyboardDragStart: (active: DragAndDropElement | null) => void;
  onKeyboardDragEnd: (diff: number, label: string) => void;
  startPendingDrag: (
    event: React.PointerEvent,
    item: DragAndDropElement,
    element?: HTMLElement | null,
  ) => void;
  itemAmount: number;
  cancelDrag: (resetOrder?: boolean) => void;
  setAnnouncer: (message: string) => void;
}

export const {
  Provider: DragAndDropProvider,
  useContext: useDragAndDropContext,
} = createStrictContext<DragAndDropContextType | undefined>({
  errorMessage:
    "useDragAndDropContext must be used within a DragAndDropProvider",
  name: "DragAndDropContext",
});
