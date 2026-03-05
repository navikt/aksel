import { DragDropProvider, DragOverlay } from "@dnd-kit/react";
import { isSortable } from "@dnd-kit/react/sortable";
import React, { forwardRef, isValidElement } from "react";
import { VStack } from "../../../primitives/stack";
import DataDragAndDropItem, {
  DataDragAndDropItemProps,
} from "../item/DataDragAndDropItem";
import { DataDragAndDropContext } from "./DataDragAndDrop.context";

interface DataDragAndDropProps extends React.HTMLAttributes<HTMLTableElement> {
  children: any[];
  setItems: React.Dispatch<React.SetStateAction<any[]>>;
}

interface DataDragAndDropRootComponent extends React.ForwardRefExoticComponent<
  DataDragAndDropProps & React.RefAttributes<HTMLTableElement>
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

const DataDragAndDrop = forwardRef<HTMLDivElement, DataDragAndDropProps>(
  ({ setItems, children, ...rest }, forwardedRef) => {
    const [inputMethod, setInputMethod] = React.useState<
      "mouse" | "keyboard" | null
    >(null);

    const setItemOrder = (initalIndex: number, targetIndex: number) => {
      setItems((items) => {
        const newItems = [...items];
        const [movedItem] = newItems.splice(initalIndex, 1);
        newItems.splice(targetIndex, 0, movedItem);
        return newItems;
      });
    };

    return (
      <DataDragAndDropContext.Provider value={{ inputMethod }}>
        <DragDropProvider
          // TODO Look into overriding default keybinds, might eliminate context need
          onBeforeDragStart={(event) =>
            setInputMethod(
              event.operation.activatorEvent?.type === "pointerdown"
                ? "mouse"
                : "keyboard",
            )
          }
          onDragOver={(event) => {
            if (event.operation.activatorEvent?.type === "pointerdown") {
              // Prevents items to rearrange while dragging with mouse, but allows keyboard dragging to work as intended
              event.preventDefault();
            }
          }}
          onDragEnd={(event) => {
            if (event.operation.activatorEvent?.type === "pointerdown") {
              const { source, target } = event.operation;
              if (!isSortable(source) || !isSortable(target)) return;
              setItemOrder(source.initialIndex, target.index);
            }
          }}
        >
          <VStack asChild gap="space-12">
            <div {...rest} ref={forwardedRef}>
              {children}
            </div>
          </VStack>
          <DragOverlay>
            {(source) => {
              // Overlay not needed and causes glitching when using keyboard
              if (inputMethod === "keyboard") return null;
              if (!isSortable(source)) return null;
              if (isValidElement(children[source.initialIndex])) {
                return children[source.initialIndex];
              }
              return null;
            }}
          </DragOverlay>
        </DragDropProvider>
      </DataDragAndDropContext.Provider>
    );
  },
) as DataDragAndDropRootComponent;

DataDragAndDrop.Item = DataDragAndDropItem;

export { DataDragAndDrop, DataDragAndDropItem };
export default DataDragAndDrop;
export type { DataDragAndDropItemProps, DataDragAndDropProps };
