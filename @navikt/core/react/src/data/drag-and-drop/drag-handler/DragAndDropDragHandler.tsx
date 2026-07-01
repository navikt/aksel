import React from "react";
import {
  CaretDownCircleFillIcon,
  CaretUpCircleFillIcon,
  DragVerticalIcon,
} from "@navikt/aksel-icons";
import { useDragAndDropContext } from "../root/DragAndDrop.context";
import type { DragAndDropElement } from "../types";

export interface DragAndDropDragHandlerProps {
  item: DragAndDropElement;
  itemRef: React.RefObject<HTMLLIElement | null>;
  isOverlay: boolean;
  itemLabel: string;
}

/**
 * DragAndDropDragHandler
 *
 * A button component that serves as a drag handle for drag and drop operations.
 * Can be used to initiate dragging of elements in a data table or list.
 */
export const DragAndDropDragHandler = React.forwardRef<
  HTMLDivElement,
  DragAndDropDragHandlerProps
>(({ item, itemRef, isOverlay, itemLabel }, forwardedRef) => {
  const context = useDragAndDropContext();
  const active =
    context?.dragHandlerActive &&
    item &&
    context?.dragHandlerActive?.id === item.id;

  if (isOverlay) {
    // Render a simple drag icon for the overlay, which is used as a visual representation of the item being dragged
    return (
      <div
        className="aksel-data-drag-and-drop__drag-handler"
        ref={forwardedRef}
        aria-hidden
      >
        <DragVerticalIcon fontSize="1.5rem" />
      </div>
    );
  }

  return (
    <div className="aksel-data-drag-and-drop__drag-handler" ref={forwardedRef}>
      {active && (
        <button
          className="aksel-data-drag-and-drop__drag-handler__arrow"
          data-direction="up"
          onClick={() => context?.onKeyboardDragEnd(-1, itemLabel)}
          onMouseDown={(e) => e.preventDefault()}
          disabled={context?.dragHandlerActive?.index === 0}
          type="button"
        >
          <CaretUpCircleFillIcon aria-hidden fontSize="1.8rem" />
        </button>
      )}
      <button
        aria-label={`${itemLabel}. Plass ${item.index + 1}.`}
        aria-pressed={Boolean(active)}
        aria-roledescription="draggable"
        type="button"
        className="aksel-data-drag-and-drop__drag-handler__button"
        data-drag-handler-active={active}
        onPointerDown={(event) => {
          if (active) return;
          event.stopPropagation();
          context?.startPendingDrag(event, item, itemRef?.current || null);
        }}
        onClick={(event) => {
          if (!active) {
            context?.onKeyboardDragStart(item);
            event.currentTarget.focus();
          } else {
            context?.onKeyboardDragStart(null);
          }
        }}
        onBlur={() => {
          if (context?.activeItem) return;

          context?.cancelDrag();
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            // Enter or space, currently active item - end keyboard dragging
            event.preventDefault();
            context?.onKeyboardDragStart(active ? null : item);
            return;
          }

          if (!active) return;

          if (event.key === "Escape") {
            // Cancel dragging
            event.preventDefault();
            context?.setAnnouncer(`Flytting av ${itemLabel} avbrutt.`);
            context?.cancelDrag(true);
            return;
          } else if (event.key === "ArrowUp") {
            // Move item up
            event.preventDefault();
            context?.onKeyboardDragEnd(-1, itemLabel);
            return;
          } else if (event.key === "ArrowDown") {
            // Move item down
            event.preventDefault();
            context?.onKeyboardDragEnd(1, itemLabel);
            return;
          }
        }}
      >
        <DragVerticalIcon aria-hidden fontSize="1.5rem" />
      </button>
      {active && (
        <button
          className="aksel-data-drag-and-drop__drag-handler__arrow"
          data-direction="down"
          type="button"
          onClick={() => context?.onKeyboardDragEnd(1, itemLabel)}
          onMouseDown={(e) => e.preventDefault()}
          disabled={
            context?.dragHandlerActive?.index === context?.itemAmount - 1
          }
        >
          <CaretDownCircleFillIcon aria-hidden fontSize="1.8rem" />
        </button>
      )}
    </div>
  );
});
