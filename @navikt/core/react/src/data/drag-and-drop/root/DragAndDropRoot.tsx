/** biome-ignore-all lint/correctness/useHookAtTopLevel: False positive because of the way forwardRef() is added */
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Floating } from "../../../utils/components/floating/Floating";
import {
  ColumnDefinition,
  ColumnDefinitions,
} from "../../table/root/DataTable.types";
import DragAndDropItem, { DragAndDropItemProps } from "../item/DragAndDropItem";
import { DragAndDropElement } from "../types";
import { DragAndDropProvider } from "./DragAndDrop.context";

interface DragAndDropProps<T> extends React.HTMLAttributes<HTMLUListElement> {
  items: ColumnDefinitions<T>;
  setItems: React.Dispatch<React.SetStateAction<ColumnDefinitions<T>>>;
  renderItem: (item: ColumnDefinition<T>, index: number) => React.ReactNode;
}

/**
 * TODO
 * [x] setItems on root
 * [x] state : active element
 * [x] pointer over listener / state, onPointerEnter, onPointerLeave
 * [x] Overlay - Use floating component
 * [x] Keyboard navigation
 * [x] UU - announce on drag start, item moved, drag end
 * [x] Make overlay same width as the OG item, currently jumps to content width
 * [x] Look into adding a cancel listener event
 * [x] Make onClick work on drag handler button, currently blocked by pointer down/up listeners
 * [x] Talk to design about what should happen on ESC key press, currently just cancels dragging, should it also reset position?
 * [x] Make arrow icons into buttons that react to keyboard events, currently just decorative
 * [x] Keep handler focus after clicking arrows for dragging
 * [x] Look into data-based API vs component-based API
 * [x] Should we have hidden instructions for screen readers on how to use the drag and drop, and should we announce the position of the item while dragging?
 * [x] Discuss if this component should be generic for drag and drop, or if it should be specifically for tables - just for table for now
 * [x] Discuss items type
 * [x] Discuss how to implement label best
 * [ ] Quick nav (< > samtidig) - få piltastene til å fungere
 * [x] Implement new type for items - ColumnDefinitions<T>
 * [x] Remove announcer div and use a live region component instead
 * [x] Make ESC reset position, not just cancel dragging
 * [x] Make instructions for keyboard users (visible?)
 * [ ] Ask design about visible keyboard instructions
 * [ ] Update design from Figma
 * [ ] Look at instructions text
 * [x] Remove default ul styling
 * [x] Fix setItems type
 *
 */

const DRAG_THRESHOLD = 4; // Minimum movement in pixels to start dragging
const SR_INSTRUCTIONS_ID = "drag-and-drop-instructions-id";

