import React from "react";
import { cl } from "../../../utils/helpers";
import { useMergeRefs } from "../../../utils/hooks";
import { DragAndDropDragHandler } from "../drag-handler/DragAndDropDragHandler";
import { useDragAndDropContext } from "../root/DragAndDrop.context";

interface DragAndDropItemProps extends React.HTMLAttributes<HTMLLIElement> {
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
  itemLabel: string;
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
const DragAndDropItem = React.forwardRef<HTMLLIElement, DragAndDropItemProps>(
  (
    { children, id, index, className, isOverlay = false, itemLabel, ...rest },
    forwardedRef,
  ) => {
    const ref = React.useRef<HTMLLIElement>(null);
    const mergedRef = useMergeRefs(forwardedRef, ref);
    const context = useDragAndDropContext();
    const item = { id, index };
    const isDropTarget = context?.dropTarget?.id === id;

    return (
      <li
        id={isOverlay ? undefined : id}
        {...rest}
        ref={mergedRef}
        data-dnd-id={isOverlay ? undefined : id}
        data-dnd-index={isOverlay ? undefined : index}
        className={cl("aksel-data-table__drag-and-drop-item", className)}
        data-drop-target={isOverlay ? undefined : isDropTarget}
        data-overlay={isOverlay}
      >
        <DragAndDropDragHandler
          item={item}
          itemRef={ref}
          isOverlay={isOverlay}
          itemLabel={itemLabel}
        />
        <div>{children}</div>
      </li>
    );
  },
);

export default DragAndDropItem;
export { DragAndDropItem };
export type { DragAndDropItemProps };
