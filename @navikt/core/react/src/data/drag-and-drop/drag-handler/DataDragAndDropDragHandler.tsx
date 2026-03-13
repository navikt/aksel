import React from "react";
import {
  CaretDownCircleFillIcon,
  CaretUpCircleFillIcon,
  DragVerticalIcon,
} from "@navikt/aksel-icons";
import { Floating } from "../../../utils/components/floating/Floating";

export interface DataDragAndDropDragHandlerProps {
  /**
   * Whether the drag handler is disabled
   */
  // disabled?: boolean;
  /**
   * Wether dragging is done by keyboard. Used to conditionally render drag indicators.
   */
  keyboardDragging?: boolean;
  /**
   * Handle ref is forwarded to the button element serving as drag handle.
   */
  handleRef: React.Ref<HTMLDivElement>;
  // Just for testing purposes, to render an alternative drag handler
  alt?: boolean;
}

/**
 * DataDragAndDropDragHandler
 *
 * A button component that serves as a drag handle for drag and drop operations.
 * Can be used to initiate dragging of elements in a data table or list.
 */
export const DataDragAndDropDragHandler = React.forwardRef<
  HTMLButtonElement,
  DataDragAndDropDragHandlerProps
>(({ keyboardDragging, handleRef, alt }) => {
  if (alt) {
    return (
      <div className="aksel-data-drag-and-drop__drag-handler__alt">
        {keyboardDragging && (
          <span
            className="aksel-data-drag-and-drop__drag-handler__arrow"
            data-direction="up"
          >
            <CaretUpCircleFillIcon aria-hidden fontSize="1.2rem" />
          </span>
        )}
        <div
          ref={handleRef}
          className="aksel-data-drag-and-drop__drag-handler__button"
        >
          <DragVerticalIcon
            aria-hidden
            title="Dra for å flytte"
            fontSize="1.5rem"
          />
        </div>
        {keyboardDragging && (
          <span
            className="aksel-data-drag-and-drop__drag-handler__arrow"
            data-direction="down"
          >
            <CaretDownCircleFillIcon aria-hidden fontSize="1.2rem" />
          </span>
        )}
      </div>
    );
  }

  return (
    <Floating>
      {keyboardDragging && (
        <Floating.Content
          side="top"
          avoidCollisions={false}
          updatePositionStrategy="always"
          className="aksel-data-drag-and-drop__drag-handler__arrow"
        >
          <CaretUpCircleFillIcon aria-hidden fontSize="1.2rem" />
        </Floating.Content>
      )}
      <Floating.Anchor asChild>
        <div
          ref={handleRef}
          className="aksel-data-drag-and-drop__drag-handler__button"
        >
          <DragVerticalIcon
            aria-hidden
            title="Dra for å flytte"
            fontSize="1.5rem"
          />
        </div>
      </Floating.Anchor>
      {keyboardDragging && (
        <Floating.Content
          avoidCollisions={false}
          updatePositionStrategy="always"
          className="aksel-data-drag-and-drop__drag-handler__arrow"
        >
          <CaretDownCircleFillIcon aria-hidden fontSize="1.2rem" />
        </Floating.Content>
      )}
    </Floating>
  );
});
