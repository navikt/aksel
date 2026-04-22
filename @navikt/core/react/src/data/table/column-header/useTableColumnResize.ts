import { type DOMAttributes, useCallback, useRef, useState } from "react";
import { useControllableState } from "../../../utils/hooks";
import { useDataTableContext } from "../root/DataTableRoot.context";

type ColumnWidth = number | string;

type ResizeProps = {
  /**
   * Controlled width of the column.
   *
   * Should only be used to fully control column width state. Otherwise, use `defaultWidth` and let the component handle resizing.
   */
  width?: ColumnWidth;
  /**
   * Initial width of the column. Only used when `width` is not set.
   */
  defaultWidth?: ColumnWidth;
  /**
   * Minimum width of the column.
   *
   * Should be used in conjunction with `width` or `defaultWidth` to set limits when resizing.
   */
  minWidth?: ColumnWidth;
  /**
   * Maximum width of the column.
   *
   * Should be used in conjunction with `width` or `defaultWidth` to set limits when resizing.
   */
  maxWidth?: ColumnWidth;
  /**
   * Called when the column width changes.
   */
  onWidthChange?: (width: ColumnWidth) => void;
  /**
   * Forwarded styles
   */
  style?: React.CSSProperties;
  /**
   * Forwarded colSpan
   */
  colSpan?: number;
};

type TableColumnResizeArgs = ResizeProps & {
  thRef: React.RefObject<HTMLTableCellElement | null>;
};

type TableColumnResizeResult =
  | {
      style: React.CSSProperties;
      resizeHandlerProps: {
        onMouseDown: DOMAttributes<HTMLButtonElement>["onMouseDown"];
        onTouchStart: DOMAttributes<HTMLButtonElement>["onTouchStart"];
        onKeyDown: DOMAttributes<HTMLButtonElement>["onKeyDown"];
        onBlur: DOMAttributes<HTMLButtonElement>["onBlur"];
        onDoubleClick: DOMAttributes<HTMLButtonElement>["onDoubleClick"];
        onClick: DOMAttributes<HTMLButtonElement>["onClick"];
      };
      isResizingWithKeyboard: boolean;
      enabled: true;
    }
  | {
      style?: React.CSSProperties;
      enabled: false;
    };

/**
 * TODO:
 * - Do we allow % widths?
 * - Auto-width mode is hard now since that might cause layout-shifts on mount. But would be preferable to
 * be able to set "1fr" or similar and have it fill remaining space.
 */
function useTableColumnResize(
  args: TableColumnResizeArgs,
): TableColumnResizeResult {
  const {
    thRef,
    width: userWidth,
    defaultWidth,
    onWidthChange,
    maxWidth = Infinity,
    minWidth = 40,
    style,
    colSpan,
  } = args;

  const tableContext = useDataTableContext();

  const [isResizingWithKeyboard, setIsResizingWithKeyboard] = useState(false);
  const ignoreNextOnClick = useRef(false);

  const [width, _setWidth] = useControllableState({
    value: userWidth,
    defaultValue: defaultWidth ?? (colSpan ?? 1) * 140,
    /**
     * TODO:
     * - Potential optimization: Only call when width as "stopped" changing, e.g. on mouse up or after a debounce when resizing with keyboard.
     * Otherwise, this could cause excessive calls when resizing quickly.
     */
    onChange: onWidthChange,
  });

  const setWidth = useCallback(
    (newWidth: number) => {
      const min = parseWidth(minWidth) ?? 0;
      const max = parseWidth(maxWidth) ?? Infinity;
      const clamped = Math.min(Math.max(newWidth, min), max);
      _setWidth(clamped);
    },
    [minWidth, maxWidth, _setWidth],
  );

  const handleOnClick: DOMAttributes<HTMLButtonElement>["onClick"] =
    useCallback(() => {
      // We need to use the onClick event in order to support screen readers properly,
      // since some of them only send a mouse click when pressing enter/space.
      // We detect a "screen reader click" by checking if we had a mouseUp event right before.

      if (ignoreNextOnClick.current) {
        ignoreNextOnClick.current = false;
        return;
      }

      setIsResizingWithKeyboard((prev) => !prev);
    }, []);

  const handleKeyDown: DOMAttributes<HTMLButtonElement>["onKeyDown"] =
    useCallback(
      (event) => {
        if (!isResizingWithKeyboard) {
          return;
        }
        const currentWidth = thRef.current?.offsetWidth ?? 0;

        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          const delta = event.key === "ArrowRight" ? 20 : -20;
          setWidth(currentWidth + delta);
          return;
        }
        if (event.key === "Home") {
          event.preventDefault();
          setWidth(0); // will fall back to minWidth
          return;
        }
        if (event.key === "End") {
          event.preventDefault();
          const autoWidth = getAutoColumnWidth(thRef);
          if (autoWidth && autoWidth > currentWidth) {
            setWidth(autoWidth);
          }
          return;
        }
        if (event.key === "Escape") {
          setIsResizingWithKeyboard(false);
        }
      },
      [isResizingWithKeyboard, setWidth, thRef],
    );

  const startResize = useCallback(
    (startX: number) => {
      const startWidth = thRef.current?.offsetWidth ?? 0;

      function onPointerMove(clientX: number) {
        const currentWidth = thRef.current?.offsetWidth ?? 0;
        const newWidth = startWidth + (clientX - startX);

        const min = parseWidth(minWidth) ?? 0;
        const max = parseWidth(maxWidth) ?? Infinity;

        if (newWidth > max) {
          setWidth(newWidth < currentWidth ? newWidth : currentWidth);
          return;
        }
        if (newWidth < min) {
          setWidth(newWidth > currentWidth ? newWidth : currentWidth);
          return;
        }

        setWidth(newWidth);
      }

      function onMouseMove(e: MouseEvent) {
        onPointerMove(e.clientX);
      }

      function onTouchMove(e: TouchEvent) {
        e.preventDefault();
        onPointerMove(e.touches[0].clientX);
      }

      function cleanup() {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("touchmove", onTouchMove);
        setIsResizingWithKeyboard(false);

        // We only want onClick to trigger when using the keyboard
        // (we use onClick b.c. keyDown doesn't fire when using a screen reader)
        ignoreNextOnClick.current = true;
      }

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("touchmove", onTouchMove, { passive: false });
      document.addEventListener("mouseup", cleanup, { once: true });
      document.addEventListener("touchend", cleanup, { once: true });
      document.addEventListener("touchcancel", cleanup, { once: true });
    },
    [maxWidth, minWidth, setWidth, thRef],
  );

  const handleMouseDown: DOMAttributes<HTMLButtonElement>["onMouseDown"] =
    useCallback(
      (event) => {
        startResize(event.clientX);
      },
      [startResize],
    );

  const handleTouchStart: DOMAttributes<HTMLButtonElement>["onTouchStart"] =
    useCallback(
      (event) => {
        startResize(event.touches[0].clientX);
      },
      [startResize],
    );

  // Auto-size column to fit content on double click. NB: Doesn't work with block content!
  const handleDoubleClick: DOMAttributes<HTMLButtonElement>["onDoubleClick"] =
    useCallback(() => {
      const newColumnWidth = getAutoColumnWidth(thRef);
      if (newColumnWidth) {
        setWidth(newColumnWidth);
      }
    }, [setWidth, thRef]);

  if (tableContext.layout !== "fixed") {
    return {
      style,
      enabled: false,
    };
  }

  return {
    style: {
      ...style,
      width,
    },
    resizeHandlerProps: {
      onMouseDown: handleMouseDown,
      onTouchStart: handleTouchStart,
      onKeyDown: handleKeyDown,
      onBlur: () => setIsResizingWithKeyboard(false),
      onDoubleClick: handleDoubleClick,
      onClick: handleOnClick,
    },
    isResizingWithKeyboard,
    enabled: true,
  };
}

