import React from "react";
import { HStack } from "../../../primitives/stack";
import { cl } from "../../../utils/helpers";

interface DataDragAndDropItemProps extends React.HTMLAttributes<HTMLDivElement> {
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
 * @see 🏷️ {@link DataDragAndDropItemProps}
 * @example
 * ```tsx
 * <DragAndDrop.Item numOfSelectedRows={selectedRows.length} onClear={handleClear}>
 *   TODO
 * </DragAndDrop.Item>
 * ```
 */
const DataDragAndDropItem = React.forwardRef<
  HTMLDivElement,
  DataDragAndDropItemProps
>(({ children, className, ...rest }, forwardedRef) => {
  // const context = useDataDragAndDropContext();

  return (
    <HStack gap="space-8" align="center" wrap={false} asChild>
      {/* TODO Should this be a <li>? */}
      <div
        ref={forwardedRef}
        {...rest}
        className={cl("aksel-data-table__drag-and-drop-item", className)}
        /*data-dragging={isDragging}
        data-mouse-dragging={mouseDragging}
        data-keyboard-dragging={keyboardDragging}
        data-drop-target={mouseDropTarget}*/
      >
        <div>{children}</div>
      </div>
    </HStack>
  );
});

export default DataDragAndDropItem;
export { DataDragAndDropItem };
export type { DataDragAndDropItemProps };
