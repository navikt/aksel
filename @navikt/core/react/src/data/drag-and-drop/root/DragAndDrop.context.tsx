import { createStrictContext } from "../../../utils/helpers";
import { DragAndDropElement } from "./DragAndDropRoot";

interface DragAndDropContextType {
  activeItem: DragAndDropElement | null;
  setActiveItem: (id: DragAndDropElement | null) => void;
  dropTarget: DragAndDropElement | null;
  setDropTarget: (id: DragAndDropElement | null) => void;
  dragHandlerActive: DragAndDropElement | null;
  setDragHandlerActive: (active: DragAndDropElement | null) => void;
  onKeyboardDragEnd: (diff: number) => void;
  onDragStart: (
    event: React.PointerEvent | React.MouseEvent,
    item: DragAndDropElement,
  ) => void;
}

export const {
  Provider: DragAndDropProvider,
  useContext: useDragAndDropContext,
} = createStrictContext<DragAndDropContextType | undefined>({
  errorMessage:
    "useDragAndDropContext must be used within a DragAndDropProvider",
  name: "DragAndDropContext",
});