function parseWidth(width: ColumnWidth | undefined): number | undefined {
  if (width == null) {
    return undefined;
  }
  if (typeof width === "number") {
    return width;
  }
  if (typeof width === "string") {
    const parsed = parseInt(width, 10);
    return Number.isNaN(parsed) ? undefined : parsed;
  }
  return undefined;
}

function getAutoColumnWidth(
  thRef: React.RefObject<HTMLTableCellElement | null>,
) {
  const th = thRef.current!;
  const thContent = th.querySelector(".aksel-data-table__th-content");
  const thPaddingEl = th.querySelector("div");
  const rows = th.closest("table")?.querySelectorAll("tbody tr, tfoot tr");
  if (!thContent || !thPaddingEl || !rows) {
    return;
  }

  // Find needed width for header cell
  const contentWidth = thContent.scrollWidth;
  const paddingElStyle = window.getComputedStyle(thPaddingEl);
  const thInlinePadding =
    parseInt(paddingElStyle.paddingLeft, 10) +
    parseInt(paddingElStyle.paddingRight, 10);
  let newColumnWidth = contentWidth + thInlinePadding;

  // Find column position
  let columnPosition = 1;
  let prevSibling = th.previousElementSibling;
  while (prevSibling) {
    columnPosition += (prevSibling as HTMLTableCellElement).colSpan;
    prevSibling = prevSibling.previousElementSibling;
  }

  // Find needed width for each cell in column in tbody and tfoot
  const range = document.createRange();
  let skipRows = 0;
  for (const row of rows) {
    // Skip rows where the cell in this column is covered by a rowspan from a previous row
    if (skipRows > 0) {
      skipRows--;
      continue;
    }

    // Find cell
    let cell = row.firstChild as HTMLTableCellElement;
    let currentPosition = cell.colSpan;
    while (columnPosition > currentPosition && cell.nextElementSibling) {
      cell = cell.nextElementSibling as HTMLTableCellElement;
      currentPosition += cell.colSpan;
    }
    skipRows = cell.rowSpan - 1;

    // Find needed width
    const cellContent = cell.firstChild as HTMLElement;
    range.selectNodeContents(cellContent);
    const cellContentWidth = range.getBoundingClientRect().width;
    const contentElStyle = window.getComputedStyle(cellContent);
    const inlinePadding =
      parseInt(contentElStyle.paddingLeft, 10) +
      parseInt(contentElStyle.paddingRight, 10);
    const widthNeededForThisCell =
      (cellContentWidth + inlinePadding) / cell.colSpan;
    if (widthNeededForThisCell > newColumnWidth) {
      newColumnWidth = widthNeededForThisCell;
    }
  }

  // Make sure new width is not wider than the table container since that would be impractical
  const container = th.closest("div");
  const maxColWidth =
    (container?.offsetWidth || document.documentElement.clientWidth * 0.9) *
    0.95;

  return newColumnWidth > maxColWidth
    ? Math.floor(maxColWidth)
    : Math.ceil(newColumnWidth);
}

export { useTableColumnResize };
export type { ResizeProps };
