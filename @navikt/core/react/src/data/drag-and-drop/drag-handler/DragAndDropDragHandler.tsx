import React, { useEffect } from "react";
import {
  CaretDownCircleFillIcon,
  CaretUpCircleFillIcon,
  DragVerticalIcon,
} from "@navikt/aksel-icons";
import { useDragAndDropContext } from "../root/DragAndDrop.context";
import { DragAndDropElement } from "../types";

export interface DragAndDropDragHandlerProps {
  item: DragAndDropElement;
  itemRef?: React.RefObject<HTMLDivElement | null>;
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
>(({ item, itemRef }, forwardedRef) => {
  const context = useDragAndDropContext();
  const active =
    context?.dragHandlerActive &&
    item &&
    context?.dragHandlerActive?.id === item.id;

  useEffect(() => {
    // Detects clicks outside the handler to end active handle
    if (!active) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (
        itemRef?.current &&
        !itemRef?.current.contains(event.target as Node)
      ) {
        context?.setDragHandlerActive(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [itemRef, active, context]);

  useEffect(() => {
    // Detects key presses for keyboard dragging
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!active) return;
      event.stopPropagation();
      event.preventDefault();
      if (
        (event.key === "Enter" || event.key === " ") &&
        context?.dragHandlerActive
      ) {
        // Enter or space, currently active item - end keyboard dragging
        context?.setDragHandlerActive(null);
      } else if (
        (event.key === "Enter" || event.key === " ") &&
        !context?.dragHandlerActive
      ) {
        // Enter or space, not currently active item - start keyboard dragging
        context?.setDragHandlerActive(item);
      } else if (event.key === "Escape") {
        // Cancel dragging
        // TODO Handle reset
        context?.setDragHandlerActive(null);
      } else if (event.key === "ArrowUp") {
        // Move item up
        context?.onKeyboardDragEnd(-1);
      } else if (event.key === "ArrowDown") {
        // Move item down
        context?.onKeyboardDragEnd(1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [active, context, item]);

  return (
    <div className="aksel-data-drag-and-drop__drag-handler" ref={forwardedRef}>
      {active && (
        <button
          className="aksel-data-drag-and-drop__drag-handler__arrow"
          data-direction="up"
          onClick={() => context?.onKeyboardDragEnd(-1)}
        >
          <CaretUpCircleFillIcon aria-hidden fontSize="1.8rem" />
        </button>
      )}
      <button
        aria-label="Dra for å flytte"
        className="aksel-data-drag-and-drop__drag-handler__button"
        data-drag-handler-active={active}
        onPointerDown={(event) => {
          if (active) return;
          event.stopPropagation();
          context?.startPendingDragStart(event, item, itemRef?.current || null);
        }}
        onClick={() => {
          if (!active) {
            context?.setDragHandlerActive(item);
          } else {
            context?.setDragHandlerActive(null);
          }
        }}
      >
        <DragVerticalIcon
          aria-hidden
          title="Dra for å flytte"
          fontSize="1.5rem"
        />
      </button>
      {active && (
        <button
          className="aksel-data-drag-and-drop__drag-handler__arrow"
          data-direction="down"
          onClick={() => context?.onKeyboardDragEnd(1)}
        >
          <CaretDownCircleFillIcon aria-hidden fontSize="1.8rem" />
        </button>
      )}
    </div>
  );
});
