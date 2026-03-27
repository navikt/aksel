import { createStrictContext } from "../../../utils/helpers";
import { DragAndDropElement } from "../types";

interface DragAndDropContextType {
  activeItem: DragAndDropElement | null;
  setActiveItem: (id: DragAndDropElement | null) => void;
  dropTarget: DragAndDropElement | null;
  setDropTarget: (id: DragAndDropElement | null) => void;
  dragHandlerActive: DragAndDropElement | null;
  setDragHandlerActive: (active: DragAndDropElement | null) => void;
  onKeyboardDragEnd: (diff: number) => void;
  beforeDragStart: (
    event: React.PointerEvent,
    item: DragAndDropElement,
    element?: HTMLElement | null,
  ) => void;
  cancelDragStart: () => void;
}

export const {
  Provider: DragAndDropProvider,
  useContext: useDragAndDropContext,
} = createStrictContext<DragAndDropContextType | undefined>({
  errorMessage:
    "useDragAndDropContext must be used within a DragAndDropProvider",
  name: "DragAndDropContext",
});
