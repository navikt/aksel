import React, { forwardRef } from "react";
import DataDragAndDropItem, {
  DataDragAndDropItemProps,
} from "../item/DataDragAndDropItem";
import { DataDragAndDropProvider } from "./DataDragAndDrop.context";

interface DataDragAndDropProps extends React.HTMLAttributes<HTMLDivElement> {
  children: any[];
  setItems: React.Dispatch<React.SetStateAction<any[]>>;
}

interface DataDragAndDropRootComponent extends React.ForwardRefExoticComponent<
  DataDragAndDropProps & React.RefAttributes<HTMLDivElement>
> {
  /**
   * @see 🏷️ {@link DataDragAndDropItemProps}
   * * @example
   * ```jsx
   * <DragAndDrop>
   *   <DragAndDrop.Item id="1" index={0}>
   *     ...
   *   </DragAndDrop.Item>
   * </DragAndDrop>
   * ```
   */
  Item: typeof DataDragAndDropItem;
}

/**
 * TODO
 * setItems on root
 * state : active element
 * pointer over listener / state, onPointerEnter, onPointerLeave
 * Overlay - Use floating component
 * Keyboard navigation
 * Handle - button, arrows also button
 * UU - announce on drag start, item moved, drag end
 */

const DataDragAndDrop = forwardRef<HTMLDivElement, DataDragAndDropProps>(
  ({ children }, forwardedRef) => {
    return (
      <DataDragAndDropProvider inputMethod={null}>
        <div ref={forwardedRef}>{children}</div>
      </DataDragAndDropProvider>
    );
  },
) as DataDragAndDropRootComponent;

DataDragAndDrop.Item = DataDragAndDropItem;

export { DataDragAndDrop, DataDragAndDropItem };
export default DataDragAndDrop;
export type { DataDragAndDropItemProps, DataDragAndDropProps };
