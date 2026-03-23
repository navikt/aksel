import React from "react";
import { HStack } from "../../../primitives/stack";
import { cl } from "../../../utils/helpers";
import { DragAndDropDragHandler } from "../drag-handler/DragAndDropDragHandler";
import { useDragAndDropContext } from "../root/DragAndDrop.context";

interface DragAndDropItemProps extends React.HTMLAttributes<HTMLDivElement> {
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
 * @see 🏷️ {@link DragAndDropItemProps}
 * @example
 * ```tsx
 * <DragAndDrop.Item numOfSelectedRows={selectedRows.length} onClear={handleClear}>
 *   TODO
 * </DragAndDrop.Item>
 * ```
 */
const DragAndDropItem = React.forwardRef<HTMLDivElement, DragAndDropItemProps>(
  ({ children, id, index, className, ...rest }, forwardedRef) => {
    const ref = React.useRef<HTMLDivElement>(null);
    const context = useDragAndDropContext();
    const item = { id, index };
    const isDropTarget = context?.dropTarget?.id === id;

    return (
      <HStack
        gap="space-8"
        align="center"
        wrap={false}
        asChild
        ref={forwardedRef}
        padding="space-4"
      >
        {/* TODO Should this be a <li>? */}
        <div
          id={id}
          ref={ref}
          {...rest}
          data-dnd-id={id}
          data-dnd-index={index}
          role="button"
          className={cl("aksel-data-table__drag-and-drop-item", className)}
          data-drop-target={isDropTarget}
          /*
          data-keyboard-dragging={keyboardDragging}
          */
          tabIndex={-1}
        >
          <DragAndDropDragHandler item={item} />
          <div>{children}</div>
        </div>
      </HStack>
    );
  },
);

export default DragAndDropItem;
export { DragAndDropItem };
export type { DragAndDropItemProps };
