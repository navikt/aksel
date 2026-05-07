import { DragDropProvider, DragOverlay } from "@dnd-kit/react";
import { isSortable } from "@dnd-kit/react/sortable";
import React, { forwardRef, isValidElement } from "react";
import { VStack } from "../../../primitives/stack";
import DragAndDropItemLegacy from "../item/DragAndDropItemLegacy";
import { DragAndDropLegacyContext } from "./DragAndDropLegacy.context";

interface DragAndDropLegacyProps extends React.HTMLAttributes<HTMLDivElement> {
  children: any[];
  setItems: React.Dispatch<React.SetStateAction<any[]>>;
}

interface DragAndDropLegacyRootComponent extends React.ForwardRefExoticComponent<
  DragAndDropLegacyProps & React.RefAttributes<HTMLDivElement>
> {
  /**
   * @see 🏷️ {@link DragAndDropItemLegacyProps}
   * * @example
   * ```jsx
   * <DragAndDropLegacy>
   *   <DragAndDropLegacy.Item id="1" index={0}>
   *     ...
   *   </DragAndDropLegacy.Item>
   * </DragAndDropLegacy>
   * ```
   */
  Item: typeof DragAndDropItemLegacy;
}

const DragAndDropLegacy = forwardRef<HTMLDivElement, DragAndDropLegacyProps>(
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
      <DragAndDropLegacyContext.Provider value={{ inputMethod }}>
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
            const { source, target } = event.operation;
            if (!isSortable(source) || !isSortable(target)) return;
            setItemOrder(source.initialIndex, target.index);
          }}
        >
          <VStack asChild gap="space-12">
            <div {...rest} ref={forwardedRef}>
              {children}
            </div>
          </VStack>
          <DragOverlay dropAnimation={null}>
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
      </DragAndDropLegacyContext.Provider>
    );
  },
) as DragAndDropLegacyRootComponent;

DragAndDropLegacy.Item = DragAndDropItemLegacy;

export { DragAndDropLegacy, DragAndDropItemLegacy };
export default DragAndDropLegacy;
export type { DragAndDropLegacyProps };
