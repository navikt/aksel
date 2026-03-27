import React, { forwardRef, useEffect } from "react";
import { Floating } from "../../../utils/components/floating/Floating";
import DragAndDropItem, { DragAndDropItemProps } from "../item/DragAndDropItem";
import { DragAndDropElement } from "../types";
import { DragAndDropProvider } from "./DragAndDrop.context";

interface DragAndDropProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactElement<DragAndDropItemProps>[];
  setItems: React.Dispatch<
    React.SetStateAction<React.ReactElement<DragAndDropItemProps>[]>
  >;
}

interface DataDragAndDropRootComponent extends React.ForwardRefExoticComponent<
  DragAndDropProps & React.RefAttributes<HTMLDivElement>
> {
  /**
   * @see 🏷️ {@link DragAndDropItemProps}
   * * @example
   * ```jsx
   * <DragAndDrop>
   *   <DragAndDrop.Item id="1" index={0}>
   *     ...
   *   </DragAndDrop.Item>
   * </DragAndDrop>
   * ```
   */
  Item: typeof DragAndDropItem;
}

/**
 * TODO
 * [x] setItems on root
 * [x] state : active element
 * [x] pointer over listener / state, onPointerEnter, onPointerLeave
 * [x] Overlay - Use floating component
 * [x] Keyboard navigation
 * [ ] UU - announce on drag start, item moved, drag end
 * [x] Make overlay same width as the OG item, currently jumps to content width
 * [ ] Look into adding a cancel listener event
 * [ ] Make onClick work on drag handler button, currently blocked by pointer down/up listeners
 * [ ] Talk to design about what should happen on ESC key press, currently just cancels dragging, should it also reset position?
 * [ ] Make arrow icons into buttons that react to keyboard events, currently just decorative
 */

