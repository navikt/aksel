import React, { forwardRef } from "react";
import {
  CaretLeftRightIcon,
  PushPinFillIcon,
  PushPinIcon,
} from "@navikt/aksel-icons";
import { Button } from "../../../button";
import { cl } from "../../../utils/helpers";
import { DataTableThSortHandle } from "./DataTableThSortHandle";

type DataTableThProps = React.HTMLAttributes<HTMLTableCellElement> & {
  resizeHandler?: React.MouseEventHandler<HTMLButtonElement>;
  isPinned?: boolean;
  pinningHandler?: React.MouseEventHandler<HTMLButtonElement>;
  size?: number;
  sortDirection?: "asc" | "desc" | "none" | false;
  onSortChange?: (
    direction: "asc" | "desc" | "none",
    event: React.MouseEvent,
  ) => void;
};

const DataTableTh = forwardRef<HTMLTableCellElement, DataTableThProps>(
  (
    {
      className,
      children,
      resizeHandler,
      isPinned = false,
      pinningHandler,
      size,
      sortDirection,
      onSortChange,
      style,
      ...rest
    },
    forwardedRef,
  ) => {
    return (
      <th
        {...rest}
        ref={forwardedRef}
        className={cl("aksel-data-table__th", className)}
        style={{ width: size, ...style }}
      >
        {children}

        <DataTableThSortHandle
          sortDirection={sortDirection}
          onSortChange={onSortChange}
        />

        {pinningHandler && (
          <Button
            onClick={pinningHandler}
            size="small"
            variant="secondary"
            icon={
              isPinned ? (
                <PushPinFillIcon aria-hidden title="Fest kolonne" />
              ) : (
                <PushPinIcon aria-hidden title="Løstne kolonne" />
              )
            }
          />
        )}
        {resizeHandler && (
          <Button
            onMouseDown={resizeHandler}
            onMouseUp={resizeHandler}
            className={cl("aksel-data-table__th-resize-handle")}
            size="small"
            variant="secondary"
            icon={
              <CaretLeftRightIcon aria-hidden title="Endre kolonnestørrelse" />
            }
          />
        )}
      </th>
    );
  },
);

export { DataTableTh };
export type { DataTableThProps };
