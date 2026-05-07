import { useSortable } from "@dnd-kit/react/sortable";
import React, { useRef } from "react";
import { HStack } from "../../../primitives/stack";
import { cl } from "../../../utils/helpers";
import { useMergeRefs } from "../../../utils/hooks";
import { DragAndDropDragHandlerLegacy } from "../drag-handler/DragAndDropDragHandlerLegacy";
import { DragAndDropLegacyContext } from "../root/DragAndDropLegacy.context";

interface DragAndDropItemLegacyProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /**
   * Unique id
   */
  id: string;
  /**
   * Index of the item being dragged
   */
  index: number;
}

/**
 * TODO
 *
 * @see 🏷️ {@link DragAndDropItemLegacyProps}
 * @example
 * ```tsx
 * <DragAndDropLegacy.Item numOfSelectedRows={selectedRows.length} onClear={handleClear}>
 *   TODO
 * </DragAndDropLegacy.Item>
 * ```
 */
const DragAndDropItemLegacy = React.forwardRef<
  HTMLDivElement,
  DragAndDropItemLegacyProps
>(({ children, id, index, className, ...rest }, forwardedRef) => {
  const handleRef = useRef<HTMLDivElement>(null);
  const { ref, isDragging, isDropTarget } = useSortable({
    id,
    index,
    handle: handleRef,
  });
  const mergedRef = useMergeRefs(ref, forwardedRef);
  const context = React.useContext(DragAndDropLegacyContext);
  const mouseDragging = isDragging && context?.inputMethod === "mouse";
  const mouseDropTarget = isDropTarget && context?.inputMethod === "mouse";
  const keyboardDragging = isDragging && context?.inputMethod === "keyboard";

  return (
    <HStack gap="space-8" align="center" wrap={false} asChild>
      {/* TODO Should this be a <li>? */}
      <div
        ref={mergedRef}
        {...rest}
        className={cl("aksel-data-table__drag-and-drop-item", className)}
        data-dragging={isDragging}
        data-mouse-dragging={mouseDragging}
        data-keyboard-dragging={keyboardDragging}
        data-drop-target={mouseDropTarget}
        tabIndex={-1}
      >
        <DragAndDropDragHandlerLegacy
          handleRef={handleRef}
          keyboardDragging={keyboardDragging}
          alt
        />
        <div>{children}</div>
      </div>
    </HStack>
  );
});

export default DragAndDropItemLegacy;
export { DragAndDropItemLegacy };
export type { DragAndDropItemLegacyProps };
