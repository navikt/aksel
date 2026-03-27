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
  /**
   * Indicates if the item is an overlay
   */
  isOverlay?: boolean;
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
  (
    { children, id, index, className, isOverlay = false, ...rest },
    forwardedRef,
  ) => {
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
          id={isOverlay ? undefined : id}
          ref={ref}
          {...rest}
          data-dnd-id={isOverlay ? undefined : id}
          data-dnd-index={isOverlay ? undefined : index}
          className={cl("aksel-data-table__drag-and-drop-item", className)}
          data-drop-target={isOverlay ? undefined : isDropTarget}
          data-overlay={isOverlay}
          tabIndex={isOverlay ? undefined : -1}
        >
          <DragAndDropDragHandler item={item} itemRef={ref} />
          <div>{children}</div>
        </div>
      </HStack>
    );
  },
);

export default DragAndDropItem;
export { DragAndDropItem };
export type { DragAndDropItemProps };