function DragAndDropInner<T>(
  { items, setItems, renderItem }: DragAndDropProps<T>,
  forwardedRef: React.ForwardedRef<HTMLUListElement>,
) {
  const [activeItem, setActiveItem] = useState<DragAndDropElement | null>(null);
  const [dropTarget, setDropTarget] = useState<DragAndDropElement | null>(null);
  const [dragHandlerActive, setDragHandlerActive] =
    useState<DragAndDropElement | null>(null);
  const [overlayWidth, setOverlayWidth] = useState<number | null>(null);
  const [announcer, setAnnouncer] = useState("");
  const initialItemsRef = useRef<ColumnDefinitions<T> | null>(null);
  const activeData = items.find((item) => item.id === activeItem?.id);

  const activeItemRef = useRef<DragAndDropElement | null>(null);
  const dropTargetRef = useRef<DragAndDropElement | null>(null);

  const [virtualRef, setVirtualRef] = useState({
    getBoundingClientRect: () =>
      DOMRect.fromRect({ width: 0, height: 0, x: 0, y: 0 }),
  });

  const pendingDragStartRef = useRef<{
    item: DragAndDropElement;
    element: HTMLElement | null;
    pointerId: number;
    startX: number;
    startY: number;
  } | null>(null);

  const saveInitialItems = useCallback(() => {
    initialItemsRef.current = items;
  }, [items]);

  const keyboardDragStart = (item: DragAndDropElement | null) => {
    if (item) {
      saveInitialItems();
    } else {
      initialItemsRef.current = null;
    }
    setDragHandlerActive(item);
  };

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

  const setCombinedActiveItem = useCallback(
    (item: DragAndDropElement | null) => {
      activeItemRef.current = item;
      setActiveItem(item);
    },
    [],
  );

  const setCombinedDropTarget = useCallback(
    (item: DragAndDropElement | null) => {
      dropTargetRef.current = item;
      setDropTarget(item);
    },
    [],
  );

  const reorderItems = useCallback(
    (fromIndex: number, toIndex: number) => {
      setItems((currentItems) => {
        const newItems = [...currentItems];
        const [movedItem] = newItems.splice(fromIndex, 1);
        newItems.splice(toIndex, 0, movedItem);
        return newItems;
      });
    },
    [setItems],
  );

  const cancelDrag = useCallback(
    (resetOrder = false) => {
      if (resetOrder && initialItemsRef.current) {
        setItems(initialItemsRef.current);
      }
      setOverlayWidth(null);
      setDragHandlerActive(null);
      setCombinedActiveItem(null);
      setCombinedDropTarget(null);
      pendingDragStartRef.current = null;
      initialItemsRef.current = null;
    },
    [setItems, setCombinedActiveItem, setCombinedDropTarget],
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
          saveInitialItems();
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

      const elements = document.elementsFromPoint(event.clientX, event.clientY);

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

      cancelDrag();
    };

    const handlePointerCancel = () => cancelDrag(true);

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointercancel", handlePointerCancel);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerCancel);
    };
  }, [
    setCombinedDropTarget,
    setCombinedActiveItem,
    reorderItems,
    saveInitialItems,
    cancelDrag,
  ]);

  const onKeyboardDragEnd = (diff: number, label: string) => {
    if (!dragHandlerActive) return;

    const targetIndex = dragHandlerActive.index + diff;
    if (targetIndex < 0 || targetIndex >= items.length) {
      return;
    }

    setAnnouncer(`${label}. Plass ${targetIndex + 1} av ${items.length}.`);
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
      onKeyboardDragStart={keyboardDragStart}
      onKeyboardDragEnd={onKeyboardDragEnd}
      startPendingDrag={startPendingDrag}
      cancelDrag={cancelDrag}
      setAnnouncer={setAnnouncer}
      itemAmount={items.length}
    >
      <span id={SR_INSTRUCTIONS_ID} className="sr-only">
        Bruk Tab for å fokusere på en kolonne. Trykk mellomrom eller enter for å
        starte flytting, bruk piltastene for å flytte kolonnen, trykk mellomrom
        eller enter for å slippe, eller Escape for å avbryte.
      </span>
      <div aria-live="assertive" className="sr-only" aria-atomic>
        {announcer}
      </div>
      <ul
        ref={forwardedRef}
        aria-label="Kolonneinnstillinger"
        aria-describedby={SR_INSTRUCTIONS_ID}
        className="aksel-data-table__drag-and-drop-root"
      >
        {items.map((item, index) => {
          return (
            <DragAndDropItem
              key={item.id}
              id={item.id}
              index={index}
              itemLabel={item.label}
            >
              {renderItem(item, index)}
            </DragAndDropItem>
          );
        })}
      </ul>
      {activeItem && activeData && (
        <Floating>
          <Floating.Anchor virtualRef={virtualRef}>
            <span />
          </Floating.Anchor>
          <Floating.Content
            align="start"
            updatePositionStrategy="always"
            aria-hidden
            style={{
              pointerEvents: "none",
              boxSizing: "border-box",
              width: overlayWidth ? `${overlayWidth}px` : "fit-content",
            }}
          >
            <DragAndDropItem
              id={activeItem.id}
              index={activeItem.index}
              isOverlay
              itemLabel={activeData.label}
            >
              {renderItem(activeData, activeItem.index)}
            </DragAndDropItem>
          </Floating.Content>
        </Floating>
      )}
    </DragAndDropProvider>
  );
}

const DragAndDrop = forwardRef(DragAndDropInner) as <T>(
  props: DragAndDropProps<T> & React.RefAttributes<HTMLUListElement>,
) => React.ReactElement | null;

export { DragAndDrop, DragAndDropItem };
export default DragAndDrop;
export type { DragAndDropItemProps, DragAndDropProps };
