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

  return (
    <div className="aksel-data-drag-and-drop__drag-handler" ref={forwardedRef}>
      {active && (
        <span
          className="aksel-data-drag-and-drop__drag-handler__arrow"
          data-direction="up"
        >
          <CaretUpCircleFillIcon aria-hidden fontSize="1.2rem" />
        </span>
      )}
      <button
        aria-label="Dra for å flytte"
        className="aksel-data-drag-and-drop__drag-handler__button"
        data-drag-handler-active={active}
        onPointerDown={(event) => {
          event.stopPropagation();
          context?.onDragStart(event, item, itemRef?.current || null);
        }}
        onClick={() => context?.setDragHandlerActive(item)}
        onKeyDown={(event) => {
          if (
            (event.key === "Enter" || event.key === " ") &&
            context?.dragHandlerActive
          ) {
            // Enter or space, currently active item - end keyboard dragging
            event.preventDefault();
            context?.setDragHandlerActive(null);
          } else if (
            (event.key === "Enter" || event.key === " ") &&
            !context?.dragHandlerActive
          ) {
            // Enter or space, not currently active item - start keyboard dragging
            event.preventDefault();
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
        }}
      >
        <DragVerticalIcon
          aria-hidden
          title="Dra for å flytte"
          fontSize="1.5rem"
        />
      </button>
      {active && (
        <span
          className="aksel-data-drag-and-drop__drag-handler__arrow"
          data-direction="down"
        >
          <CaretDownCircleFillIcon aria-hidden fontSize="1.2rem" />
        </span>
      )}
    </div>
  );
});
