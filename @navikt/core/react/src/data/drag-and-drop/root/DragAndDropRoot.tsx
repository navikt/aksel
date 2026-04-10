import React, { forwardRef, useCallback, useEffect } from "react";
import { Floating } from "../../../utils/components/floating/Floating";
import DragAndDropItem, { DragAndDropItemProps } from "../item/DragAndDropItem";
import { DragAndDropElement } from "../types";
import { DragAndDropProvider } from "./DragAndDrop.context";

interface DragAndDropProps extends React.HTMLAttributes<HTMLUListElement> {
  children: React.ReactElement<DragAndDropItemProps>[];
  setItems: React.Dispatch<React.SetStateAction<any[]>>;
}

interface DataDragAndDropRootComponent extends React.ForwardRefExoticComponent<
  DragAndDropProps & React.RefAttributes<HTMLUListElement>
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
 * [x] Look into adding a cancel listener event
 * [x] Make onClick work on drag handler button, currently blocked by pointer down/up listeners
 * [ ] Talk to design about what should happen on ESC key press, currently just cancels dragging, should it also reset position?
 * [x] Make arrow icons into buttons that react to keyboard events, currently just decorative
 * [x] Keep handler focus after clicking arrows for dragging
 * [ ] Look into data-based API vs component-based API
 * [ ] Should we have hidden instructions for screen readers on how to use the drag and drop, and should we announce the position of the item while dragging?
 * [ ] Discuss if this component should be generic for drag and drop, or if it should be specifically for tables - should we build it for a future Aksel-component now or wait?
 */

const DRAG_THRESHOLD = 4; // Minimum movement in pixels to start dragging

const DragAndDrop = forwardRef<HTMLUListElement, DragAndDropProps>(
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

    const pendingDragStartRef = React.useRef<{
      item: DragAndDropElement;
      element: HTMLElement | null;
      pointerId: number;
      startX: number;
      startY: number;
    } | null>(null);

    const startPendingDrag = (
      event: React.PointerEvent,
      item: DragAndDropElement,
      element?: HTMLElement | null,
    ) => {
      pendingDragStartRef.current = {
        item,
        element: element || null,
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
      };
    };

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

    const reorderItems = useCallback(
      (fromIndex: number, toIndex: number) => {
        setItems((items) => {
          const newItems = [...items];
          const [movedItem] = newItems.splice(fromIndex, 1);
          newItems.splice(toIndex, 0, movedItem);
          return newItems;
        });
      },
      [setItems],
    );

    useEffect(() => {
      /* This useEffect is used to toggle a class on the html element when dragging, 
      to prevent cursor issues when dragging over interactive elements, 
      and to prevent text selection during dragging. */

      if (activeItem) {
        document.documentElement.setAttribute("data-dragging-cursor", "true");
        document.body.style.userSelect = "none";
      } else {
        document.documentElement.removeAttribute("data-dragging-cursor");
        document.body.style.userSelect = "";
      }

      return () => {
        document.documentElement.removeAttribute("data-dragging-cursor");
        document.body.style.userSelect = "";
      };
    }, [activeItem]);

    useEffect(() => {
      const handlePointerMove = (event: PointerEvent) => {
        const pendingStart = pendingDragStartRef.current;
        const activeRef = activeItemRef.current;
        const element = pendingStart?.element;

        if (!activeRef && pendingStart) {
          const deltaX = Math.abs(event.clientX - pendingStart.startX);
          const deltaY = Math.abs(event.clientY - pendingStart.startY);

          if (deltaX > DRAG_THRESHOLD || deltaY > DRAG_THRESHOLD) {
            if (element) {
              element.setPointerCapture(pendingStart.pointerId);
            }

            setOverlayWidth(element?.getBoundingClientRect().width ?? null);
            setCombinedActiveItem(pendingStart.item);
            setCombinedDropTarget(pendingStart.item);
            pendingDragStartRef.current = null;
          }
          return;
        }

        const active = activeItemRef.current;
        if (!active) return;

        setVirtualRef({
          getBoundingClientRect: () =>
            DOMRect.fromRect({
              width: 0,
              height: 0,
              x: event.clientX,
              y: event.clientY,
            }),
        });

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
        if (!activeItemRef.current) {
          pendingDragStartRef.current = null;
          return;
        }

        const active = activeItemRef.current;
        const target = dropTargetRef.current;

        if (active && target && active.id !== target.id) {
          reorderItems(active.index, target.index);
        }

        setOverlayWidth(null);
        setDragHandlerActive(null);
        setCombinedActiveItem(null);
        setCombinedDropTarget(null);
        pendingDragStartRef.current = null;
      };

      const handlePointerCancel = () => {
        setOverlayWidth(null);
        setDragHandlerActive(null);
        setCombinedActiveItem(null);
        setCombinedDropTarget(null);
        pendingDragStartRef.current = null;
      };

      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerup", handlePointerUp);
      window.addEventListener("pointercancel", handlePointerCancel);

      return () => {
        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("pointerup", handlePointerUp);
        window.removeEventListener("pointercancel", handlePointerCancel);
      };
    }, [setCombinedDropTarget, setCombinedActiveItem, reorderItems]);

    const onKeyboardDragEnd = (diff: number) => {
      if (!dragHandlerActive) return;

      const targetIndex = dragHandlerActive.index + diff;
      if (targetIndex < 0 || targetIndex >= children.length) {
        return;
      }

      reorderItems(dragHandlerActive.index, targetIndex);
      setDragHandlerActive({ ...dragHandlerActive, index: targetIndex });
    };

    return (
      <DragAndDropProvider
        activeItem={activeItem}
        setActiveItem={setCombinedActiveItem}
        dropTarget={dropTarget}
        setDropTarget={setCombinedDropTarget}
        dragHandlerActive={dragHandlerActive}
        setDragHandlerActive={setDragHandlerActive}
        onKeyboardDragEnd={onKeyboardDragEnd}
        startPendingDrag={startPendingDrag}
        itemAmount={children.length}
      >
        <ul ref={forwardedRef} aria-label="Dra og slipp elementer">
          {children}
        </ul>
        {activeItem && activeChild && (
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