const DragAndDrop = forwardRef<HTMLDivElement, DragAndDropProps>(
  ({ setItems, children }, forwardedRef) => {
    const [activeItem, setActiveItem] =
      React.useState<DragAndDropElement | null>(null);
    const [dropTarget, setDropTarget] =
      React.useState<DragAndDropElement | null>(null);
    const [dragHandlerActive, setDragHandlerActive] =
      React.useState<DragAndDropElement | null>(null);
    const [overlayWidth, setOverlayWidth] = React.useState<number | null>(null);

    const activeItemRef = React.useRef<DragAndDropElement | null>(null);
    const dropTargetRef = React.useRef<DragAndDropElement | null>(null);
    const activeChild = children.find(
      (child) => child.props.id === activeItem?.id,
    );

    const [virtualRef, setVirtualRef] = React.useState({
      getBoundingClientRect: () =>
        DOMRect.fromRect({ width: 0, height: 0, x: 0, y: 0 }),
    });

    const setCombinedActiveItem = React.useCallback(
      (item: DragAndDropElement | null) => {
        activeItemRef.current = item;
        setActiveItem(item);
      },
      [],
    );

    const setCombinedDropTarget = React.useCallback(
      (item: DragAndDropElement | null) => {
        dropTargetRef.current = item;
        setDropTarget(item);
      },
      [],
    );

    useEffect(() => {
      if (activeItem) {
        document.documentElement.setAttribute("data-dragging", "true");
        document.body.style.userSelect = "none";
      } else {
        document.documentElement.removeAttribute("data-dragging");
        document.body.style.userSelect = "";
      }

      return () => {
        document.documentElement.removeAttribute("data-dragging");
        document.body.style.userSelect = "";
      };
    }, [activeItem]);

    useEffect(() => {
      if (!activeItem) return;

      const handlePointerMove = (event: PointerEvent) => {
        setVirtualRef({
          getBoundingClientRect: () =>
            DOMRect.fromRect({
              width: 0,
              height: 0,
              x: event.clientX,
              y: event.clientY,
            }),
        });

        const active = activeItemRef.current;
        if (!active) return;

        const elements = document.elementsFromPoint(
          event.clientX,
          event.clientY,
        );

        const matchingElements = elements.filter(
          (el) =>
            el instanceof HTMLElement && Boolean(el.closest("[data-dnd-id]")),
        ) as HTMLElement[];

        const itemElements = matchingElements
          .map((el) => el.closest("[data-dnd-id]") as HTMLElement)
          .filter((el) => el instanceof HTMLElement);

        const uniqueItemElements = Array.from(new Set(itemElements));

        const targetElement =
          uniqueItemElements.find((el) => el.dataset.dndId !== active.id) ??
          uniqueItemElements.find((el) => el.dataset.dndId === active.id) ??
          null;

        if (!targetElement) {
          setCombinedDropTarget(null);
          return;
        }

        const hoveredId = targetElement.dataset.dndId;
        const hoveredIndex = Number(targetElement.dataset.dndIndex);

        if (!hoveredId || Number.isNaN(hoveredIndex)) {
          setCombinedDropTarget(null);
          return;
        }

        setCombinedDropTarget({ id: hoveredId, index: hoveredIndex });
      };

      const handlePointerUp = () => {
        const active = activeItemRef.current;
        const target = dropTargetRef.current;

        if (active && target && active.id !== target.id) {
          setItems((items) => {
            const newItems = [...items];
            const [movedItem] = newItems.splice(active.index, 1);
            newItems.splice(target.index, 0, movedItem);
            return newItems;
          });
        }
        setOverlayWidth(null);
        setDragHandlerActive(null);
        setCombinedActiveItem(null);
        setCombinedDropTarget(null);
      };

      // TODO - Look into adding a cancel listener event
      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerup", handlePointerUp);

      return () => {
        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("pointerup", handlePointerUp);
      };
    }, [activeItem, setCombinedDropTarget, setCombinedActiveItem, setItems]);

    const onKeyboardDragEnd = (diff: number) => {
      if (!dragHandlerActive) return;

      const targetIndex = dragHandlerActive.index + diff;
      if (targetIndex < 0 || targetIndex >= children.length) {
        return;
      }

      setItems((items) => {
        const newItems = [...items];
        const [movedItem] = newItems.splice(dragHandlerActive.index, 1);
        newItems.splice(targetIndex, 0, movedItem);
        return newItems;
      });
      setDragHandlerActive({ ...dragHandlerActive, index: targetIndex });
    };

    const onDragStart = (
      event: React.PointerEvent | React.MouseEvent,
      item: DragAndDropElement,
      element?: HTMLElement | null,
    ) => {
      setVirtualRef({
        getBoundingClientRect: () =>
          DOMRect.fromRect({
            width: 0,
            height: 0,
            x: event.clientX,
            y: event.clientY,
          }),
      });

      setOverlayWidth(element?.getBoundingClientRect().width ?? null);

      setCombinedActiveItem(item);
      setCombinedDropTarget(item);
    };

    // TODO - Make overlay same width as the OG item, currently jumps to content width

    return (
      <DragAndDropProvider
        activeItem={activeItem}
        setActiveItem={setCombinedActiveItem}
        dropTarget={dropTarget}
        setDropTarget={setCombinedDropTarget}
        dragHandlerActive={dragHandlerActive}
        setDragHandlerActive={setDragHandlerActive}
        onKeyboardDragEnd={onKeyboardDragEnd}
        onDragStart={onDragStart}
      >
        <div ref={forwardedRef}>{children}</div>
        {activeChild && (
          <Floating>
            <Floating.Anchor virtualRef={virtualRef}>
              <span />
            </Floating.Anchor>
            <Floating.Content
              align="start"
              updatePositionStrategy="always"
              style={{
                pointerEvents: "none",
                boxSizing: "border-box",
                width: overlayWidth ? `${overlayWidth}px` : "fit-content",
              }}
            >
              {React.cloneElement(activeChild, {
                isOverlay: true,
              })}
            </Floating.Content>
          </Floating>
        )}
      </DragAndDropProvider>
    );
  },
) as DataDragAndDropRootComponent;

DragAndDrop.Item = DragAndDropItem;

export { DragAndDrop, DragAndDropItem };
export default DragAndDrop;
export type { DragAndDropItemProps, DragAndDropProps };
