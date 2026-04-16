import React from "react";
import {
  CaretDownCircleFillIcon,
  CaretUpCircleFillIcon,
  DragVerticalIcon,
} from "@navikt/aksel-icons";
import { useDragAndDropContext } from "../root/DragAndDrop.context";
import { DragAndDropElement } from "../types";

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
          onClick={() => context?.onKeyboardDragEnd(-1)}
          onMouseDown={(e) => e.preventDefault()}
          disabled={context?.dragHandlerActive?.index === 0}
          type="button"
        >
          <CaretUpCircleFillIcon aria-hidden fontSize="1.8rem" />
        </button>
      )}
      <button
        // TODO - Bedre formulering av aria-label?
        //aria-label={`Flytt element ${item.index + 1}. Trykk Enter eller Mellomrom for å aktivere, deretter piltastene for å flytte elementet.`}
        aria-label={
          active
            ? `Flytt element ${itemLabel || item.index + 1}. Bruk piltastene for å flytte elementet.`
            : `Flytt element ${itemLabel || item.index + 1}. Trykk Enter eller Mellomrom for å aktivere flytting.`
        }
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
            context?.setDragHandlerActive(item);
            event.currentTarget.focus();
          } else {
            context?.setDragHandlerActive(null);
          }
        }}
        onBlur={() => context?.setDragHandlerActive(null)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            // Enter or space, currently active item - end keyboard dragging
            event.preventDefault();
            context?.setDragHandlerActive(active ? null : item);
            return;
          }

          if (!active) return;

          if (event.key === "Escape") {
            // Cancel dragging
            // TODO Handle reset
            event.preventDefault();
            context?.setDragHandlerActive(null);
            return;
          } else if (event.key === "ArrowUp") {
            // Move item up
            event.preventDefault();
            context?.onKeyboardDragEnd(-1);
            return;
          } else if (event.key === "ArrowDown") {
            // Move item down
            event.preventDefault();
            context?.onKeyboardDragEnd(1);
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
          onClick={() => context?.onKeyboardDragEnd(1)}
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
